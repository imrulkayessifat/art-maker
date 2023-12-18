import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('image') as unknown as File
  if (!file) {
    return NextResponse.json({ success: false })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  const path = `${process.cwd()}/public/${file.name}`;
  await writeFile(path, buffer)

  return NextResponse.json({ success: true })
}