import { promises as fs } from 'fs'
import path from 'path'
import type { PortfolioItem } from '@/data/site'
import { seedPortfolioItems } from '@/lib/seed-portfolio'

export interface StoredPortfolioItem extends PortfolioItem {
  displayOrder: number
  createdAt: string
  updatedAt: string
}

export interface ContactMessage {
  id: string
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  read: boolean
  reply: string | null
  repliedAt: string | null
  createdAt: string
}

const dataDir = path.join(process.cwd(), 'data', 'db')
const portfolioPath = path.join(dataDir, 'portfolio.json')
const messagesPath = path.join(dataDir, 'messages.json')
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'thumbnails')

async function ensureDataDir() {
  await fs.mkdir(dataDir, { recursive: true })
  await fs.mkdir(uploadsDir, { recursive: true })
}

function toStoredItem(item: PortfolioItem, index: number): StoredPortfolioItem {
  const now = new Date().toISOString()
  return {
    ...item,
    displayOrder: index,
    createdAt: now,
    updatedAt: now,
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir()
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir()
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export async function getPortfolioItems(): Promise<StoredPortfolioItem[]> {
  const items = await readJsonFile<StoredPortfolioItem[] | null>(portfolioPath, null)

  if (!items || items.length === 0) {
    const seeded = seedPortfolioItems.map((item, index) => toStoredItem(item, index))
    await writeJsonFile(portfolioPath, seeded)
    return seeded
  }

  return items
}

export async function savePortfolioItems(items: StoredPortfolioItem[]): Promise<void> {
  await writeJsonFile(portfolioPath, items)
}

export async function getMessages(): Promise<ContactMessage[]> {
  return readJsonFile<ContactMessage[]>(messagesPath, [])
}

export async function saveMessages(messages: ContactMessage[]): Promise<void> {
  await writeJsonFile(messagesPath, messages)
}

export function getUploadsDir() {
  return uploadsDir
}
