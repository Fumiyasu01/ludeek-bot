import { NextRequest, NextResponse } from 'next/server'
import { generateAnswer } from '@/app/lib/openai'
import { getAllManuals } from '@/app/lib/manual-service'
import { saveChatLog } from '@/app/lib/chat-service'

// マニュアルストアは manual-store.ts から取得
// const manualStore: Record<string, string> = {
  接客: `# 接客マニュアル

## 基本的な接客
1. お客様が来店されたら「いらっしゃいませ」と明るく挨拶
2. 席にご案内する際は、お客様の人数を確認
3. メニューをお渡しし、お決まりになったらお声掛けくださいと伝える

## 注文の取り方
1. ハンディを持って注文を取る
2. 注文内容を復唱して確認
3. アレルギーの有無を確認

## 会計
1. レジでの会計時は金額を声に出して確認
2. お釣りは両手で丁寧にお渡しする`,
  調理: `# 調理マニュアル

## 衛生管理
1. 調理前は必ず手洗い・消毒
2. 食材は先入れ先出しを徹底
3. まな板は食材ごとに使い分ける

## 調理手順
1. オーダーが入ったら調理開始
2. レシピ通りの分量を守る
3. 盛り付けは見本写真を参考に`,
  清掃: `# 清掃マニュアル

## 開店前清掃
1. 床の掃き掃除とモップがけ
2. テーブル・椅子の拭き上げ
3. トイレの清掃と備品補充

## 営業中の清掃
1. お客様が退店したらすぐにテーブルを片付ける
2. こぼれた物はすぐに清掃`,
//   その他: `...`
// }

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