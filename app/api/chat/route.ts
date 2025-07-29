import { NextRequest, NextResponse } from 'next/server'
import { generateAnswer } from '@/app/lib/openai'
import { getAllManuals } from '@/app/lib/manual-service'
import { saveChatLog } from '@/app/lib/chat-service'


export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json()
    
    // OpenAI APIが設定されているか確認
    if (!process.env.OPENAI_API_KEY) {
      console.log('OpenAI API key not found, using mock response')
      // モック回答を返す
      let answer = 'マニュアルに記載がありません。'
      if (question.includes('挨拶') || question.includes('接客')) {
        answer = 'お客様が来店されたら「いらっしゃいませ」と明るく挨拶をします。'
      } else if (question.includes('注文')) {
        answer = 'ハンディを持って注文を取り、注文内容を復唱して確認します。'
      }
      
      return NextResponse.json({
        answer,
        id: Date.now().toString(),
      })
    }
    
    // 全マニュアルを取得
    const manualStore = await getAllManuals()
    
    // 全マニュアルを結合
    const allManuals = Object.entries(manualStore)
      .map(([category, content]) => `【${category}】\n${content}`)
      .join('\n\n')
    
    // OpenAI APIで回答を生成
    const answer = await generateAnswer(question, allManuals)
    
    // チャットログを保存（エラーが発生しても続行）
    await saveChatLog(question, answer)
    
    return NextResponse.json({
      answer,
      id: Date.now().toString(),
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: '処理中にエラーが発生しました' },
      { status: 500 }
    )
  }
}