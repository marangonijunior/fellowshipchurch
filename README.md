# Fellowship Church - Content Management System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)
![License](https://img.shields.io/badge/License-Private-red)

A comprehensive, modern content management system built for Fellowship Church to manage news, blog posts, events, sermons, and site settings with role-based access control.

[Quick Start](#-quick-start) • [Features](#-features) • [Documentation](#-documentation) • [Project Structure](#-project-structure) • [API Routes](#-api-routes)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [API Routes](#-api-routes)
- [User Roles & Permissions](#-user-roles--permissions)
- [Development Workflow](#-development-workflow)
- [Deployment](#-deployment)
- [SEO Features](#-seo-features)
- [Documentation](#-documentation)
- [License](#-license)

---

## 🎯 Overview

Fellowship Church CMS is a full-stack web application designed to help church administrators manage their online presence efficiently. The system provides:

- **Public Website**: Beautiful, responsive pages for visitors (homepage, about, contact, blog, events, sermons)
- **Admin Dashboard**: Powerful content management interface with role-based access
- **API Layer**: RESTful API routes for all CRUD operations
- **SEO Optimization**: Built-in SEO features including dynamic sitemaps, meta tags, and structured data
- **Analytics Integration**: Google Analytics 4 and Facebook Pixel support

**Built for:** Church administrators, content editors, and web managers  
**Primary Goal:** Simplify church content management and improve online engagement

---

## ✨ Features

### 🌐 Public Website
- ✅ **Responsive Design** - Mobile-first approach, works beautifully on all devices
- ✅ **Dynamic Homepage** - Hero section, featured content, latest posts/events/sermons
- ✅ **Blog System** - Full blog with categories, tags, featured images, and related posts
- ✅ **Events Management** - Display upcoming events with calendar integration
- ✅ **Sermons Library** - Organized sermons with preacher info and dates
- ✅ **Contact Form** - Easy communication with church leadership
- ✅ **SEO Optimized** - Meta tags, Open Graph, structured data (JSON-LD)

### 🔐 Authentication & Authorization
- ✅ **NextAuth.js v5** - Secure authentication with JWT sessions
- ✅ **Role-Based Access Control** - 4 user roles (Super Admin, Editor, Author, Viewer)
- ✅ **Protected Routes** - Middleware protection for admin area
- ✅ **Credential-Based Login** - Email and password authentication

### 📊 Admin Dashboard
- ✅ **Dashboard Overview** - Statistics and recent activity
- ✅ **Posts Management** - Create, edit, delete, and publish blog posts
- ✅ **Events Management** - Manage church events with dates, locations, and details
- ✅ **Sermons Management** - Organize sermons by date, preacher, and topic
- ✅ **Site Settings** - Configure branding, SEO, contact info, social media, analytics
- ✅ **Media Library** - Upload and manage images (via Vercel Blob)
- ✅ **User Management** - Add, edit, and manage user roles (Super Admin only)

### 🎨 Design System
- ✅ **Custom Tailwind Theme** - Brand colors: Peach (#FFD7A8), Dark (#1A1D23), Cream (#F5F1ED)
- ✅ **Typography** - Poppins for headings, Inter for body text
- ✅ **Reusable Components** - Modular, maintainable component architecture
- ✅ **Dark Mode Support** - Admin dashboard with dark theme

### 🔍 SEO & Analytics
- ✅ **Dynamic Sitemap** - Auto-generated from database content (`/sitemap.xml`)
- ✅ **Robots.txt** - Configured for search engine crawling (`/robots.txt`)
- ✅ **Structured Data** - JSON-LD schemas for Organization, Articles, Events
- ✅ **Meta Tags** - Dynamic Open Graph and Twitter Card meta tags
- ✅ **Google Analytics 4** - Track visitor behavior
- ✅ **Facebook Pixel** - Monitor conversions and retargeting

### 📅 Calendar Integration
- ✅ **Add to Google Calendar** - One-click event addition
- ✅ **Download .ics Files** - Compatible with all calendar apps
- ✅ **Event Reminders** - Help visitors remember upcoming events

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) (Vercel Postgres) |
| **ORM** | [Prisma 5](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js v5 Beta](https://authjs.dev/) |
| **File Storage** | [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | React Hook Form + Zod |

### Why These Technologies?

- **Next.js 15**: React Server Components, edge runtime, automatic optimizations
- **TypeScript**: Type safety, better developer experience, fewer bugs
- **Prisma**: Type-safe database client, easy migrations, excellent DX
- **Tailwind CSS**: Rapid UI development, consistent design system
- **Vercel**: Zero-config deployment, edge network, integrated database

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/marangonijunior/fellowshipchurch.git
cd fellowshipchurch

# 2. Install dependencies
npm install

# 3. Setup environment variables (see SETUP.md)
cp .env.example .env
# Edit .env with your database URLs and secrets

# 4. Push database schema
npx prisma generate
npx prisma db push

# 5. Seed database (optional)
npm run db:seed

# 6. Start development server
npm run dev

# 7. Open browser
# http://localhost:3000
```

👉 **For detailed setup instructions, see [SETUP.md](./SETUP.md)**

---

## 📁 Project Structure

```
fellowshipchurch/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with metadata
│   ├── globals.css               # Global styles
│   │
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── blog/                     # Blog pages
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Individual blog post
│   ├── events/                   # Events pages
│   │   ├── page.tsx              # Events listing
│   │   └── [id]/page.tsx         # Individual event
│   ├── sermons/                  # Sermons pages
│   │   ├── page.tsx              # Sermons listing
│   │   └── [id]/page.tsx         # Individual sermon
│   │
│   ├── login/                    # Login page
│   │
│   ├── admin/                    # Admin dashboard (protected)
│   │   ├── layout.tsx            # Admin layout with sidebar
│   │   ├── dashboard/page.tsx    # Dashboard overview
│   │   ├── posts/page.tsx        # Posts management
│   │   ├── events/page.tsx       # Events management
│   │   ├── sermons/page.tsx      # Sermons management
│   │   └── settings/page.tsx     # Site settings (Super Admin)
│   │
│   ├── api/                      # API Routes
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── posts/                # Posts CRUD API
│   │   │   ├── route.ts          # GET (list), POST (create)
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE (single)
│   │   ├── events/               # Events CRUD API
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── sermons/              # Sermons CRUD API
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── settings/             # Site settings API
│   │       └── route.ts          # GET, PUT
│   │
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── robots.ts                 # Search engine directives
│
├── components/
│   ├── admin/
│   │   ├── AdminSidebar.tsx      # Admin navigation
│   │   └── StatsCard.tsx         # Dashboard statistics
│   └── shared/
│       ├── Header.tsx            # Public header with nav
│       ├── Footer.tsx            # Public footer
│       ├── SEO.tsx               # SEO helper functions
│       └── StructuredData.tsx    # JSON-LD schemas
│
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── db.ts                     # Prisma client singleton
│   ├── settings.ts               # Site settings helper
│   ├── calendar.ts               # Calendar event utilities
│   └── utils.ts                  # General utilities
│
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Database seed script
│
├── types/
│   ├── index.ts                  # TypeScript type definitions
│   └── next-auth.d.ts            # NextAuth type extensions
│
├── middleware.ts                 # Route protection middleware
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
│
├── README.md                     # This file
├── SETUP.md                      # Setup guide
└── SEO_GUIDE.md                  # SEO documentation
```

### Key Directories Explained

| Directory | Purpose |
|-----------|---------|
| `app/` | Next.js App Router - all pages and API routes |
| `app/(public)/` | Public-facing pages (no auth required) |
| `app/admin/` | Protected admin pages (auth required) |
| `app/api/` | RESTful API endpoints |
| `components/` | Reusable React components |
| `lib/` | Utility functions and configurations |
| `prisma/` | Database schema and migrations |
| `types/` | TypeScript type definitions |

---

## 🗄️ Database Schema

The application uses **PostgreSQL** with **Prisma ORM**. Here's an overview of the data models:

### Core Models

#### User
Handles authentication and authorization.

```prisma
model User {
  id            String    @id @default(cuid())
  name          String
  email         String    @unique
  password      String?
  role          Role      @default(VIEWER)
  posts         Post[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Role {
  SUPER_ADMIN  // Full system access
  EDITOR       // Manage all content
  AUTHOR       // Create and edit own content
  VIEWER       // Read-only access
}
```

#### Post
Blog posts, news articles, and announcements.

```prisma
model Post {
  id             String    @id @default(cuid())
  title          String
  slug           String    @unique
  excerpt        String?
  content        String    @db.Text
  featuredImage  String?
  status         Status    @default(DRAFT)
  type           PostType  @default(BLOG)
  publishedAt    DateTime?
  authorId       String
  author         User      @relation(fields: [authorId], references: [id])
  categories     Category[]
  tags           Tag[]
  seoTitle       String?
  seoDescription String?
  viewCount      Int       @default(0)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}

enum Status {
  DRAFT       // Not visible to public
  PENDING     // Awaiting review
  PUBLISHED   // Visible to public
  ARCHIVED    // Hidden but not deleted
}

enum PostType {
  NEWS          // Church news
  BLOG          // Blog articles
  ANNOUNCEMENT  // Important announcements
}
```

#### Event
Church events (services, meetings, special events).

```prisma
model Event {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  type        String   // Weekly, Monthly, Special Event
  description String   @db.Text
  date        DateTime
  time        String
  location    String
  image       String?
  status      Status   @default(DRAFT)
  publishedAt DateTime?
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### Sermon
Sermon recordings and notes.

```prisma
model Sermon {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String   @db.Text
  date        DateTime
  time        String
  location    String
  preacher    String
  image       String?
  status      Status   @default(DRAFT)
  publishedAt DateTime?
  authorId    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### SiteSettings
Global site configuration (single record).

```prisma
model SiteSettings {
  id                String  @id @default(cuid())
  siteName          String  @default("Fellowship Church")
  siteTagline       String?
  logo              String?
  favicon           String?
  primaryColor      String  @default("#FFD7A8")
  darkColor         String  @default("#1A1D23")
  seoTitle          String?
  seoDescription    String?
  seoKeywords       String?
  ogImage           String?
  contactEmail      String?
  contactPhone      String?
  address           String?
  socialFacebook    String?
  socialInstagram   String?
  socialTwitter     String?
  socialYoutube     String?
  googleAnalyticsId String?
  facebookPixelId   String?
  updatedAt         DateTime @updatedAt
}
```

### Supporting Models

- **Category**: Organize posts by topics
- **Tag**: Flexible tagging system for posts
- **Media**: Track uploaded files and images
- **Account**: OAuth accounts (NextAuth.js)
- **Session**: User sessions (NextAuth.js)

👉 **Full schema:** See [prisma/schema.prisma](./prisma/schema.prisma)

---

## 🔌 API Routes

All API routes are RESTful and protected with authentication where needed.

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signin` | User login | - |
| POST | `/api/auth/signout` | User logout | ✅ |
| GET | `/api/auth/session` | Get current session | ✅ |

### Posts
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/posts` | List posts (with filters) | - | - |
| GET | `/api/posts/[id]` | Get single post | - | - |
| POST | `/api/posts` | Create new post | ✅ | Author+ |
| PUT | `/api/posts/[id]` | Update post | ✅ | Editor+ or Owner |
| DELETE | `/api/posts/[id]` | Delete post | ✅ | Editor+ |

**Query Parameters for GET /api/posts:**
- `status` - Filter by status (DRAFT, PUBLISHED, etc.)
- `type` - Filter by type (NEWS, BLOG, ANNOUNCEMENT)
- `authorId` - Filter by author

### Events
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/events` | List events | - | - |
| GET | `/api/events/[id]` | Get single event | - | - |
| POST | `/api/events` | Create new event | ✅ | Author+ |
| PUT | `/api/events/[id]` | Update event | ✅ | Editor+ or Owner |
| DELETE | `/api/events/[id]` | Delete event | ✅ | Editor+ |

### Sermons
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/sermons` | List sermons | - | - |
| GET | `/api/sermons/[id]` | Get single sermon | - | - |
| POST | `/api/sermons` | Create new sermon | ✅ | Author+ |
| PUT | `/api/sermons/[id]` | Update sermon | ✅ | Editor+ or Owner |
| DELETE | `/api/sermons/[id]` | Delete sermon | ✅ | Editor+ |

### Site Settings
| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/api/settings` | Get site settings | - | - |
| PUT | `/api/settings` | Update settings | ✅ | Super Admin |

### API Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 👥 User Roles & Permissions

The system uses 4 hierarchical roles:

| Feature | Super Admin | Editor | Author | Viewer |
|---------|:-----------:|:------:|:------:|:------:|
| **General** |
| View Dashboard | ✅ | ✅ | ✅ | ❌ |
| View Public Pages | ✅ | ✅ | ✅ | ✅ |
| **Posts** |
| Create Posts | ✅ | ✅ | ✅ | ❌ |
| Edit Own Posts | ✅ | ✅ | ✅ | ❌ |
| Edit All Posts | ✅ | ✅ | ❌ | ❌ |
| Delete Posts | ✅ | ✅ | ❌ | ❌ |
| Publish Posts | ✅ | ✅ | ❌ | ❌ |
| **Events & Sermons** |
| Create Events/Sermons | ✅ | ✅ | ✅ | ❌ |
| Edit Own Events/Sermons | ✅ | ✅ | ✅ | ❌ |
| Edit All Events/Sermons | ✅ | ✅ | ❌ | ❌ |
| Delete Events/Sermons | ✅ | ✅ | ❌ | ❌ |
| **Content Organization** |
| Manage Categories | ✅ | ✅ | ❌ | ❌ |
| Manage Tags | ✅ | ✅ | ❌ | ❌ |
| **Media** |
| Upload Media | ✅ | ✅ | ✅ | ❌ |
| Delete Media | ✅ | ✅ | ❌ | ❌ |
| **Administration** |
| Manage Users | ✅ | ❌ | ❌ | ❌ |
| Site Settings | ✅ | ❌ | ❌ | ❌ |
| System Configuration | ✅ | ❌ | ❌ | ❌ |

### Role Descriptions

**🔴 Super Admin**
- Full system access
- Manage all users and roles
- Configure site settings (branding, SEO, analytics)
- Delete any content
- Ideal for: Church leadership, IT administrators

**🟠 Editor**
- Manage all content (posts, events, sermons)
- Publish and unpublish content
- Manage categories and tags
- Upload and organize media
- Ideal for: Content managers, communications team

**🟡 Author**
- Create new content
- Edit own content
- Submit for review
- Upload media
- Ideal for: Ministry leaders, guest bloggers

**🟢 Viewer**
- Read-only access to public pages
- No admin dashboard access
- Ideal for: Church members, guests

---

## 💻 Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# Open Prisma Studio (database GUI)
npx prisma studio

# Run linter
npm run lint

# Build for production
npm run build
```

### Making Changes

1. **Database Schema Changes:**
   ```bash
   # Edit prisma/schema.prisma
   npx prisma generate      # Regenerate Prisma client
   npx prisma db push       # Push changes to database
   ```

2. **Adding New Pages:**
   - Create file in `app/` directory
   - Follow Next.js App Router conventions
   - Use Server Components by default

3. **Adding New API Routes:**
   - Create `route.ts` in `app/api/` directory
   - Export GET, POST, PUT, DELETE functions
   - Add authentication checks

4. **Updating Components:**
   - Edit files in `components/` directory
   - Maintain "use client" directives for client components
   - Use TypeScript for type safety

### Coding Standards

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Prefer Server Components, use Client Components only when needed
- **Styling**: Use Tailwind utility classes, avoid custom CSS
- **Naming**: Use PascalCase for components, camelCase for functions/variables
- **Comments**: Document complex logic, avoid obvious comments

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: your feature description"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

#### Method 1: GitHub Integration

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your repository
   - Vercel auto-detects Next.js settings
   - Click **Deploy**

3. **Setup Database:**
   - In Vercel project → **Storage** → **Create Database** → **Postgres**
   - Environment variables auto-added
   - Run migrations: `npx prisma db push`

4. **Add Environment Variables:**
   - `NEXTAUTH_URL`: Your production URL
   - `NEXTAUTH_SECRET`: Generate new secret
   - Other variables from `.env`

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables

**Development (.env):**
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-dev-secret
BLOB_READ_WRITE_TOKEN=
```

**Production (Vercel Dashboard):**
- All same variables, but use production URLs
- Generate new `NEXTAUTH_SECRET` for security

### Post-Deployment Checklist

- [ ] Database migrated successfully
- [ ] All environment variables set
- [ ] Site settings configured via `/admin/settings`
- [ ] Default admin password changed
- [ ] Google Analytics ID added (if using)
- [ ] Facebook Pixel ID added (if using)
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Test all pages and features
- [ ] Verify sitemap: `/sitemap.xml`
- [ ] Verify robots.txt: `/robots.txt`

---

## 🔍 SEO Features

The CMS includes comprehensive SEO optimization out of the box.

### Automatic Features

1. **Dynamic Sitemap** (`/sitemap.xml`)
   - Auto-generated from database
   - Includes all published posts, events, sermons
   - Updates automatically when content changes

2. **Robots.txt** (`/robots.txt`)
   - Allows public pages
   - Disallows admin and API routes
   - Points to sitemap

3. **Meta Tags**
   - Dynamic page titles
   - Open Graph tags for social sharing
   - Twitter Card tags
   - Canonical URLs

4. **Structured Data (JSON-LD)**
   - Organization schema
   - Article schema for blog posts
   - Event schema for events
   - BreadcrumbList for navigation

### Configurable via Admin

Go to `/admin/settings` to configure:

- **SEO Title**: Default site title for meta tags
- **SEO Description**: Site description
- **SEO Keywords**: Target keywords
- **Open Graph Image**: Default share image
- **Google Analytics ID**: GA4 tracking
- **Facebook Pixel ID**: FB conversion tracking

### Best Practices

✅ **Do:**
- Write unique, descriptive page titles (50-60 characters)
- Craft compelling meta descriptions (150-160 characters)
- Use high-quality featured images (1200x630px for OG)
- Add alt text to all images
- Use descriptive URLs/slugs
- Publish regularly

❌ **Don't:**
- Keyword stuff
- Duplicate content across pages
- Use generic titles like "Home" or "Blog"
- Ignore mobile responsiveness
- Block search engines in robots.txt

👉 **For comprehensive SEO guide, see [SEO_GUIDE.md](./SEO_GUIDE.md)**

---

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup and installation guide
- **[SEO_GUIDE.md](./SEO_GUIDE.md)** - SEO features and best practices
- **[README.md](./README.md)** - This file (project overview)

### Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [NextAuth.js Documentation](https://authjs.dev/)

---

## 🧪 Testing

### Manual Testing Checklist

**Public Pages:**
- [ ] Homepage loads and displays content
- [ ] Blog listing shows posts
- [ ] Individual blog post displays correctly
- [ ] Events listing shows events
- [ ] Sermons listing shows sermons
- [ ] Contact form works
- [ ] Mobile responsive on all pages

**Authentication:**
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials fails
- [ ] Logout works
- [ ] Session persists across page reloads
- [ ] Protected routes redirect to login

**Admin Dashboard:**
- [ ] Dashboard displays statistics
- [ ] Posts management works (create, edit, delete)
- [ ] Events management works
- [ ] Sermons management works
- [ ] Settings page works (Super Admin only)
- [ ] Role-based access control working

**API Routes:**
- [ ] GET requests return correct data
- [ ] POST requests create new records
- [ ] PUT requests update records
- [ ] DELETE requests remove records
- [ ] Authentication checks work
- [ ] Role permissions enforced

### Automated Testing (Future)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

---

## 🛡️ Security

### Implemented Security Measures

- ✅ **Password Hashing**: Bcrypt with salt rounds
- ✅ **JWT Sessions**: Secure token-based authentication
- ✅ **CSRF Protection**: Built into NextAuth.js
- ✅ **SQL Injection Prevention**: Prisma ORM parameterized queries
- ✅ **XSS Prevention**: React automatic escaping
- ✅ **Role-Based Access Control**: Granular permissions
- ✅ **Environment Variables**: Secrets not committed to git
- ✅ **HTTPS**: Enforced in production (Vercel)

### Best Practices

1. **Change default passwords** immediately after deployment
2. **Use strong secrets** for NEXTAUTH_SECRET
3. **Rotate secrets** regularly
4. **Enable 2FA** for admin accounts (future feature)
5. **Monitor logs** for suspicious activity
6. **Keep dependencies updated**: `npm audit`
7. **Regular backups** via Vercel Postgres

---

## 🤝 Contributing

This is a private project for Fellowship Church. If you're part of the development team:

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit your changes: `git commit -m 'Add: amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request for review

### Commit Message Guidelines

- `Add:` - New feature
- `Fix:` - Bug fix
- `Update:` - Changes to existing feature
- `Refactor:` - Code refactoring
- `Docs:` - Documentation changes
- `Style:` - Formatting, CSS changes
- `Test:` - Adding tests

---

## 📄 License

This project is private and proprietary to Fellowship Church. All rights reserved.

Unauthorized copying, distribution, or use is strictly prohibited.

---

## 🙏 Acknowledgments

Built with love for Fellowship Church by:
- **Developer**: Hednei Marangoni Junior
- **Organization**: Fellowship Church

**Technologies Used:**
- Next.js Team - React framework
- Vercel - Hosting and database
- Prisma - Database ORM
- Tailwind Labs - CSS framework

---

## 📧 Support & Contact

For questions, issues, or feature requests:

- **Developer**: hednei.marangoni@example.com
- **Church**: contact@fellowshipchurch.com

---

<div align="center">

**Built with ❤️ for Fellowship Church**

[Documentation](./SETUP.md) • [SEO Guide](./SEO_GUIDE.md) • [GitHub](https://github.com/marangonijunior/fellowshipchurch)

</div>
