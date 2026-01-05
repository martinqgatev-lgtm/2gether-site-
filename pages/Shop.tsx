import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialBrand = searchParams.get('brand') || 'Всички';
  const initialCategory = searchParams.get('category') || 'Всички';

  const [filterBrand, setFilterBrand] = useState(initialBrand);
  const [filterCategory, setFilterCategory] = useState(initialCategory);

  const brands = ['Всички', 'Orbea', 'Santa Cruz', 'Giant', 'Merch'];
  // Updated categories to match the Product interface in types.ts
  const categories = ['Всички', 'Планински', 'Шосейни', 'Електрически', 'Градски', 'Детски', 'Екипировка'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchBrand = filterBrand === 'Всички' || product.brand === filterBrand || (filterBrand === 'Merch' && product.brand === 'Merch');
      const matchCategory = filterCategory === 'Всички' || product.category === filterCategory;
      return matchBrand && matchCategory;
    });
  }, [filterBrand, filterCategory]);

  return (
    <div className="pt-28 pb-20 container mx-auto px-4 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="text-brand-accent" size={20} />
              <h2 className="text-xl font-bold text-white">Филтри</h2>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Марка</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center transition-colors ${filterBrand === brand ? 'border-brand-accent bg-brand-accent' : 'group-hover:border-neutral-400'}`}>
                      {filterBrand === brand && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <input 
                      type="radio" 
                      name="brand" 
                      className="hidden" 
                      checked={filterBrand === brand} 
                      onChange={() => setFilterBrand(brand)} 
                    />
                    <span className={`text-sm ${filterBrand === brand ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-300'}`}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Категория</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center transition-colors ${filterCategory === cat ? 'border-brand-accent bg-brand-accent' : 'group-hover:border-neutral-400'}`}>
                      {filterCategory === cat && <div className="w-2 h-2 rounded-full bg-black" />}
                    </div>
                    <input 
                      type="radio" 
                      name="category" 
                      className="hidden" 
                      checked={filterCategory === cat} 
                      onChange={() => setFilterCategory(cat)} 
                    />
                    <span className={`text-sm ${filterCategory === cat ? 'text-white font-bold' : 'text-neutral-400 group-hover:text-neutral-300'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-black text-white">{filterBrand === 'Всички' ? 'Всички Продукти' : filterBrand} <span className="text-neutral-600 text-lg font-normal">({filteredProducts.length})</span></h1>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-neutral-500 bg-neutral-900/30 rounded-xl border border-neutral-800">
              <p className="text-lg">Няма намерени продукти по избраните критерии.</p>
              <button 
                onClick={() => { setFilterBrand('Всички'); setFilterCategory('Всички'); }}
                className="mt-4 text-brand-accent hover:underline"
              >
                Изчисти филтрите
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;