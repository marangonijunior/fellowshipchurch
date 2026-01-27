# SEO & Settings Management Guide

## Overview
Your Fellowship Church website now has comprehensive SEO features and a manageable settings system. All site branding (logo, title) and SEO configurations can be managed from the admin dashboard.

## Features Implemented

### 1. **Site Settings Management** (`/admin/settings`)
Access via: Admin Dashboard → Settings

**General Information:**
- Site Name (appears everywhere on the site)
- Tagline/Slogan
- Logo URL (upload and paste URL)
- Favicon URL

**SEO & Meta Tags:**
- SEO Title (50-60 characters recommended)
- SEO Description (150-160 characters)
- Keywords (comma-separated)
- Open Graph Image (1200x630px for social sharing)

**Contact Information:**
- Email
- Phone
- Physical Address

**Social Media:**
- Facebook URL
- Instagram URL
- Twitter URL
- YouTube URL

**Analytics:**
- Google Analytics 4 ID
- Facebook Pixel ID

### 2. **SEO Features**

#### Dynamic Metadata
- Page-specific titles and descriptions
- Open Graph tags for social media
- Twitter Card integration
- Canonical URLs
- Structured data (JSON-LD)

#### Auto-Generated SEO Files
- **Sitemap** (`/sitemap.xml`) - Auto-updates with all published content
- **Robots.txt** (`/robots.txt`) - Search engine crawling instructions

#### Structured Data (Schema.org)
- Organization schema (church information)
- Article schema (blog posts)
- Event schema (church events)

### 3. **Search Engine Optimization**

#### On-Page SEO
✅ Meta titles and descriptions
✅ Header tags (H1, H2, H3) properly structured
✅ Image alt attributes
✅ Semantic HTML
✅ Mobile-responsive design
✅ Fast page loads (Next.js optimization)

#### Technical SEO
✅ XML Sitemap generation
✅ Robots.txt configuration
✅ Canonical URLs
✅ Structured data markup
✅ Open Graph protocol
✅ Twitter Cards

#### Content SEO
✅ Keyword-optimized content areas
✅ Category and tag organization
✅ Related content linking
✅ Breadcrumb navigation (can be added)

## How to Configure

### Step 1: Access Settings
1. Log in to admin dashboard at `/admin/dashboard`
2. Click "Settings" in the sidebar
3. Only Super Admins can modify settings

### Step 2: Configure Branding
1. **Site Name**: Enter your church name (e.g., "Grace Community Church")
2. **Logo**: 
   - Upload your logo to media library
   - Copy the URL
   - Paste into "Logo URL" field
   - Recommended size: 200px height, transparent PNG
3. **Favicon**: Upload 32x32px or 16x16px icon

### Step 3: Optimize SEO
1. **SEO Title**: 
   - Example: "Grace Community Church - Faith, Hope & Love in [City]"
   - Keep under 60 characters
   - Include primary keywords

2. **SEO Description**:
   - Example: "Join Grace Community Church in [City]. Experience uplifting worship, inspiring sermons, and a welcoming community. Service times: Sunday 9AM & 11AM."
   - Keep 150-160 characters
   - Include call-to-action

3. **Keywords**:
   - Example: "church in [city], [city] church, christian church, worship service, bible study, youth ministry"
   - 5-10 relevant keywords

4. **Open Graph Image**:
   - Upload 1200x630px image
   - Shows when sharing on Facebook, LinkedIn, etc.
   - Use church photo or branded graphic

### Step 4: Add Analytics
1. **Google Analytics**:
   - Create GA4 property at analytics.google.com
   - Copy Measurement ID (format: G-XXXXXXXXXX)
   - Paste into "Google Analytics ID" field
   - Automatically tracks page views, events

2. **Facebook Pixel** (optional):
   - Create pixel at facebook.com/business
   - Copy Pixel ID
   - Paste into "Facebook Pixel ID" field
   - Tracks conversions for FB ads

### Step 5: Configure Contact Info
1. Add email (shows in footer, contact page)
2. Add phone number
3. Add full address (helps local SEO)
4. Add social media URLs (builds authority)

## Best Practices

### SEO Best Practices
1. **Use Keywords Naturally**: Don't stuff keywords
2. **Write for Humans First**: Then optimize for search engines
3. **Keep Content Fresh**: Regular blog posts improve rankings
4. **Use Descriptive URLs**: `/sermons/faith-in-action` vs `/sermon/123`
5. **Optimize Images**: Compress images, use descriptive filenames
6. **Internal Linking**: Link related content together
7. **Mobile-First**: Ensure mobile experience is excellent

### Local SEO Tips
1. **Google Business Profile**: Claim and optimize your listing
2. **NAP Consistency**: Name, Address, Phone must match everywhere
3. **Local Keywords**: Include city/neighborhood in content
4. **Local Schema**: Structured data with address
5. **Reviews**: Encourage Google reviews

### Content Strategy
1. **Blog Regularly**: 1-2 posts per week ideal
2. **Answer Questions**: What people search for
3. **Use Categories**: Organize content logically
4. **Add Tags**: Help users find related content
5. **Update Old Content**: Keep information current

## Monitoring SEO Performance

### Google Search Console
1. Add your site at search.google.com/search-console
2. Verify ownership
3. Submit sitemap: `https://yoursite.com/sitemap.xml`
4. Monitor:
   - Search queries
   - Click-through rates
   - Page rankings
   - Indexing issues

### Google Analytics
- Page views and traffic sources
- User behavior and engagement
- Conversion tracking
- Bounce rates

### Key Metrics to Track
- Organic search traffic
- Keyword rankings
- Page load speed
- Mobile usability
- Backlinks
- Local pack rankings

## Technical Implementation

### Database Schema
```prisma
model SiteSettings {
  siteName          String
  seoTitle          String?
  seoDescription    String?
  seoKeywords       String?
  logo              String?
  favicon           String?
  ogImage           String?
  contactEmail      String?
  socialFacebook    String?
  googleAnalyticsId String?
  // ... more fields
}
```

### API Endpoints
- `GET /api/settings` - Fetch site settings
- `PUT /api/settings` - Update settings (Super Admin only)

### Auto-Generated Files
- `/sitemap.xml` - Dynamic sitemap with all content
- `/robots.txt` - Search engine directives

## Troubleshooting

### Settings Not Showing
- Clear browser cache
- Check database connection
- Verify Super Admin role

### Analytics Not Tracking
- Verify Analytics ID format (G-XXXXXXXXXX)
- Check browser console for errors
- Allow 24-48 hours for data to appear
- Disable ad blockers when testing

### Sitemap Not Updating
- Content must be PUBLISHED status
- Redeploy if using static generation
- Check `/sitemap.xml` directly

### Logo Not Appearing
- Verify image URL is accessible
- Check image format (PNG, SVG, JPG)
- Clear browser cache
- Check browser console for errors

## Next Steps

1. **Submit to Search Engines**:
   - Google Search Console
   - Bing Webmaster Tools
   
2. **Build Backlinks**:
   - Local directory listings
   - Community partnerships
   - News mentions

3. **Create Content Calendar**:
   - Plan blog topics
   - Schedule posts
   - Seasonal content

4. **Monitor & Improve**:
   - Review analytics monthly
   - Test page speed
   - Update content regularly

## Resources

- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com
- Schema.org: https://schema.org
- PageSpeed Insights: https://pagespeed.web.dev
- Google Business Profile: https://business.google.com

---

For support, refer to the main documentation or contact your web administrator.
