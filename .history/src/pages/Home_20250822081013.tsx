// src/pages/Home.tsx

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Award, Heart, Eye } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';

// =================================================================
// KOREKSI UTAMA: DEFINISI VARIAN YANG BENAR
// Setiap set animasi (seperti fadeInUp) harus menjadi objeknya sendiri
// yang sesuai dengan tipe `Variants`.
// =================================================================

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
};

const featureCardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  hover: {
    y: -8,
    boxShadow: "0px 20px 30px -10px rgba(106, 64, 104, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  }
};

const textRevealVariants: Variants = {
  hidden: { y: "100%" },
  visible: { y: "0%", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

type MasonryItem = 
  | { type: 'quote'; id: string; text: string; author: string; product?: never; image?: never; title?: never; }
  | { type: 'product'; id: string; product: any; text?: never; author?: never; image?: never; title?: never; }
  | { type: 'model'; id: string; image: string; title: string; text?: never; author?: never; product?: never; };

// Komponen Pembungkus untuk Animasi Scroll yang BERULANG
const SectionWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={fadeInUpVariants} // Menggunakan satu set varian yang konsisten
      transition={{ staggerChildren: 0.1 }}
      className={`${className} dark:bg-dark-background`}
    >
      {children}
    </motion.section>
  );
};

// --- KARTU-KARTU (TIDAK ADA PERUBAHAN) ---
const QuoteCard = ({ text, author }: { text: string; author: string }) => (<div className="group relative overflow-hidden rounded-2xl bg-brand-bg-light dark:bg-dark-card p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full"><div className="absolute inset-0 bg-gradient-to-br from-brand-pink/10 to-brand-purple-light/10 dark:from-dark-secondary/10 dark:to-dark-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" /><div className="relative z-10 h-full flex flex-col justify-center"><Sparkles size={24} className="text-brand-pink dark:text-dark-secondary mb-4 group-hover:scale-105 transition-transform duration-300" /><blockquote className="text-lg md:text-xl font-serif font-medium text-brand-text dark:text-dark-text mb-3 leading-relaxed">"{text}"</blockquote><cite className="text-sm text-brand-purple-dark dark:text-dark-primary font-medium">— {author}</cite></div></div>);
const ModelCard = ({ image, title }: { image: string; title: string }) => (<div className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"><img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"><h3 className="text-lg font-semibold mb-2">{title}</h3><div className="flex space-x-3"><button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors">Get The Look</button><button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"><Heart size={16} /></button></div></div></div>);
const ProductMasonryCard = ({ product }: { product: any }) => (<div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-dark-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"><div className="relative overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/><div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" /><div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><button className="p-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-card transition-colors"><Heart size={16} className="text-gray-700 dark:text-dark-text" /></button><Link to={`/product/${product.id}`} className="p-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-dark-card transition-colors"><Eye size={16} className="text-gray-700 dark:text-dark-text" /></Link></div><div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"><Link to={`/product/${product.id}`} className="w-full bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-black dark:text-dark-text py-2 px-4 rounded-full text-sm font-medium text-center block hover:bg-white dark:hover:bg-dark-card transition-colors">Try It On</Link></div></div><div className="p-4"><p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">{product.category}</p><h3 className="text-sm font-medium text-brand-text dark:text-dark-text mb-1 line-clamp-2">{product.name}</h3><p className="text-lg font-semibold text-brand-purple-dark dark:text-dark-primary">${product.price}</p></div></div>);

// ===== HERO SECTION (TIDAK ADA PERUBAHAN) =====
const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    
  const leftImageX = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const rightImageX = useTransform(scrollYProgress, [0, 1], ["0%", "85%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const arveText = "ARVE".split("");

  return (
  <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
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
        <div className="absolute inset-0 bg-black/60 md:bg-radial-gradient md:from-transparent md:via-black/20 md:to-black/80" />
      </div>

            <style>{`
                .arve-shimmer {
                  position: relative;
                  display: inline-block;
                  background: linear-gradient(90deg, #e9d6f7 0%, #cbb4e6 40%, #f8f8ff 50%, #cbb4e6 60%, #e9d6f7 100%);
                  background-size: 250% 100%;
                  background-clip: text;
                  -webkit-background-clip: text;
                  color: transparent;
                  animation: shimmer-move 4s infinite linear;
                  filter: brightness(1.08) contrast(1.05);
                }
                @keyframes shimmer-move {
                  0% { background-position: 250% 0; }
                  100% { background-position: -250% 0; }
                }
                .arve-sub-shimmer {
                  position: relative;
                  display: inline-block;
                  background: linear-gradient(90deg, #f8f8ff 0%, #e9d6f7 40%, #cbb4e6 60%, #f8f8ff 100%);
                  background-size: 350% 100%;
                  background-clip: text;
                  -webkit-background-clip: text;
                  color: transparent;
                  animation: shimmer-move-sub 6s infinite linear;
                  filter: brightness(1.04) contrast(1.03);
                }
                @keyframes shimmer-move-sub {
                  0% { background-position: 350% 0; }
                  100% { background-position: -350% 0; }
                }
            `}</style>

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        <div className="max-w-xl w-full text-center">
          <motion.h1 
            className="font-serif text-6xl sm:text-7xl md:text-8xl font-bold leading-none mb-4 drop-shadow-2xl select-none"
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={{
              visible: { transition: { staggerChildren: 0.13 } },
              hover: { transition: { staggerChildren: 0.05 } }
            }}
          >
            {arveText.map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                  hover: { y: -7, scale: 1.07, transition: { type: "spring", stiffness: 200, damping: 18 } }
                }}
                className="arve-shimmer"
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>
          <p className="font-sans text-base md:text-lg mb-8 max-w-md mx-auto drop-shadow-lg">
            <span className="arve-sub-shimmer">
              Heritage & Innovation in every curated piece. Your personal style journey begins here.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
            <Link 
              to="/catalog" 
              className="hero-btn flex-1 min-w-[180px] flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-brand-purple-dark dark:bg-dark-primary dark:text-dark-background rounded-full overflow-hidden transition-all duration-300 hover:bg-brand-text dark:hover:bg-dark-secondary shadow-lg transform hover:scale-105 text-center"
            >
              <span className="group-hover:tracking-wider transition-all duration-300">Shop Collection</span>
            </Link>
            <Link 
              to="/consultant" 
              className="hero-btn flex-1 min-w-[180px] flex items-center justify-center px-6 py-3 text-sm font-bold text-white bg-transparent border-2 border-white/60 rounded-full transition-all duration-300 hover:bg-white hover:text-brand-purple-dark dark:hover:bg-dark-primary dark:hover:text-dark-background dark:hover:border-dark-primary focus:outline-none focus:ring-2 focus:ring-white/60 dark:focus:ring-dark-primary/60 transform hover:scale-105 text-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-2m10-12H7a2 2 0 00-2 2v8a2 2 0 002 2h2l4 4V4a2 2 0 00-2-2z" /></svg>
              <span>Chat with AI Consultant</span>
            </Link>
          </div>
                </div>
            </motion.div>
        </section>
    );
};

const MobileProductCarousel = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={scrollRef} className="md:hidden overflow-x-auto pb-8 snap-x snap-mandatory">
            <div className="flex space-x-4 px-4" style={{ width: 'max-content' }}>
                {mockProducts.slice(0, 6).map((product, index) => {
                    return (
                        <motion.div 
                            key={product.id} 
                            className="w-64 flex-shrink-0 snap-center"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ root: scrollRef, once: false }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

const Home = () => {
  const masonryContent: MasonryItem[] = [
    { type: 'product', id: 'p1', product: mockProducts[4] },
    { type: 'model', id: 'm1', image: 'https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Street Style Ready' },
    { type: 'quote', id: 'q1', text: "Fashion is the armor to survive the reality of everyday life.", author: "Bill Cunningham" },
    { type: 'product', id: 'p2', product: mockProducts[5] },
    { type: 'model', id: 'm2', image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Elegant Evening Look' },
    { type: 'product', id: 'p3', product: mockProducts[6] },
    { type: 'quote', id: 'q2', text: "Style is a way to say who you are without having to speak.", author: "Rachel Zoe" },
    { type: 'model', id: 'm3', image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=800', title: 'Dapper & Classic' },
    { type: 'product', id: 'p4', product: mockProducts[7] },
  ];

  return (
    <div className="bg-white dark:bg-dark-background">
      <HeroSection />
      <main>
        <motion.section
            initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }}
            variants={scaleInVariants} transition={{ staggerChildren: 0.1 }}
            className="py-20 dark:bg-dark-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeInUpVariants} className="text-center mb-16"><h2 className="text-4xl font-serif font-bold text-brand-text dark:text-dark-text mb-4">Style Inspiration</h2><p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Discover your next favorite piece through our curated collection of fashion moments</p></motion.div>
            <motion.div className="masonry-container" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
              {masonryContent.map((item) => (
                <motion.div key={item.id} className="masonry-item mb-6" variants={scaleInVariants} >
                  {item.type === 'quote' && <QuoteCard text={item.text} author={item.author} />}
                  {item.type === 'model' && <ModelCard image={item.image} title={item.title} />}
                  {item.type === 'product' && <ProductMasonryCard product={item.product} />}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
        
        <SectionWrapper className="py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto">
              <motion.div variants={fadeInUpVariants} className="flex flex-col sm:flex-row justify-between sm:items-center mb-12 text-center sm:text-left px-4 sm:px-6 lg:px-8">
                  <div><h2 className="text-3xl font-serif font-bold text-brand-text dark:text-dark-text mb-2">Best Sellers</h2><p className="text-gray-600 dark:text-gray-300">Our most loved pieces this season</p></div>
                  <Link to="/catalog" className="btn-secondary hidden md:inline-flex items-center mt-4 sm:mt-0">View All <ArrowRight size={18} className="ml-2" /></Link>
              </motion.div>
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
              {mockProducts.slice(0, 4).map((product) => (
                <motion.div key={product.id} variants={fadeInUpVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
            <MobileProductCarousel />
            <div className="text-center mt-8 md:hidden px-4"><Link to="/catalog" className="btn-secondary inline-flex items-center">View All Products <ArrowRight size={18} className="ml-2" /></Link></div>
          </div>
        </SectionWrapper>
        
        <SectionWrapper className="py-20">
          <motion.div variants={fadeInUpVariants} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16"><h2 className="text-4xl font-serif font-bold text-brand-text dark:text-dark-text mb-4">Why Choose ARVE?</h2><p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">Experience fashion like never before with our personalized approach to style</p></div>
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-12" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {[ { icon: Sparkles, title: "ARVE Style Consultant", text: "Get personalized outfit recommendations and styling advice." }, { icon: Users, title: "Curated Collections", text: "Carefully selected pieces from top designers and emerging brands." }, { icon: Award, title: "Premium Quality", text: "Every piece meets the highest standards of quality and craftsmanship." }].map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div 
                    key={feature.title} 
                    className="text-center group p-6 rounded-2xl" 
                    variants={featureCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                  >
                    <div className="w-16 h-16 bg-brand-pink/10 dark:bg-dark-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                        <Icon size={28} className="text-brand-purple-dark dark:text-dark-primary" />
                    </div>
                    <h3 className="text-2xl font-serif font-semibold text-brand-text dark:text-dark-text mb-4">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </SectionWrapper>
        
        <section className="py-24 bg-brand-purple-dark dark:bg-dark-card text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-text via-brand-purple-dark to-brand-pink opacity-80 dark:from-dark-primary dark:via-dark-card dark:to-dark-secondary animate-gradient-flow bg-200%"></div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              transition={{ staggerChildren: 0.2 }}
              className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
            >
              <div className='overflow-hidden mb-6'>
                <motion.h2 variants={textRevealVariants} className="text-4xl md:text-5xl font-serif font-bold">
                    Ready to Transform Your Style?
                </motion.h2>
              </div>
              <div className='overflow-hidden mb-12'>
                <motion.p variants={textRevealVariants} className="text-xl text-white/80 max-w-2xl mx-auto">
                    Take our style quiz and let our AI consultant create a personalized fashion journey for you.
                </motion.p>
              </div>
            <motion.div 
                variants={fadeInUpVariants}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
                <Link to="/quiz" className="btn-accent inline-flex items-center w-full sm:w-auto justify-center"><Sparkles size={18} className="mr-2" /> Start Style Quiz</Link>
                <Link to="/consultant" className="btn-secondary border-white text-white hover:bg-white hover:text-brand-purple-dark inline-flex items-center w-full sm:w-auto justify-center">Chat with AI Consultant <ArrowRight size={18} className="ml-2" /></Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Home;