export enum Role {
  SUPER_ADMIN = 'SUPER_ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
  VIEWER = 'VIEWER',
}

export enum Status {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum PostType {
  NEWS = 'NEWS',
  BLOG = 'BLOG',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export interface User {
  id: string
  name: string
  email: string
  role: Role | string
  image?: string | null
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string | null
  content: string
  featuredImage?: string | null
  status: Status | string
  type: PostType | string
  publishedAt?: Date | null
  authorId: string
  author: {
    id: string
    name: string
    email: string
    image?: string | null
  }
  categories: Category[]
  tags: Tag[]
  seoTitle?: string | null
  seoDescription?: string | null
  viewCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Media {
  id: string
  filename: string
  url: string
  mimetype: string
  size: number
  alt?: string | null
  createdAt: Date
}

export interface Event {
  id: string
  title: string
  slug: string
  type: string
  description: string
  details?: string | null
  date: Date
  time: string
  location: string
  image?: string | null
  status: Status | string
  publishedAt?: Date | null
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface Sermon {
  id: string
  title: string
  slug: string
  description: string
  details?: string | null
  date: Date
  time: string
  location: string
  preacher: string
  image?: string | null
  status: Status | string
  publishedAt?: Date | null
  authorId: string
  createdAt: Date
  updatedAt: Date
}

export interface SiteSettings {
  id: string
  siteName: string
  siteTagline?: string | null
  logo?: string | null
  favicon?: string | null
  primaryColor: string
  darkColor: string
  seoTitle?: string | null
  seoDescription?: string | null
  seoKeywords?: string | null
  ogImage?: string | null
  contactEmail?: string | null
  contactPhone?: string | null
  address?: string | null
  socialFacebook?: string | null
  socialInstagram?: string | null
  socialTwitter?: string | null
  socialYoutube?: string | null
  googleAnalyticsId?: string | null
  facebookPixelId?: string | null
  updatedAt: Date
}
