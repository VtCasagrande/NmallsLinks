export interface ILink {
  _id: string;
  title: string;
  url: string;
  icon?: string;
  image?: string;
  featured?: boolean;
  order?: number;
  category?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ISocialLink {
  _id: string;
  platform: string;
  url: string;
  icon?: string;
  order?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVisit {
  _id: string;
  source: string;
  createdAt: Date;
}

export interface IClick {
  _id: string;
  linkId: string;
  linkTitle?: string;
  createdAt: Date;
}

export interface IStats {
  totalVisits: number;
  totalClicks: number;
  clickRate: number;
  visitsPerSource: Array<{
    source: string;
    count: number;
  }>;
  topLinks: Array<{
    linkId: string;
    title: string;
    count: number;
  }>;
} 