export type IComment = {
content: string
createdAt: Date
id: string
tag?: string
}

export type ICommentAdd = {
content: string
tag: string
}