import { gsap } from 'gsap';

// Animation to expand the search bar
export const expandSearchBar = (element, targetHeight) => {
  if (!element) return;
  
  return gsap.to(element, {
    height: targetHeight,
    duration: 0.5,
    ease: 'power2.inOut',
  });
};

// Animation for products to fade in with stagger
export const fadeInProducts = (elements, delay = 0.3) => {
  if (!elements || elements.length === 0) return;
  
  return gsap.fromTo(
    elements,
    { 
      opacity: 0, 
      y: 20, 
      scale: 0.9 
    },
    { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      duration: 0.4, 
      stagger: 0.1, 
      delay,
      ease: 'power2.out' 
    }
  );
};

// Animation for page transitions
export const pageTransition = (element, direction = 'in') => {
  if (!element) return;
  
  if (direction === 'in') {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.inOut' }
    );
  } else {
    return gsap.to(
      element,
      { opacity: 0, duration: 0.3, ease: 'power2.inOut' }
    );
  }
};

// Animation for the search bar scale effect
export const pulseSearchBar = (element) => {
  if (!element) return;
  
  const tl = gsap.timeline();
  
  tl.to(element, {
    scale: 1.02,
    duration: 0.2,
    ease: 'power2.out'
  }).to(element, {
    scale: 1,
    duration: 0.1,
    ease: 'power2.in'
  });
  
  return tl;
};

// Animation sequence for search to product page transition
export const searchToProductTransition = (searchElement, productsContainer, products) => {
  if (!searchElement || !productsContainer) return;
  
  const tl = gsap.timeline();
  
  // Position the products container directly below the search bar with no gap
  gsap.set(productsContainer, {
    y: 0,
    marginTop: 0
  });
  
  // Expand search bar
  tl.to(searchElement, {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    duration: 0.5,
    ease: 'power2.inOut'
  });
  
  // Fade in products container
  tl.fromTo(
    productsContainer,
    { opacity: 0, y: -1 }, // Slight overlap to ensure no gap
    { opacity: 1, y: 0, duration: 0.3 },
    '-=0.2'
  );
  
  // Stagger in products
  if (products && products.length > 0) {
    tl.fromTo(
      products,
      { opacity: 0, y: 20, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        stagger: 0.05, 
        duration: 0.3,
        ease: 'power2.out'
      },
      '-=0.1'
    );
  }
  
  return tl;
}; 