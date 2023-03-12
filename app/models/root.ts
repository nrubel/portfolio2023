/** @format */

export interface Featured {
  key: string;
  title: string;
  desc: string;
  link: string;
}

export interface SocialLink {
  link: string;
  title: string;
}

export interface Nav {
  title: string;
  to?: string;
  href?: string;
}

export interface RootLoader {
  title: string;
  description: string;
  keywords: string;
  skills: string;
  url: string;
  image: string;
  featured: Featured[];
  socialLinks: SocialLink[];
  navs: Nav[];
}
