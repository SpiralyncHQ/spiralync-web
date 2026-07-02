# Spiralync — Official Website

> A full-featured company website for Spiralync built with Vue 3 + Vite + TypeScript + Tailwind CSS v4, Firebase backend, and a custom headless CMS.

---

## Overview

Spiralync is a technology consultancy and software development company based in London, UK. This repository contains the full source code for the public-facing marketing website and internal content management system.

The site is designed to serve multiple business objectives simultaneously: converting inbound leads, showcasing a portfolio of mobile apps and web projects, publishing thought-leadership content, attracting talent, and enabling direct client engagement via quote requests and contact forms.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 (Composition API) |
| Build Tool | Vite |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Routing | Vue Router 4 |
| State | Pinia |
| Backend/DB | Firebase (Firestore + Storage + Auth) |
| Email | EmailJS (contact + quote + careers forms) |
| Rich Text | Tiptap (blog editor in CMS) |
| Hosting | Netlify (recommended) |

---

## Features

### Public Website

#### Splash Screen
- Animated brand intro on first load using the Spiralync logo
- Auto-transitions into the main homepage after ~2.5 seconds
- Skippable via click/tap
- Uses `sessionStorage` so it only shows once per session

#### Homepage (`/`)
- **Hero section** — muted autoplay looping background video (human/lifestyle footage) with overlay text, CTA buttons, and scroll indicator
- **About Us** — company story, mission, and values with supporting visual
- **Projects** — filterable card grid across three categories: Websites, Mobile Apps, and Tech Innovations. Each card opens a modal containing: project description, screenshot/image, live website link, and App Store / Google Play links where applicable
- **Customer Reviews** — testimonial carousel with star ratings, client name, company, and photo
- **Request a Quote** — inline form collecting project type, budget range, timeline, and brief description; submits to email via EmailJS
- **Footer** — company address (London), phone, email (`info@spiralync.com`), Google Maps link, social links, Terms of Service modal, Privacy Policy modal, copyright

#### Blog (`/blog`)
- Card grid of published blog posts (title, category tag, excerpt, author, date, read time)
- Live search bar filtering posts by title or tag in real time
- Click-through to full post page (`/blog/:slug`) with rich content rendering
- Open Graph meta tags per post for social sharing

#### Careers (`/careers`)
- Card grid of open roles (title, department, location, type: full-time / contract / remote)
- Click to expand full role description, responsibilities, and requirements
- Apply button opens inline application form: name, email, phone, LinkedIn URL, CV upload (PDF), cover letter upload (PDF) — all compulsory
- Applications submitted to email and stored in Firestore

#### Terms of Service & Privacy Policy
- Triggered from footer links
- Opens as a full-screen modal overlay — no separate route
- Content managed via CMS

---

### Admin CMS (`/tty_admin`)

Protected by Firebase Authentication (email + password). No public registration — access is granted manually.

#### Dashboard
- Overview cards: total blog posts, active projects, open roles, unread contact enquiries, unread quote requests
- Recent activity feed

#### Blog Manager
- Create, edit, delete blog posts
- Tiptap rich text editor (headings, bold, italic, links, images, bullet lists, code blocks)
- Featured image upload
- Category assignment
- Publish / Draft toggle
- SEO fields: meta title, meta description, slug (auto-generated from title, editable)

#### Projects Manager
- Add, edit, delete projects
- Category assignment via dropdown (categories are themselves manageable — see below)
- Fields: title, short description, full description, image upload, website URL, App Store URL, Google Play URL
- Drag-to-reorder within category

#### Project Categories Manager
- Full CRUD for project categories (e.g. Websites, Mobile Apps, Tech Innovations, and any future additions)
- Category name, slug, display icon (emoji or icon name), sort order

#### Careers Manager
- Post, edit, archive job listings
- Fields: role title, department, location, employment type, salary range (optional), role description (rich text), responsibilities, requirements, application deadline

#### Enquiries Inbox
- View all contact form submissions and quote requests
- Mark as read / archive
- Respond via email link

#### Settings
- Update company details surfaced on the site (address, phone, email, Google Maps URL)
- Manage Terms of Service and Privacy Policy content (rich text)
- Change admin password

---

## Project Structure

```
spiralync/
├── public/
│   ├── logo-1024.png           # Main logo (1024px)
│   ├── favicon.ico
│   ├── icon-192.png            # PWA icon
│   └── icon-512.png            # PWA icon
├── src/
│   ├── assets/
│   │   └── video/
│   │       └── hero-bg.mp4     # Background video (replace with real footage)
│   ├── components/
│   │   ├── common/             # Reusable: Modal, Button, Card, Spinner, etc.
│   │   ├── layout/             # Header, Footer, AdminSidebar
│   │   ├── home/               # HeroSection, AboutSection, ProjectsSection, etc.
│   │   ├── blog/               # BlogCard, BlogSearch, BlogPost
│   │   ├── careers/            # CareerCard, ApplicationForm
│   │   └── admin/              # All CMS components
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── BlogView.vue
│   │   ├── BlogPostView.vue
│   │   ├── CareersView.vue
│   │   └── admin/
│   │       ├── AdminLogin.vue
│   │       ├── AdminDashboard.vue
│   │       ├── AdminBlog.vue
│   │       ├── AdminProjects.vue
│   │       ├── AdminCategories.vue
│   │       ├── AdminCareers.vue
│   │       ├── AdminEnquiries.vue
│   │       └── AdminSettings.vue
│   ├── router/
│   │   └── index.ts            # Vue Router config with auth guards
│   ├── stores/
│   │   ├── auth.ts             # Pinia: Firebase auth state
│   │   ├── projects.ts
│   │   ├── blog.ts
│   │   └── careers.ts
│   ├── composables/
│   │   ├── useFirestore.ts
│   │   ├── useEmailJS.ts
│   │   └── useModal.ts
│   ├── firebase/
│   │   └── config.ts           # Firebase initialisation
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces
│   └── main.ts
├── .env.example                # Template for environment variables
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# EmailJS
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_CONTACT_TEMPLATE_ID=
VITE_EMAILJS_QUOTE_TEMPLATE_ID=
VITE_EMAILJS_CAREERS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Deployment

Recommended: **Netlify**

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add all environment variables from `.env.local` to Netlify's environment settings
5. Add a `_redirects` file to `public/`:
   ```
   /* /index.html 200
   ```
   This ensures Vue Router's history mode works correctly.

---

## Admin Access

Navigate to `/tty_admin` — you will be redirected to the login page if not authenticated. Admin credentials are set directly in Firebase Authentication console. Do not commit credentials to the repository.

---

## Logo & Brand Assets

| File | Size | Usage |
|---|---|---|
| `public/logo-1024.png` | 1024×1024px | Primary logo, high-res |
| `public/icon-512.png` | 512×512px | PWA manifest |
| `public/icon-192.png` | 192×192px | PWA manifest |
| `public/favicon.ico` | 32×32px | Browser tab |

Brand colours:
- Primary: `#0A2540` (deep navy)
- Accent: `#00C896` (tech teal)
- Surface: `#F7F9FC`
- Text: `#1A1A2E`

---

## Contact

**Spiralync**
Temple Quay House, 2 The Square, Temple Quay, London NW1 6DG
📧 info@spiralync.com
📞 +44 117 123 4567
🌐 [spiralync.com](https://spiralync.com)
[View on Google Maps](https://maps.google.com/?q=Temple+Quay+Bristol)

---

## Licence

Proprietary — © 2026 Spiralync. All rights reserved.