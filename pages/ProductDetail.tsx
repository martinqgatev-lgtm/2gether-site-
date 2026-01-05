import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';
import { useCartStore, useWishlistStore } from '../lib/store';
import { Heart, Truck, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => product ? state.isInWishlist(product.id) : false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setActiveImage(product.images[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center container mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Продуктът не е намерен</h1>
        <Link to="/shop" className="text-brand-accent hover:underline">Обратно към магазина</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    // Quantity logic would typically need store update to handle adding multiple at once, 
    // but for simplicity we rely on adding item once, or loop.
    // Given the store design, it adds 1. To match UI "Qty" selector, we'd loop or update store API.
    // For this implementation, we assume adding 1 unit of the selected configuration.
    // To support adding 'quantity' amount, store needs 'addMultipleToCart' or similar.
    // For now, we will just add 1 and users can adjust in cart.
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-20">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8 text-sm text-neutral-500">
        <Link to="/" className="hover:text-white transition-colors">Начало</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-white transition-colors">Магазин</Link>
        <span className="mx-2">/</span>
        <span className="text-brand-accent font-bold">{product.name}</span>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 relative group">
               <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
               {product.isSale && (
                 <div className="absolute top-4 left-4 bg-red-600 text-white font-bold text-xs px-3 py-1.5 rounded">
                   SALE
                 </div>
               )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-24 h-24 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeImage === img ? 'border-brand-accent opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-brand-accent font-bold uppercase tracking-wider text-sm mb-2">{product.brand}</h2>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{product.name}</h1>
              </div>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className="p-3 bg-neutral-900 rounded-full text-neutral-400 hover:text-red-500 transition-colors border border-neutral-800"
              >
                <Heart fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : ""} />
              </button>
            </div>

            <div className="flex items-end gap-4 mb-8 border-b border-neutral-800 pb-8">
              <span className="text-4xl font-mono font-bold text-white">
                {product.price.toLocaleString('bg-BG')} лв.
              </span>
              {product.originalPrice && (
                <span className="text-xl text-neutral-500 line-through mb-1">
                  {product.originalPrice.toLocaleString('bg-BG')} лв.
                </span>
              )}
            </div>

            {/* Description */}
            <div 
              className="prose prose-invert prose-sm text-neutral-400 mb-8"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />

            {/* Selectors */}
            <div className="space-y-6 mb-8">
              <div>
                <span className="block text-sm font-bold text-white uppercase mb-3">Размер</span>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] px-4 py-3 rounded-lg border font-bold text-sm transition-all ${
                        selectedSize === size 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-transform active:scale-[0.98] ${
                  product.inStock 
                  ? 'bg-white text-black hover:bg-brand-accent' 
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Добави в количка' : 'Изчерпан'}
              </button>
            </div>

            {/* Value Props */}
            <div className="grid grid-cols-2 gap-4 text-sm text-neutral-400 mb-12">
              <div className="flex items-center gap-3">
                <Truck className="text-brand-accent" />
                <span>Безплатна доставка над 50лв</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-brand-accent" />
                <span>2 години гаранция</span>
              </div>
            </div>

            {/* Specs Table */}
            <div>
               <h3 className="text-xl font-bold text-white mb-6 border-l-4 border-brand-accent pl-4">Характеристики</h3>
               <div className="bg-neutral-900/50 rounded-xl border border-neutral-800 overflow-hidden">
                 <table className="w-full text-left text-sm">
                   <tbody className="divide-y divide-neutral-800">
                     {Object.entries(product.specs).map(([key, value]) => (
                       <tr key={key} className="hover:bg-neutral-800/30">
                         <td className="p-4 text-neutral-500 font-medium capitalize w-1/3">{key}</td>
                         <td className="p-4 text-white font-mono">{value}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-neutral-800 pt-16">
            <h2 className="text-3xl font-black text-white mb-12">Може да харесате още</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;