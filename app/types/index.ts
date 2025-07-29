export type Category = '接客' | '調理' | '清掃' | 'その他'

export type Message = {
  id: string
  question: string
  answer: string
}

export type Manual = {
  category: Category
  content: string
  updated_at: string
}