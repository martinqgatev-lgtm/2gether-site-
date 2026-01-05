import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  // Select high-ticket featured items
  const featuredProducts = PRODUCTS.filter(p => p.price > 5000).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/1920/1080?random=100" 
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Карането на нашите колела прави живота <span className="text-brand-accent">по-лесен.</span>
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-xl font-light">
              Премиум велосипеди, експертен сервиз и незабравими преживявания. Вашият оторизиран дилър на Orbea, Santa Cruz и Giant във Варна.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors">
                Към Магазина
              </Link>
              <Link to="/service" className="px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-colors backdrop-blur-sm">
                Запази Час
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Navigation */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Main Sales Block */}
          <Link to="/shop" className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
            <div className="absolute inset-0 z-0">
               <img src="https://picsum.photos/800/800?random=101" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Bicycles" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
            </div>
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <h2 className="text-4xl font-bold text-white mb-2">Продажби</h2>
              <p className="text-neutral-300 mb-4">Разгледайте нашата колекция от премиум планински, шосейни и електрически велосипеди.</p>
              <span className="flex items-center text-brand-accent font-bold uppercase text-sm tracking-wider">
                Купи Сега <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-6">
            {/* Service Block */}
            <Link to="/service" className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
              <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/400/400?random=102" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Service" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-1">Сервиз</h2>
                <p className="text-neutral-400 text-sm">Експертна поддръжка.</p>
              </div>
            </Link>

            {/* Rent Block */}
            <Link to="/rent" className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
              <div className="absolute inset-0 z-0">
                <img src="https://picsum.photos/400/400?random=103" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Rent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-1">Велосипеди под наем</h2>
                <p className="text-neutral-400 text-sm">Разгледайте Варна на две колела.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">На Фокус</h2>
              <p className="text-neutral-400">Топ модели и инженерни шедьоври от Santa Cruz & Orbea.</p>
            </div>
            <Link to="/shop" className="text-brand-accent font-bold hover:text-white transition-colors">Виж Всички</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;