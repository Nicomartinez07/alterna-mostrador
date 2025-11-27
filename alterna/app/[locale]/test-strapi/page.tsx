import {
  getSiteSettings,
  getProducts,
  getProductCategories,
  getMarketItems,
  getProcessSteps,
  getStrapiImageUrl,
} from '@/lib/strapi';

export default async function TestStrapiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Fetch all data
  const [settings, products, categories, marketItems, processSteps] = await Promise.all([
    getSiteSettings(),
    getProducts(locale),
    getProductCategories(locale),
    getMarketItems(locale),
    getProcessSteps(locale),
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Strapi Connection Test
        </h1>

        {/* Site Settings */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Site Settings
          </h2>
          {settings ? (
            <div className="space-y-2 text-gray-700">
              <p><strong>Nombre:</strong> {settings.nombre_local}</p>
              <p><strong>Dirección:</strong> {settings.direccion}</p>
              <p><strong>Teléfono:</strong> {settings.telefono}</p>
              <p><strong>Email:</strong> {settings.email}</p>
              <p><strong>Instagram:</strong> {settings.instagram}</p>
              {settings.tagline && (
                <p><strong>Tagline:</strong> {settings.tagline}</p>
              )}
            </div>
          ) : (
            <p className="text-red-600">No settings found</p>
          )}
        </section>

        {/* Categories */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Categories ({categories.length})
          </h2>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat.id} className="p-3 bg-gray-50 rounded">
                <p className="font-medium">{cat.name}</p>
                <p className="text-sm text-gray-600">
                  Slug: {cat.slug} | Order: {cat.order}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Products ({products.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                {product.photo?.url && (
                  <img
                    src={getStrapiImageUrl(product.photo.url)}
                    alt={product.title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-green-600 mt-2">
                  €{product.price.toFixed(2)}
                </p>
                {product.category && (
                  <p className="text-xs text-gray-500 mt-1">
                    {product.category.name}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Market Items */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Market Items ({marketItems.length})
          </h2>
          <div className="space-y-3">
            {marketItems.map((item) => (
              <div key={item.id} className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">
                  Vendor: {item.vendor_name}
                </p>
                <p className="text-green-600 font-bold">
                  €{item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Process Steps ({processSteps.length})
          </h2>
          <div className="space-y-3">
            {processSteps.map((step) => (
              <div key={step.id} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  {step.step_order}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-600">
                    {typeof step.description === 'string' 
                      ? step.description.substring(0, 100)
                      : 'Process description'}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}