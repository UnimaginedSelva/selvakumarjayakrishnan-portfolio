# Cloudflare Deployment Guide

## Selvakumar Jayakrishnan - Portfolio Website

### Files Included
- `index.html` - Main HTML entry point
- `assets/` - JavaScript and CSS bundles
- `hero-bg.jpg` - Hero background image
- `Selvakumar_Jayakrishnan_Resume.pdf` - Downloadable resume

### Deployment Instructions for Cloudflare Pages

#### Option 1: Direct Upload (Drag & Drop)
1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com)
2. Click "Create a project"
3. Select "Upload assets" option
4. Drag and drop all files from this folder:
   - index.html
   - assets/ (folder)
   - hero-bg.jpg
   - Selvakumar_Jayakrishnan_Resume.pdf
5. Click "Deploy"

#### Option 2: Git Integration
1. Push these files to a Git repository (GitHub/GitLab)
2. In Cloudflare Pages, connect your repository
3. Set build command: (leave empty - already built)
4. Set output directory: `/` (root)
5. Deploy

#### Option 3: Wrangler CLI
```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy . --project-name=selvakumar-portfolio
```

### Custom Domain Setup
1. In Cloudflare Pages dashboard, go to your project
2. Click "Custom domains" tab
3. Click "Set up a custom domain"
4. Enter your domain name
5. Follow DNS configuration instructions

### Build Configuration (if rebuilding)
- **Build Command:** `npm run build`
- **Build Output Directory:** `dist`
- **Root Directory:** `/`

### Environment Variables
No environment variables required for this static site.

### Features
- Responsive design
- Smooth scroll navigation
- Downloadable resume
- Contact links
- Animated sections
- Mobile-friendly

### Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
