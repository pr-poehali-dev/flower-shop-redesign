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
];

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Букет "Сакура"', price: 2990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Розы', popular: true },
  { id: 2, name: 'Нежная весна', price: 1990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Тюльпаны', popular: true },
  { id: 3, name: 'Королевские лилии', price: 3490, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Лилии', popular: true },
  { id: 4, name: 'Микс "Радуга"', price: 2490, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Микс', popular: true },
  { id: 5, name: 'Розовые розы', price: 3990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Розы' },
  { id: 6, name: 'Белые тюльпаны', price: 2290, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Тюльпаны' },
  { id: 7, name: 'Красные розы 25 шт', price: 4990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Розы' },
  { id: 8, name: 'Весенний микс', price: 2790, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Микс' },
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
    <div className="min-h-screen bg-white">
      <Header
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/files/photo.jpg"
            alt="Sakura Flowers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Sakura<br />Flowers
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Изысканные букеты в японском стиле.<br />
                Доставка за 2 часа по городу.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg rounded-full shadow-2xl"
              >
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Categories
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      <div className="container mx-auto px-4 py-12">
        {searchQuery === '' && (
          <section className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
              Популярные букеты
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
            {searchQuery ? `Поиск: "${searchQuery}"` : 'Все букеты'}
          </h2>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-secondary/30 rounded-full p-8 inline-flex mb-4">
                <Icon name="Search" size={56} className="text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
              <p className="text-muted-foreground">
                Попробуйте изменить запрос
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

      <footer className="bg-secondary/30 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img 
                src="https://cdn.poehali.dev/files/logo.jpg" 
                alt="Sakura Flowers" 
                className="h-20 rounded-full mb-4"
              />
              <p className="text-muted-foreground">
                Цветочный магазин Sakura.<br />
                Создаем композиции с душой.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>+7 (900) 123-45-67</p>
                <p>info@sakura.ru</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Режим работы</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Ежедневно: 9:00 - 21:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Sakura Flowers
          </div>
        </div>
      </footer>

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
