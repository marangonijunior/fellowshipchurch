import { put, del, list } from '@vercel/blob';

/**
 * Upload a file to Vercel Blob Storage
 * @param file - File to upload
 * @param folder - Optional folder path (e.g., 'posts', 'events', 'sermons')
 * @returns URL of the uploaded file
 */
export async function uploadFile(file: File, folder?: string): Promise<string> {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 15);
  const extension = file.name.split('.').pop();
  const filename = folder 
    ? `${folder}/${timestamp}-${randomString}.${extension}`
    : `${timestamp}-${randomString}.${extension}`;

  const blob = await put(filename, file, {
    access: 'public',
    addRandomSuffix: false,
  });

  return blob.url;
}

/**
 * Delete a file from Vercel Blob Storage
 * @param url - URL of the file to delete
 */
export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
}

/**
 * List all files in a folder
 * @param folder - Folder path
 * @returns Array of file URLs
 */
export async function listFiles(folder?: string): Promise<string[]> {
  try {
    const { blobs } = await list({
      prefix: folder,
    });
    return blobs.map(blob => blob.url);
  } catch (error) {
    console.error('Error listing files:', error);
    throw new Error('Failed to list files');
  }
}

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5)
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): { valid: boolean; error?: string } {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.',
    };
  }

  const maxSize = maxSizeMB * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File is too large. Maximum size is ${maxSizeMB}MB.`,
    };
  }

  return { valid: true };
}

/**
 * Extract filename from Vercel Blob URL
 * @param url - Blob URL
 * @returns Filename
 */
export function getFilenameFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}
