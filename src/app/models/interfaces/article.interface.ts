export interface IAuthorSocials {
  bluesky: string;
  instagram: string;
  linkedin: string;
  mastodon: string;
  x: string;
  youtube: string;
}

export interface IAuthor {
  name: string;
  socials: IAuthorSocials;
}

export interface ILaunch {
  launch_id: string;
  provider: string;
}

export interface IEvent {
  event_id: number;
  provider: string;
}

export interface IArticle {
  id: number;
  title: string;
  summary: string;
  image_url: string;
  url: string;
  news_site: string;
  featured: boolean;
  published_at: Date;
  updated_at: Date;
  authors: IAuthor[];
  events: IEvent[];
  launches: ILaunch[];
}
