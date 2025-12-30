import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  const [isLiked, setIsLiked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.popular && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground border-0">
            Популярное
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-3 right-3 bg-white/90 hover:bg-white transition-all ${
            isLiked ? 'text-red-500' : 'text-muted-foreground'
          }`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Icon name={isLiked ? 'Heart' : 'Heart'} size={18} fill={isLiked ? 'currentColor' : 'none'} />
        </Button>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-base md:text-lg mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground">{product.category}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-xl font-bold text-foreground">
            {product.price.toLocaleString('ru-RU')} ₽
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 md:px-6"
          >
            {isAdding ? (
              <Icon name="Check" size={16} />
            ) : (
              <>
                <Icon name="Plus" size={16} className="md:mr-1" />
                <span className="hidden md:inline">В корзину</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
