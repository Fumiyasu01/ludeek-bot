import { supabase } from './supabase'

// Supabaseが設定されているかチェック
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export async function saveChatLog(question: string, answer: string) {
  if (!isSupabaseConfigured() || !supabase) {
    // Supabaseが未設定の場合は何もしない
    return { success: true }
  }

  try {
    const { error } = await supabase
      .from('chat_logs')
      .insert({
        question,
        answer,
        created_at: new Date().toISOString()
      })

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error saving chat log:', error)
    // エラーが発生してもチャット自体は継続
    return { success: false }
  }
}