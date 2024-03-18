export type Posts = {
post_id: number;
user_name: string;
post_body: string;
created_at: Date;
tag?: Tags[];
}

export type Tags = {
    tag_body: string;
    tag_id: number;
}