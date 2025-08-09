import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Types for CMS content
export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  featured: boolean
  image?: string
  content: string
  readTime: number
}

export interface Service {
  slug: string
  title: string
  description: string
  price?: string
  features: string[]
  category: string
  image?: string
  content: string
  order: number
}

export interface PortfolioItem {
  slug: string
  title: string
  description: string
  client: string
  category: string
  tags: string[]
  date: string
  featured: boolean
  images: string[]
  link?: string
  content: string
  order: number
}

export interface Testimonial {
  id: string
  clientName: string
  company: string
  role: string
  content: string
  rating: number
  date: string
  featured: boolean
  avatar?: string
}

// CMS Directories
const CMS_DIRECTORY = path.join(process.cwd(), 'content')
const BLOG_DIRECTORY = path.join(CMS_DIRECTORY, 'blog')
const SERVICES_DIRECTORY = path.join(CMS_DIRECTORY, 'services')
const PORTFOLIO_DIRECTORY = path.join(CMS_DIRECTORY, 'portfolio')
const TESTIMONIALS_DIRECTORY = path.join(CMS_DIRECTORY, 'testimonials')

// Ensure directories exist
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

// Initialize CMS directories
export function initializeCMS() {
  ensureDirectoryExists(BLOG_DIRECTORY)
  ensureDirectoryExists(SERVICES_DIRECTORY)
  ensureDirectoryExists(PORTFOLIO_DIRECTORY)
  ensureDirectoryExists(TESTIMONIALS_DIRECTORY)
}

// Utility function to calculate read time
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Process markdown content
async function processMarkdown(content: string): Promise<string> {
  const result = await remark().use(html).process(content)
  return result.toString()
}

// Blog Post Functions
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  ensureDirectoryExists(BLOG_DIRECTORY)
  
  const fileNames = fs.readdirSync(BLOG_DIRECTORY).filter(name => name.endsWith('.md'))
  
  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return await getBlogPost(slug)
    })
  )
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await processMarkdown(content)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      author: data.author || 'DOJMARK Team',
      tags: data.tags || [],
      featured: data.featured || false,
      image: data.image,
      content: processedContent,
      readTime: calculateReadTime(content),
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

export async function getFeaturedBlogPosts(limit: number = 3): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter(post => post.featured).slice(0, limit)
}

// Service Functions
export async function getAllServices(): Promise<Service[]> {
  ensureDirectoryExists(SERVICES_DIRECTORY)
  
  const fileNames = fs.readdirSync(SERVICES_DIRECTORY).filter(name => name.endsWith('.md'))
  
  const services = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return await getService(slug)
    })
  )
  
  return services
    .filter((service): service is Service => service !== null)
    .sort((a, b) => a.order - b.order)
}

export async function getService(slug: string): Promise<Service | null> {
  try {
    const filePath = path.join(SERVICES_DIRECTORY, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await processMarkdown(content)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      price: data.price,
      features: data.features || [],
      category: data.category || 'General',
      image: data.image,
      content: processedContent,
      order: data.order || 0,
    }
  } catch (error) {
    console.error(`Error reading service ${slug}:`, error)
    return null
  }
}

// Portfolio Functions
export async function getAllPortfolioItems(): Promise<PortfolioItem[]> {
  ensureDirectoryExists(PORTFOLIO_DIRECTORY)
  
  const fileNames = fs.readdirSync(PORTFOLIO_DIRECTORY).filter(name => name.endsWith('.md'))
  
  const items = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      return await getPortfolioItem(slug)
    })
  )
  
  return items
    .filter((item): item is PortfolioItem => item !== null)
    .sort((a, b) => b.order - a.order)
}

export async function getPortfolioItem(slug: string): Promise<PortfolioItem | null> {
  try {
    const filePath = path.join(PORTFOLIO_DIRECTORY, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const processedContent = await processMarkdown(content)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      client: data.client || '',
      category: data.category || 'Web Development',
      tags: data.tags || [],
      date: data.date || new Date().toISOString(),
      featured: data.featured || false,
      images: data.images || [],
      link: data.link,
      content: processedContent,
      order: data.order || 0,
    }
  } catch (error) {
    console.error(`Error reading portfolio item ${slug}:`, error)
    return null
  }
}

export async function getFeaturedPortfolioItems(limit: number = 6): Promise<PortfolioItem[]> {
  const allItems = await getAllPortfolioItems()
  return allItems.filter(item => item.featured).slice(0, limit)
}

// Testimonial Functions
export async function getAllTestimonials(): Promise<Testimonial[]> {
  ensureDirectoryExists(TESTIMONIALS_DIRECTORY)
  
  const fileNames = fs.readdirSync(TESTIMONIALS_DIRECTORY).filter(name => name.endsWith('.md'))
  
  const testimonials = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '')
      return await getTestimonial(id)
    })
  )
  
  return testimonials
    .filter((testimonial): testimonial is Testimonial => testimonial !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getTestimonial(id: string): Promise<Testimonial | null> {
  try {
    const filePath = path.join(TESTIMONIALS_DIRECTORY, `${id}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    return {
      id,
      clientName: data.clientName || '',
      company: data.company || '',
      role: data.role || '',
      content: content.trim(),
      rating: data.rating || 5,
      date: data.date || new Date().toISOString(),
      featured: data.featured || false,
      avatar: data.avatar,
    }
  } catch (error) {
    console.error(`Error reading testimonial ${id}:`, error)
    return null
  }
}

export async function getFeaturedTestimonials(limit: number = 3): Promise<Testimonial[]> {
  const allTestimonials = await getAllTestimonials()
  return allTestimonials.filter(testimonial => testimonial.featured).slice(0, limit)
}

// Search functionality
export async function searchContent(query: string): Promise<{
  blogPosts: BlogPost[]
  services: Service[]
  portfolioItems: PortfolioItem[]
}> {
  const [blogPosts, services, portfolioItems] = await Promise.all([
    getAllBlogPosts(),
    getAllServices(),
    getAllPortfolioItems(),
  ])
  
  const searchTerm = query.toLowerCase()
  
  const filteredBlogPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm) ||
    post.description.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
  
  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchTerm) ||
    service.description.toLowerCase().includes(searchTerm) ||
    service.category.toLowerCase().includes(searchTerm)
  )
  
  const filteredPortfolioItems = portfolioItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm) ||
    item.description.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    item.category.toLowerCase().includes(searchTerm)
  )
  
  return {
    blogPosts: filteredBlogPosts,
    services: filteredServices,
    portfolioItems: filteredPortfolioItems,
  }
}
