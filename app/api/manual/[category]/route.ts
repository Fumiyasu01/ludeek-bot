import { NextRequest, NextResponse } from 'next/server'
import { getManual, updateManual } from '@/app/lib/manual-service'

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = decodeURIComponent(params.category)
  
  try {
    const manual = await getManual(category)
    return NextResponse.json(manual)
  } catch (error) {
    console.error('GET manual error:', error)
    return NextResponse.json(
      { error: 'マニュアルの取得に失敗しました' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    const category = decodeURIComponent(params.category)
    const { content } = await request.json()
    
    const result = await updateManual(category, content)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('PUT manual error:', error)
    return NextResponse.json(
      { error: '保存に失敗しました' },
      { status: 500 }
    )
  }
}