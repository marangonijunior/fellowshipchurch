# 🚀 Setup Guide - Fellowship Church CMS

Complete step-by-step guide to set up your Fellowship Church website locally and deploy to production.

## Prerequisites

- **Node.js** 18+ and npm
- **Git** installed
- **Vercel Account** (for database and deployment)
- **Code Editor** (VS Code recommended)

---

## 🏁 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Database (Vercel Postgres)
POSTGRES_URL="your-postgres-url"
POSTGRES_PRISMA_URL="your-postgres-prisma-url"
POSTGRES_URL_NON_POOLING="your-postgres-url-non-pooling"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-key"

# Vercel Blob (Optional - for media upload)
BLOB_READ_WRITE_TOKEN="your-blob-token"
```

**Generate NextAuth Secret:**
```bash
openssl rand -base64 32
```

### Step 3: Setup Vercel Postgres Database

#### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Create or select your project
3. Navigate to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a region close to your users
6. Click **Create**
7. Copy the `.env.local` tab contents to your `.env` file

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Create Postgres database
vercel postgres create

# Pull environment variables
vercel env pull .env
```

### Step 4: Push Database Schema

```bash
npx prisma generate
npx prisma db push
```

This creates all tables: Users, Posts, Events, Sermons, Categories, Tags, Media, and SiteSettings.

### Step 5: Seed the Database (Optional)

```bash
npm run db:seed
```

This creates:
- ✅ Admin user (admin@fellowshipchurch.com / admin123)
- ✅ Editor user (editor@fellowshipchurch.com / editor123)
- ✅ Sample categories and tags
- ✅ Sample blog posts

### Step 6: Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

---

## 🔐 Login to Admin Dashboard

### Access the Login Page

1. Go to: http://localhost:3000/login
2. Use default credentials:
   - **Admin:** admin@fellowshipchurch.com / admin123
   - **Editor:** editor@fellowshipchurch.com / editor123
3. After login, you'll be redirected to: http://localhost:3000/admin/dashboard

---

## 📊 Admin Dashboard Overview

### Available Admin Pages

| Page | URL | Access Level |
|------|-----|--------------|
| Dashboard | `/admin/dashboard` | All logged users |
| Posts Management | `/admin/posts` | Editor, Super Admin |
| Events Management | `/admin/events` | Editor, Super Admin |
| Sermons Management | `/admin/sermons` | Editor, Super Admin |
| Site Settings | `/admin/settings` | Super Admin only |

### Features by Role

| Feature | Super Admin | Editor | Author | Viewer |
|---------|-------------|--------|--------|--------|
| View Dashboard | ✅ | ✅ | ✅ | ❌ |
| Create Posts/Events/Sermons | ✅ | ✅ | ✅ | ❌ |
| Edit Own Content | ✅ | ✅ | ✅ | ❌ |
| Edit All Content | ✅ | ✅ | ❌ | ❌ |
| Delete Content | ✅ | ✅ | ❌ | ❌ |
| Publish Content | ✅ | ✅ | ❌ | ❌ |
| Manage Settings | ✅ | ❌ | ❌ | ❌ |

---

## 🗄️ Database Management

### View Database with Prisma Studio

```bash
npx prisma studio
```

Opens a GUI at http://localhost:5555 to view and edit database records.

### Reset Database (⚠️ Danger - Deletes all data!)

```bash
npx prisma db push --force-reset
npm run db:seed
```

### Create a Migration (For production)

```bash
npx prisma migrate dev --name your_migration_name
```

---

## 🎨 Customization

### 1. Change Site Branding

Use the **Admin Settings** page (`/admin/settings`):
- Site Name
- Logo URL
- Favicon URL
- Primary Colors
- SEO Settings
- Contact Information
- Social Media Links
- Analytics IDs

### 2. Change Default Colors (Code Level)

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#FFD7A8",  // Peach color
    dark: "#F4B566",
    darker: "#E89B3C",
  },
  dark: {
    DEFAULT: "#1A1D23",
    light: "#2C3038",
  },
  cream: "#F5F1ED",
}
```

### 3. Update Logo in Header

The logo is dynamically loaded from the database via Site Settings.
To update: Go to `/admin/settings` → General → Logo URL

---

## 🚢 Deployment to Vercel

### Method 1: Via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Click **Import Project**
   - Select your GitHub repository
   - Vercel auto-detects Next.js configuration
   - Click **Deploy**

3. **Add Environment Variables:**
   - In Vercel Dashboard → Settings → Environment Variables
   - Add all variables from your `.env` file:
     - `POSTGRES_URL`
     - `POSTGRES_PRISMA_URL`
     - `POSTGRES_URL_NON_POOLING`
     - `NEXTAUTH_URL` (your production URL)
     - `NEXTAUTH_SECRET`
     - `BLOB_READ_WRITE_TOKEN` (optional)

4. **Setup Database:**
   - Go to Vercel project → Storage → Create Database → Postgres
   - Environment variables are added automatically
   - Redeploy your project

5. **Push Schema to Production:**
   ```bash
   # Connect to production database
   vercel env pull .env.production
   
   # Use production env
   DATABASE_URL=$(grep POSTGRES_PRISMA_URL .env.production | cut -d '=' -f2) npx prisma db push
   ```

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🧪 Testing the Website

### Public Pages (No login required)

- **Homepage:** `/`
- **About Us:** `/about`
- **Contact:** `/contact`
- **Blog Listing:** `/blog`
- **Blog Post:** `/blog/[slug]`
- **Events Listing:** `/events`
- **Event Detail:** `/events/[id]`
- **Sermons Listing:** `/sermons`
- **Sermon Detail:** `/sermons/[id]`

### Admin Pages (Login required)

- **Login:** `/login`
- **Dashboard:** `/admin/dashboard`
- **Posts Management:** `/admin/posts`
- **Events Management:** `/admin/events`
- **Sermons Management:** `/admin/sermons`
- **Site Settings:** `/admin/settings` (Super Admin only)

---

## 🔧 Troubleshooting

### "Database connection error"

**Solution:**
```bash
# 1. Check .env file has correct URLs
# 2. Regenerate Prisma client
npx prisma generate

# 3. Push schema
npx prisma db push

# 4. Restart dev server
npm run dev
```

### "NextAuth configuration error"

**Solution:**
1. Ensure `NEXTAUTH_SECRET` is set in `.env`
2. Ensure `NEXTAUTH_URL` matches your server URL
3. Clear `.next` cache: `rm -rf .next`
4. Restart: `npm run dev`

### "Can't login to admin"

**Solution:**
```bash
# 1. Run seed script
npm run db:seed

# 2. Check database has users
npx prisma studio

# 3. Verify email/password are correct
```

### "Port 3000 already in use"

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

### "Module not found" errors

**Solution:**
```bash
# Clear everything and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### TypeScript errors after schema changes

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Restart TypeScript server in VS Code
# Press: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

---

## 🛡️ Security Best Practices

### 1. Change Default Passwords

After first deployment, change default admin password:

```bash
# Access Prisma Studio
npx prisma studio

# Find admin user and update password
# Or create SQL update via Vercel Postgres dashboard
```

### 2. Use Strong Secrets

```bash
# Generate new NEXTAUTH_SECRET for production
openssl rand -base64 32
```

### 3. Environment Variables

- ✅ Never commit `.env` to git (already in `.gitignore`)
- ✅ Use different secrets for dev/staging/production
- ✅ Rotate secrets regularly
- ✅ Store production secrets in Vercel Dashboard

### 4. Database Security

- ✅ Use connection pooling (POSTGRES_PRISMA_URL)
- ✅ Enable SSL in production
- ✅ Regular backups via Vercel
- ✅ Monitor database logs

### 5. User Management

- ✅ Follow principle of least privilege
- ✅ Regularly audit user roles
- ✅ Remove inactive users
- ✅ Enable email verification (if needed)

---

## 📚 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Database
npx prisma studio        # Open database GUI
npx prisma generate      # Regenerate Prisma client
npx prisma db push       # Push schema changes
npx prisma migrate dev   # Create migration (production)
npm run db:seed          # Seed database with demo data

# Deployment
vercel                   # Deploy to preview
vercel --prod            # Deploy to production
```

---

## 🎯 Next Steps After Setup

1. ✅ **Change default passwords** via Prisma Studio
2. ✅ **Configure Site Settings** at `/admin/settings`
   - Update site name, logo, favicon
   - Add SEO metadata
   - Add contact information
   - Connect social media
   - Add Google Analytics ID
3. ✅ **Create your first blog post** at `/admin/posts`
4. ✅ **Create your first event** at `/admin/events`
5. ✅ **Create your first sermon** at `/admin/sermons`
6. ✅ **Customize About page** content
7. ✅ **Test contact form** functionality
8. ✅ **Review and customize** homepage sections
9. ✅ **Setup custom domain** in Vercel
10. ✅ **Enable analytics** and monitor traffic

---

## 📞 Support & Resources

### Useful Links

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **Prisma Documentation:** https://www.prisma.io/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

### Common Issues

- Check terminal for error messages
- Review browser console (F12)
- Check Vercel deployment logs
- Review Prisma Studio for database issues

---

## 📸 Vercel Blob Storage (Media Upload)

The system includes image upload functionality using Vercel Blob Storage.

### Setup Blob Storage

1. **Create Blob Storage in Vercel:**
   - Go to Vercel Dashboard → Your Project → Storage
   - Click "Create Database" → Select "Blob"
   - Copy the `BLOB_READ_WRITE_TOKEN`

2. **Add to .env:**
   ```env
   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

### Using Image Upload

The `ImageUpload` component is ready to use in any form:

```tsx
import ImageUpload from "@/components/shared/ImageUpload";

<ImageUpload
  label="Featured Image"
  currentImage={imageUrl}
  onUploadComplete={(url) => setImageUrl(url)}
  onRemove={() => setImageUrl("")}
/>
```

**Features:**
- ✅ Drag and drop support
- ✅ Click to upload
- ✅ Image preview
- ✅ File validation (JPEG, PNG, GIF, WebP only)
- ✅ Size limit (5MB max)
- ✅ Remove uploaded images

**API Endpoint:** `POST /api/upload`

**Example Pages with Upload:**
- `/admin/posts/new` - Create post with featured image
- Use same pattern for events and sermons

---

## ✅ Setup Complete!

Your Fellowship Church CMS is now ready to use!

**Quick Links:**
- 🌐 Website: http://localhost:3000
- 🔐 Login: http://localhost:3000/login
- 📊 Admin: http://localhost:3000/admin/dashboard
- 🗄️ Database: http://localhost:5555 (Prisma Studio)

**What You've Built:**
- ✅ Full CMS with Posts, Events, Sermons
- ✅ Image upload with Vercel Blob
- ✅ Role-based admin dashboard
- ✅ SEO-optimized public website
- ✅ Dynamic site settings
- ✅ Google Analytics & Facebook Pixel ready

Happy managing! 🙏

Happy managing! 🙏
