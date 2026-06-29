export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  source: string;
  tags?: string[];
  status: "active" | "unsubscribed" | "bounced";
  convertkit_id?: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

export interface Tool {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  status: "live" | "beta" | "coming-soon";
  tags: string[];
  href: string;
  icon: string;
  image_url?: string;
  featured?: boolean;
  created_at?: string;
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  currency: string;
  image_url?: string;
  purchase_url?: string;
  category?: string;
  featured: boolean;
  status: string;
  created_at: string;
  tags?: string[];
  rating?: number;
  badge?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image_url?: string;
  category?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
}

export interface AffiliateLink {
  id: string;
  name: string;
  description?: string;
  url: string;
  category?: string;
  logo_url?: string;
  image_url?: string;
  recommendation?: string;
  featured: boolean;
  created_at: string;
  discount?: string;
}

export interface SubscribeFormData {
  email: string;
  name?: string;
  source?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}
