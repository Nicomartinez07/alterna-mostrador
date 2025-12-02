import type {
  StrapiResponse,
  StrapiSingleResponse,
  SiteSettings,
  Product,
  ProductCategory,
  MarketItem,
  ProcessStep,
} from '@/types/strapi';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;


/**
 * Simple fetch function for Strapi API
 */
async function fetchStrapi(endpoint: string): Promise<any> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Strapi error:', response.status, errorText);
      throw new Error(`Strapi error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
}

/**
 * Get site settings with proper locale support
 */
export async function getSiteSettings(locale: string = 'es'): Promise<SiteSettings | null> {
  try {
    // Forzar el locale en la query - forma correcta para Strapi v4
    const data = await fetchStrapi(`/site-setting?populate=*&locale=${locale}`);
    
    // Si encontramos datos para el locale solicitado
    if (data.data) {
      return data.data;
    }
    

    const defaultData = await fetchStrapi(`/site-setting?populate=*`);
    
    if (!defaultData.data) {
      return null;
    }
    
    // Buscar en las localizaciones si existe una para el locale solicitado
    if (defaultData.data.localizations && defaultData.data.localizations.length > 0) {
      const localizedVersion = defaultData.data.localizations.find(
        (loc: any) => loc.locale === locale
      );
      
      if (localizedVersion) {
        return localizedVersion;
      }
    }
    
    return defaultData.data;
    
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

/**
 * Get all products
 */
export async function getProducts(locale: string = 'es'): Promise<Product[]> {
  try {
    const data = await fetchStrapi(`/products?locale=${locale}&populate=*`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Get single product by slug
 */
export async function getProductBySlug(
  slug: string,
  locale: string = 'es'
): Promise<Product | null> {
  try {
    const data = await fetchStrapi(
      `/products?filters[slug][$eq]=${slug}&locale=${locale}&populate=*`
    );
    console.log('Product by slug data:', data);
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

/**
 * Get all product categories
 */
export async function getProductCategories(locale: string = 'es'): Promise<ProductCategory[]> {
  try {
    const data = await fetchStrapi(`/product-categories?locale=${locale}`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Get products by category
 */
export async function getProductsByCategory(
  categoryId: number,
  locale: string = 'es'
): Promise<Product[]> {
  try {
    const data = await fetchStrapi(
      `/products?filters[category][id][$eq]=${categoryId}&locale=${locale}&populate=*`
    );
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

/**
 * Get all market items
 */
export async function getMarketItems(locale: string = 'es'): Promise<MarketItem[]> {
  try {
    const data = await fetchStrapi(`/market-items?locale=${locale}&populate=*`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching market items:', error);
    return [];
  }
}

/**
 * Get all process steps
 */
export async function getProcessSteps(locale: string = 'es'): Promise<ProcessStep[]> {
  try {
    const data = await fetchStrapi(`/process-steps?locale=${locale}&populate=*&sort=step_order:asc`);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching process steps:', error);
    return [];
  }
}

/**
 * Helper to get full image URL from Strapi
 */
export function getStrapiImageUrl(url: string | undefined): string {
  if (!url) return '/images/placeholder.jpg';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Helper to get image alt text
 */
export function getStrapiImageAlt(image: any, fallback: string = 'Image'): string {
  return image?.attributes?.alternativeText || image?.alternativeText || fallback;
}

/**
 * Get random products (excluding current product)
 */
export async function getRandomProducts(
  excludeId: number,
  limit: number = 4,
  locale: string = 'es'
): Promise<Product[]> {
  try {
    const products = await getProducts(locale);
    
    // Filter out current product
    const filtered = products.filter(p => p.id !== excludeId);
    
    // Shuffle array
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    
    // Get first N items
    return shuffled.slice(0, limit);
  } catch (error) {
    console.error('Error fetching random products:', error);
    return [];
  }
}