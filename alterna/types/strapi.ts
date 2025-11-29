// Strapi response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// Base attributes for all Strapi entities
export interface StrapiEntity {
  id: number;
  attributes: any;
}

// Media/Image format
export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    url: string;
    previewUrl: string | null;
  };
}

// Site Settings
export interface SiteSettings {
  logo?: {
    data: StrapiImage | null;
  };
  nombre_local: string;
  direccion: string;
  telefono: string;
  whatsapp: string;
  instagram: string;
  email: string;
  horarios: string;
  takeaway_url_glovo?: string;
  takeaway_url_uber?: string;
  google_maps_embed_url?: string;
  hero_image?: {
    data: StrapiImage | null;
  };
  tagline?: string;
}

// Product Category
export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Product
export interface Product {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  ingredients?: string;
  allergens?: string;
  is_on_menu: boolean;
  is_takeaway_available: boolean;
  visible: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  product_category?: ProductCategory;
  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    order: number;
  } | null;
  photo?: {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
  } | null;
}

// Market Item
export interface MarketItem {
  id: number;
  documentId: string;
  title: string;
  price: number;
  vendor_name: string;
  vendor_contact_whatsapp?: string;
  vendor_instagram?: string;
  description?: string;
  available_from?: string;
  available_to?: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  photo?: {
    id: number;
    url: string;
    alternativeText?: string;
    name: string;
  } | null;
}


// Process Step
export interface ProcessStep {
  id: number;
  documentId: string;
  title: string;
  description: any; // Puede ser string o array de bloques rich text
  step_order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  media?: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  } | null;
}