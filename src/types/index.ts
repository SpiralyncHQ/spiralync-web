import type { Timestamp } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  category: string        // category id
  imageUrl: string
  websiteUrl?: string
  appStoreUrl?: string
  playStoreUrl?: string
  order: number
  createdAt: Timestamp
}

export interface ProjectCategory {
  id: string
  name: string
  slug: string
  icon: string            // emoji or icon name
  order: number
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string         // HTML from Tiptap
  category: string
  featuredImageUrl: string
  author: string
  readTimeMinutes: number
  published: boolean
  metaTitle?: string
  metaDescription?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CareerListing {
  id: string
  title: string
  department: string
  location: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote'
  salaryRange?: string
  description: string     // HTML
  responsibilities: string[]
  requirements: string[]
  deadline?: Timestamp
  active: boolean
  createdAt: Timestamp
}

export interface Testimonial {
  id: string
  clientName: string
  clientTitle: string
  clientCompany: string
  clientPhotoUrl?: string
  review: string
  rating: number          // 1–5
  order: number
}

export interface Enquiry {
  id: string
  type: 'contact' | 'quote'
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  projectType?: string
  budget?: string
  timeline?: string
  read: boolean
  createdAt: Timestamp
}

export interface JobApplication {
  id: string
  careerId: string
  careerTitle: string
  name: string
  email: string
  phone: string
  linkedinUrl: string
  cvUrl: string           // Firebase Storage URL
  coverLetterUrl: string  // Firebase Storage URL
  createdAt: Timestamp
}
