// src/pages/Home.tsx

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Award, Heart, Eye } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

// ===== VARIAN ANIMASI BARU YANG LEBIH BERAGAM =====
const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  },
};

// Komponen Pembungkus untuk Animasi Scroll yang BERULANG
const SectionWrapper = ({ children, className = '', animation = "fadeInUp" }: { children: React.ReactNode; className?: string, animation?: keyof typeof variants }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={variants[animation]}
      transition={{ staggerChildren: 0.1 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

// --- KARTU-KARTU (TIDAK ADA PERUBAHAN) ---
const QuoteCard = ({ text, author }: { text: string; author: string }) => (<div className="group relative overflow-hidden rounded-2xl bg-brand-bg-light p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full"><div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 to-brand-purple-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10 h-full flex flex-col justify-center"><Sparkles size={24} className="text-brand-pink mb-4 group-hover:scale-105 transition-transform duration-300" /><blockquote className="text-lg md:text-xl font-serif font-medium text-brand-text mb-3 leading-relaxed">"{text}"</blockquote><cite className="text-sm text-brand-purple-dark font-medium">— {author}</cite></div></div>);
const ModelCard = ({ image, title }: { image: string; title: string }) => (<div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"><img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"><h3 className="text-lg font-semibold mb-2">{title}</h3><div className="flex space-x-3"><button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">Get The Look</button><button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"><Heart size={16} /></button></div></div></div>);
const ProductMasonryCard = ({ product }: { product: any }) => (<div className="group relative overflow-hidden rounded-2xl bg-white cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"><div className="relative overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/><div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" /><div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"><Heart size={16} className="text-gray-700" /></button><Link to={`/product/${product.id}`} className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"><Eye size={16} className="text-gray-700" /></Link></div><div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><Link to={`/product/${product.id}`} className="w-full bg-white/90 backdrop-blur-sm text-black py-2 px-4 rounded-full text-sm font-medium text-center block hover:bg-white transition-colors">Try It On</Link></div></div><div className="p-4"><p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{product.category}</p><h3 className="text-sm font-medium text-brand-text mb-1 line-clamp-2">{product.name}</h3><p className="text-lg font-semibold text-brand-purple-dark">${product.price}</p></div></div>);

// ===== HERO SECTION FINAL: "VIGNETTE & DARK MODE" CONCEPT =====
const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ 
        target: ref, 
        offset: ["start start", "end start"]
    });
    
    // Animasi yang 100% terikat sama scroll, super smooth
    const leftImageX = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const rightImageX = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
            {/* GAMBAR-GAMBAR MODEL DI LAPISAN BELAKANG */}
            <div className="absolute inset-0 z-0">
                <motion.div 
                    className="absolute top-0 left-0 h-full w-1/2 hidden md:block"
                    style={{ x: leftImageX }}
                >
                    <img src="https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Model 1" className="w-full h-full object-cover object-right" />
                </motion.div>
                <motion.div 
                    className="absolute top-0 right-0 h-full w-1/2 hidden md:block"
                    style={{ x: rightImageX }}
                >
                     <img src="https://images.pexels.com/photos/2043590/pexels-photo-2043590.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Model 2" className="w-full h-full object-cover object-left" />
                </motion.div>
                <div className="md:hidden absolute inset-0">
                     <img src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Model" className="w-full h-full object-cover" />
                </div>
                
                {/* OVERLAY GRADASI GELAP (VIGNETTE) UNTUK HIGHLIGHT TEKS */}
                <div className="absolute inset-0 bg-black/60 md:bg-radial-gradient md:from-transparent md:via-black/20 md:to-black/80" />
            </div>

            {/* KONTEN TENGAH */}
            <motion.div 
                className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4"
                style={{ opacity: contentOpacity, scale: contentScale }}
            >
                <div className="max-w-xl w-full text-center">
                    <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl text-white font-bold leading-none mb-4 drop-shadow-2xl">
                        ARVE Style
                    </h1>
                    <p className="font-sans text-base md:text-lg text-white/90 mb-8 max-w-md mx-auto drop-shadow-lg">
                      Heritage & Innovation in every curated piece. Your personal style journey begins here.
                    </p>
                    
                    {/* ===== TOMBOL DENGAN DESAIN UNIK & ESTETIK ===== */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/catalog" className="group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-brand-purple-dark rounded-full overflow-hidden transition-all duration-300 hover:bg-brand-text shadow-lg transform hover:scale-105">
                            <span className="group-hover:tracking-wider transition-all duration-300">Shop Collection</span>
                        </Link>
                        <Link to="/quiz" className="relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 text-sm font-bold text-white bg-transparent border-2 border-white/50 rounded-full transition-colors duration-300 hover:bg-white hover:text-brand-purple-dark hover:border-white transform hover:scale-105">
                            <Sparkles size={16} className="mr-2" /> 
                            <span>Take Style Quiz</span>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};


const Home = () => {
    const masonryContent = [
        { type: 'quote', id: 'quote-1', text: "Style isn't just what you wear — it's who you are.", author: "Fashion Philosophy" },
        { type: 'product', id: 'product-1', product: mockProducts[0] },
        { type: 'model', id: 'model-1', image: 'https://images.pexels.com/photos/1721558/pexels-photo-1721558.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Style Inspiration'},
        { type: 'model', id: 'model-2', image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Elegant Evening Look'},
        { type: 'product', id: 'product-3', product: mockProducts[2] },
        { type: 'quote', id: 'quote-2', text: "Fashion fades, but style is eternal.", author: "Yves Saint Laurent"},
        { type: 'product', id: 'product-5', product: mockProducts[4] },
        { type: 'model', id: 'model-3', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Casual Chic'},
        { type: 'product', id: 'product-4', product: mockProducts[5] },
        { type: 'model', id: 'model-4', image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Business Elegance'},
        { type: 'quote', id: 'quote-3', text: "Dress like you're already famous.", author: "Fashion Mantra"},
        { type: 'product', id: 'product-2', product: mockProducts[1] },
      ];
    return (
      <div className="min-h-screen bg-brand-bg-light">
        <HeroSection />
  
        <SectionWrapper className="py-20 bg-white" animation="scaleIn">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={variants.fadeInUp} className="text-center mb-16"><h2 className="text-4xl font-serif font-bold text-brand-text mb-4">Style Inspiration</h2><p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover your next favorite piece through our curated collection of fashion moments</p></motion.div>
            <motion.div className="masonry-container" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
              {masonryContent.map((item) => (
                <motion.div key={item.id} className="masonry-item mb-6" variants={variants.scaleIn} >
                  {item.type === 'quote' && <QuoteCard text={item.text} author={item.author} />}
                  {item.type === 'model' && <ModelCard image={item.image} title={item.title} />}
                  {item.type === 'product' && <ProductMasonryCard product={item.product} />}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>
        
        <SectionWrapper className="py-20 bg-brand-bg-light" animation="fadeInUp">
          <div className="max-w-7xl mx-auto">
              <motion.div variants={variants.fadeInUp} className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 text-center sm:text-left px-4 sm:px-6 lg:px-8">
                  <div><h2 className="text-3xl font-serif font-bold text-brand-text mb-2">Best Sellers</h2><p className="text-gray-600">Our most loved pieces this season</p></div>
                  <Link to="/catalog" className="btn-secondary hidden md:inline-flex items-center mt-4 sm:mt-0">View All <ArrowRight size={18} className="ml-2" /></Link>
              </motion.div>
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
              {mockProducts.slice(0, 4).map((product, index) => (
                <motion.div key={product.id} variants={variants.fadeInUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            <div className="md:hidden overflow-x-auto pb-4">
                <div className="flex space-x-4 pl-4" style={{ width: 'max-content' }}>
                    {mockProducts.slice(0, 6).map((product, index) => (
                        <motion.div key={product.id} className="w-64 flex-shrink-0" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: index * 0.1}}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="text-center mt-8 md:hidden px-4"><Link to="/catalog" className="btn-secondary inline-flex items-center">View All Products <ArrowRight size={18} className="ml-2" /></Link></div>
          </div>
        </SectionWrapper>
        
        <SectionWrapper className="py-20 bg-white">
          <motion.div variants={variants.fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-serif font-bold text-brand-text mb-4">Why Choose ARVE?</h2><p className="text-xl text-gray-600 max-w-2xl mx-auto">Experience fashion like never before with our personalized approach to style</p></div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {[ { icon: Sparkles, title: "AI Style Consultant", text: "Get personalized outfit recommendations and styling advice." }, { icon: Users, title: "Curated Collections", text: "Carefully selected pieces from top designers and emerging brands." }, { icon: Award, title: "Premium Quality", text: "Every piece meets the highest standards of quality and craftsmanship." }].map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div key={feature.title} className="text-center group" variants={variants.fadeInUp}>
                    <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 300 }} className="w-16 h-16 bg-brand-pink/10 rounded-full flex items-center justify-center mx-auto mb-6"><Icon size={28} className="text-brand-purple-dark" /></motion.div>
                    <h3 className="text-2xl font-serif font-semibold text-brand-text mb-4">{feature.title}</h3><p className="text-gray-600 leading-relaxed">{feature.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </SectionWrapper>
        
        <SectionWrapper className="py-20 bg-brand-purple-dark text-white">
          <motion.div variants={variants.fadeInUp} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready to Transform Your Style?</h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">Take our style quiz and let our AI consultant create a personalized fashion journey for you.</p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link to="/quiz" className="btn-accent inline-flex items-center w-full sm:w-auto justify-center"><Sparkles size={18} className="mr-2" /> Start Style Quiz</Link>
                <Link to="/consultant" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-purple-dark inline-flex items-center w-full sm:w-auto justify-center">Chat with AI Consultant <ArrowRight size={18} className="ml-2" /></Link>
            </div>
          </motion.div>
        </SectionWrapper>
      </div>
    );
};
  
export default Home;