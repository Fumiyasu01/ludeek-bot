import { supabase } from './supabase'
import { manualStore } from './manual-store'

// Supabaseが設定されているかチェック
const isSupabaseConfigured = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export async function getManual(category: string) {
  if (!isSupabaseConfigured() || !supabase) {
    // Supabaseが未設定の場合はメモリストアから取得
    return {
      category,
      content: manualStore[category] || '',
      updated_at: new Date().toISOString()
    }
  }

  try {
    const { data, error } = await supabase
      .from('manuals')
      .select('*')
      .eq('category', category)
      .single()

    if (error) {
      // レコードが存在しない場合は初期データを返す
      if (error.code === 'PGRST116') {
        return {
          category,
          content: manualStore[category] || '',
          updated_at: new Date().toISOString()
        }
      }
      throw error
    }

    return data
  } catch (error) {
    console.error('Error fetching manual:', error)
    // エラー時はメモリストアから取得
    return {
      category,
      content: manualStore[category] || '',
      updated_at: new Date().toISOString()
    }
  }
}

export async function updateManual(category: string, content: string) {
  if (!isSupabaseConfigured() || !supabase) {
    // Supabaseが未設定の場合はメモリストアに保存
    manualStore[category] = content
    return {
      success: true,
      updated_at: new Date().toISOString()
    }
  }

  try {
    // まず既存のレコードを確認
    const { data: existing } = await supabase
      .from('manuals')
      .select('id')
      .eq('category', category)
      .single()

    if (existing) {
      // 更新
      const { error } = await supabase
        .from('manuals')
        .update({
          content,
          updated_at: new Date().toISOString()
        })
        .eq('category', category)

      if (error) throw error
    } else {
      // 新規作成
      const { error } = await supabase
        .from('manuals')
        .insert({
          category,
          content,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    }

    // メモリストアも更新
    manualStore[category] = content

    return {
      success: true,
      updated_at: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error updating manual:', error)
    // エラー時でもメモリストアは更新
    manualStore[category] = content
    return {
      success: true,
      updated_at: new Date().toISOString()
    }
  }
}

export async function getAllManuals() {
  if (!isSupabaseConfigured() || !supabase) {
    return manualStore
  }

  try {
    const { data, error } = await supabase
      .from('manuals')
      .select('category, content')

    if (error) throw error

    // データベースの内容をオブジェクトに変換
    const manuals: Record<string, string> = {}
    data.forEach(item => {
      manuals[item.category] = item.content
    })

    // メモリストアにない項目があれば追加
    Object.keys(manualStore).forEach(category => {
      if (!manuals[category]) {
        manuals[category] = manualStore[category]
      }
    })

    return manuals
  } catch (error) {
    console.error('Error fetching all manuals:', error)
    return manualStore
  }
}