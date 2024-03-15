export type IComment = {
content: string
createdAt: Date
id: string
tag?: ITag[]
}

export type ITag = {
    tagtext: string
    tagid: string
}