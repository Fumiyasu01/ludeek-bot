import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateAnswer(question: string, manualContent: string) {
  try {
    const systemPrompt = `あなたは飲食店のマニュアルに基づいて回答するアシスタントです。
以下のマニュアルの内容に基づいて、スタッフの質問に答えてください。
マニュアルに記載がない内容については、「マニュアルに記載がありません」と回答してください。

マニュアル内容：
${manualContent}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // 高速・低コスト・高精度のバランス
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: question }
      ],
      temperature: 0.3,
    })

    return completion.choices[0].message.content || 'エラーが発生しました。'
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error('回答の生成に失敗しました')
  }
}