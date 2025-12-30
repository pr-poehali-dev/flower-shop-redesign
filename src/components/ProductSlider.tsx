import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import ProductCard, { Product } from './ProductCard';

interface ProductSliderProps {
  products: Product[];
  title: string;
  onAddToCart: (product: Product) => void;
}

export default function ProductSlider({ products, title, onAddToCart }: ProductSliderProps) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 4;

  const nextSlide = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + itemsPerPage < products.length;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl md:text-4xl font-bold text-foreground">
          {title}
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            disabled={!canGoPrev}
            className="rounded-full h-10 w-10"
          >
            <Icon name="ChevronLeft" size={20} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            disabled={!canGoNext}
            className="rounded-full h-10 w-10"
          >
            <Icon name="ChevronRight" size={20} />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex gap-4 md:gap-6 transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)`
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerPage}% - ${(itemsPerPage - 1) * (window.innerWidth < 768 ? 16 : 24) / itemsPerPage}px)` }}
            >
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(products.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setStartIndex(index * itemsPerPage)}
            className={`h-2 rounded-full transition-all duration-300 ${
              Math.floor(startIndex / itemsPerPage) === index
                ? 'w-8 bg-primary'
                : 'w-2 bg-muted hover:bg-primary/50'
            }`}
            aria-label={`Страница ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
