import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-base mb-2 line-clamp-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-foreground">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-9 w-9 p-0"
          >
            {isAdding ? (
              <Icon name="Check" size={18} />
            ) : (
              <Icon name="Plus" size={18} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}