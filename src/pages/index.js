import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';
import Recommendations from '../components/Recommendations';
import SideText from '../components/SideText';
import CartIcon from '../components/CartIcon';

export default function Home({ 
  searchQuery, 
  setSearchQuery, 
  onSearch, 
  onLogoClick,
  products,
  isTransitioning
}) {
  const pageVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const logoVariants = {
    initial: { 
      y: -20,
      opacity: 0 
    },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const searchVariants = {
    initial: { 
      y: 30,
      opacity: 0 
    },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const recommendationsVariants = {
    initial: { 
      opacity: 0 
    },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.5
      }
    }
  };

  const productVariants = {
    initial: { 
      y: 20,
      opacity: 0 
    },
    animate: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="text-center p-5 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div 
        className="mb-16"
        variants={logoVariants}
      >
        <h1 className="text-8xl font-bold tracking-wider mb-3 underline">SARAS</h1>
        <p className="text-xl text-gray-600 italic mt-4">Find the Best Skincare in Seconds — Backed by Real Reviews, Not Hype.</p>
      </motion.div>

      <motion.div 
        className="w-full max-w-4xl mx-auto mb-20"
        variants={searchVariants}
      >
        <SearchBar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={onSearch}
          placeholder="Tell us about your ideal product..."
          isTransitioning={isTransitioning}
        />
      </motion.div>

      <motion.div 
        className="w-full mt-20"
        variants={recommendationsVariants}
      >
        <h2 className="text-4xl text-gray-800 mb-8 font-medium">Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {products.slice(0, 3).map((product) => (
            <motion.div 
              key={product.id} 
              className="text-center"
              variants={productVariants}
            >
              <div className="w-full aspect-square bg-gray-100 rounded-lg mb-4"></div>
              <p className="text-base text-gray-800">{product.title}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* <SideText /> */}
      {/* <CartIcon /> */}
    </motion.div>
  );
} 