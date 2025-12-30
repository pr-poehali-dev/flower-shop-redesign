import { useState } from 'react';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import Categories, { Category } from '@/components/Categories';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  { id: 1, name: 'Букет "Нежность"', price: 2990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Розы', popular: true },
  { id: 2, name: 'Весенний букет', price: 1990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Тюльпаны', popular: true },
  { id: 3, name: 'Лилии королевские', price: 3490, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Лилии' },
  { id: 4, name: 'Микс "Радуга"', price: 2490, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Микс', popular: true },
  { id: 5, name: 'Свадебная композиция', price: 5990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Свадебные' },
  { id: 6, name: 'Подарочный набор', price: 3990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Подарочные' },
  { id: 7, name: 'Красные розы 25 шт', price: 4990, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Розы' },
  { id: 8, name: 'Белые тюльпаны', price: 2290, image: 'https://cdn.poehali.dev/files/photo.jpg', category: 'Тюльпаны' },
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
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/10">
      <Header
        cartItemsCount={cartItemsCount}
        onCartOpen={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />
      
      <HeroSlider />

      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            О магазине Sakura
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Мы создаем изысканные цветочные композиции, вдохновленные японской эстетикой. 
            Каждый букет — это произведение искусства, созданное с любовью и вниманием к деталям.
            Свежие цветы, быстрая доставка и безупречный сервис — вот наши принципы.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <Card className="p-6 md:p-8 text-center border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in bg-white">
            <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Icon name="Truck" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Быстрая доставка</h3>
            <p className="text-muted-foreground">
              Доставляем букеты по городу от 2 часов. Сохраняем свежесть в пути.
            </p>
          </Card>

          <Card className="p-6 md:p-8 text-center border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in bg-white" style={{ animationDelay: '0.1s' }}>
            <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Icon name="Heart" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Свежие цветы</h3>
            <p className="text-muted-foreground">
              Ежедневные поставки от проверенных производителей. Гарантия качества.
            </p>
          </Card>

          <Card className="p-6 md:p-8 text-center border-0 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in bg-white" style={{ animationDelay: '0.2s' }}>
            <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto mb-4">
              <Icon name="Gift" size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">Индивидуальный подход</h3>
            <p className="text-muted-foreground">
              Создаем уникальные композиции по вашим пожеланиям. Консультируем бесплатно.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 animate-fade-in">
              <img 
                src="https://cdn.poehali.dev/files/logo.jpg" 
                alt="Sakura Logo" 
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
              />
            </div>
            <div className="flex-1 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                Философия Sakura
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
                Наше название вдохновлено японской вишней — символом красоты, нежности и обновления. 
                Как цветы сакуры радуют своей недолговечной красотой, так и мы стремимся дарить 
                моменты счастья через наши композиции.
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Каждый букет создается флористами с многолетним опытом, которые понимают язык цветов 
                и знают, как передать ваши чувства через идеальную композицию.
              </p>
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
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl md:text-4xl font-bold text-foreground">
                Популярные букеты
              </h3>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
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
          <h3 className="text-2xl md:text-4xl font-bold mb-8 text-foreground">
            {searchQuery ? `Результаты поиска: "${searchQuery}"` : 'Весь каталог'}
          </h3>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
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

      <footer className="bg-foreground/5 border-t border-border mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img 
                src="https://cdn.poehali.dev/files/logo2.jpg" 
                alt="Sakura Flowers" 
                className="h-12 mb-4"
              />
              <p className="text-muted-foreground text-sm">
                Цветочный магазин с душой. <br />
                Создаем красоту каждый день.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (900) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@sakura-flowers.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Цветочная, 1
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Режим работы</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Пн-Вс: 9:00 - 21:00</p>
                <p>Доставка: круглосуточно</p>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Sakura Flowers. Все права защищены.
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
