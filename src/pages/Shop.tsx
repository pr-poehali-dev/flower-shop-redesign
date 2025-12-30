import { useState } from 'react';
import Header from '@/components/Header';
import Categories, { Category } from '@/components/Categories';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const CATEGORIES: Category[] = [
  { id: 'all', name: 'Все', emoji: '🌸' },
  { id: 'roses', name: 'Розы', emoji: '🌹' },
  { id: 'tulips', name: 'Тюльпаны', emoji: '🌷' },
  { id: 'lilies', name: 'Лилии', emoji: '🌺' },
  { id: 'mixed', name: 'Микс', emoji: '💐' },
  { id: 'wedding', name: 'Свадебные', emoji: '💒' },
  { id: 'gift', name: 'Подарочные', emoji: '🎁' },
];

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Букет "Нежность"', price: 2990, image: '/placeholder.svg', category: 'Розы', popular: true },
  { id: 2, name: 'Весенний букет', price: 1990, image: '/placeholder.svg', category: 'Тюльпаны', popular: true },
  { id: 3, name: 'Лилии королевские', price: 3490, image: '/placeholder.svg', category: 'Лилии' },
  { id: 4, name: 'Микс "Радуга"', price: 2490, image: '/placeholder.svg', category: 'Микс', popular: true },
  { id: 5, name: 'Свадебная композиция', price: 5990, image: '/placeholder.svg', category: 'Свадебные' },
  { id: 6, name: 'Подарочный набор', price: 3990, image: '/placeholder.svg', category: 'Подарочные' },
  { id: 7, name: 'Красные розы 25 шт', price: 4990, image: '/placeholder.svg', category: 'Розы' },
  { id: 8, name: 'Белые тюльпаны', price: 2290, image: '/placeholder.svg', category: 'Тюльпаны' },
];

interface CartItem extends Product {
  quantity: number;
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === CATEGORIES.find(c => c.id === activeCategory)?.name;
    const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularProducts = MOCK_PRODUCTS.filter(p => p.popular);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <Categories
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="container mx-auto px-4 py-8">
        <section className="mb-12 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/40 rounded-3xl p-8 md:p-12 animate-fade-in">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              Свежие букеты с доставкой
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Создаем красоту каждый день. Более 500 композиций для любого события.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base">
              Посмотреть каталог
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </section>

        {searchQuery === '' && (
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                Популярные букеты
              </h3>
              <Button variant="ghost" className="text-primary">
                Все
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {popularProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        <section>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Весь каталог'}
          </h3>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-secondary/50 rounded-full p-6 inline-flex mb-4">
                <Icon name="Search" size={48} className="text-muted-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Ничего не найдено</h4>
              <p className="text-muted-foreground">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    </div>
  );
}
