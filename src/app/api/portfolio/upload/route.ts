import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { writeFile } from 'fs/promises'
import path from 'path'
import { requireAdminSession } from '@/lib/auth'
import { getUploadsDir } from '@/lib/db'

export async function POST(request: Request) {
  try {
    await requireAdminSession()

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 })
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const safeExtension = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)
      ? extension
      : 'jpg'
    const filename = `${randomUUID()}.${safeExtension}`
    const uploadsDir = getUploadsDir()
    const buffer = Buffer.from(await file.arrayBuffer())

    await writeFile(path.join(uploadsDir, filename), buffer)

    return NextResponse.json({ url: `/uploads/thumbnails/${filename}` })
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
