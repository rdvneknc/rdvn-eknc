import { Resend } from 'resend'
import type { MessageInput } from '@/lib/messages'

const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'ridvanekinci92@gmail.com'
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

const subjectLabels: Record<string, string> = {
  'video-ads': 'AI-Powered Video Ads',
  'ugc-creatives': 'UGC-Style Creatives',
  'promo-visuals': 'Promo Visuals',
  'ad-copy-localization': 'Ad Copy & Localization',
  'content-package': 'Creative Content Package',
  other: 'Other',
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function getSubjectLabel(subject: string): string {
  return subjectLabels[subject] || subject || 'New contact message'
}

function buildEmailHtml(input: MessageInput, subjectLabel: string, fullName: string): string {
  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111;max-width:640px">
      <h2 style="margin:0 0 16px">New website message</h2>
      <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
      <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(input.email)}</p>
      <p style="margin:0 0 8px"><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
      <p style="margin:16px 0 8px"><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;padding:14px 16px;border-radius:10px;background:#f5f5f7;border:1px solid #e5e5ea">
        ${escapeHtml(input.message)}
      </div>
    </div>
  `
}

async function sendWithResend(input: MessageInput, subjectLabel: string, fullName: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY_MISSING')
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    replyTo: input.email,
    subject: `Website contact: ${subjectLabel}`,
    html: buildEmailHtml(input, subjectLabel, fullName),
    text: [
      `Name: ${fullName}`,
      `Email: ${input.email}`,
      `Subject: ${subjectLabel}`,
      '',
      input.message,
    ].join('\n'),
  })

  if (error) {
    throw new Error(error.message || 'EMAIL_SEND_FAILED')
  }
}

async function sendWithFormSubmit(
  input: MessageInput,
  subjectLabel: string,
  fullName: string
): Promise<void> {
  const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_TO_EMAIL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: fullName,
      email: input.email,
      subject: subjectLabel,
      message: input.message,
      _replyto: input.email,
      _subject: `Website contact: ${subjectLabel}`,
      _template: 'table',
      _captcha: 'false',
    }),
  })

  if (!response.ok) {
    throw new Error('EMAIL_SEND_FAILED')
  }

  const payload = (await response.json().catch(() => null)) as
    | { success?: string | boolean }
    | null

  if (payload && payload.success === false) {
    throw new Error('EMAIL_SEND_FAILED')
  }
}

export async function sendContactEmail(input: MessageInput): Promise<void> {
  const subjectLabel = getSubjectLabel(input.subject)
  const fullName = [input.firstName, input.lastName].filter(Boolean).join(' ')

  if (process.env.RESEND_API_KEY) {
    await sendWithResend(input, subjectLabel, fullName)
    return
  }

  await sendWithFormSubmit(input, subjectLabel, fullName)
}
