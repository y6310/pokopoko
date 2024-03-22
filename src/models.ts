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

export type SoudanjohoType = {
    organization_id: number;
    organization_name: string;
    organization_body: string;
    link:string;
    tag?: Tags[];
};

export type GetSoudanData ={
    Id: number;
    OrganizationName: string;
    OrganizationBody: string;
    Link: string; // Date型などに変換する必要がある場合はここで変更する
    Tags: GetTags[];
  }

export type GetPostData = {
    Id: number;
    UserName: string;
    PostBody: string;
    CreatedAt: string; // Date型などに変換する必要がある場合はここで変更する
    Tags: GetTags[]; // Tag型の配列
  };

  export type GetTags  = {
    Id: number;
    TagBody: string;
  };