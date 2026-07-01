import { randomUUID } from 'crypto'
import { getMessages, saveMessages, type ContactMessage } from '@/lib/db'

export async function listMessages(): Promise<ContactMessage[]> {
  const messages = await getMessages()
  return messages.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )
}

export interface MessageInput {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
}

export async function createMessage(input: MessageInput): Promise<ContactMessage> {
  const message: ContactMessage = {
    id: randomUUID(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email: input.email.trim(),
    subject: input.subject.trim(),
    message: input.message.trim(),
    read: false,
    reply: null,
    repliedAt: null,
    createdAt: new Date().toISOString(),
  }

  const messages = await getMessages()
  messages.push(message)
  await saveMessages(messages)
  return message
}

export async function updateMessage(
  id: string,
  data: { read?: boolean; reply?: string }
): Promise<ContactMessage> {
  const messages = await getMessages()
  const index = messages.findIndex((item) => item.id === id)

  if (index === -1) {
    throw new Error('NOT_FOUND')
  }

  const current = messages[index]
  const updated: ContactMessage = {
    ...current,
    read: data.read ?? current.read,
    reply: data.reply !== undefined ? data.reply.trim() || null : current.reply,
    repliedAt:
      data.reply !== undefined && data.reply.trim()
        ? new Date().toISOString()
        : current.repliedAt,
  }

  messages[index] = updated
  await saveMessages(messages)
  return updated
}

export async function deleteMessage(id: string): Promise<void> {
  const messages = await getMessages()
  const next = messages.filter((item) => item.id !== id)

  if (next.length === messages.length) {
    throw new Error('NOT_FOUND')
  }

  await saveMessages(next)
}

export async function getUnreadCount(): Promise<number> {
  const messages = await getMessages()
  return messages.filter((message) => !message.read).length
}
