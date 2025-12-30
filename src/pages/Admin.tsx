import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ADMIN_PASSWORD = 'admin123';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const MOCK_ADMIN_PRODUCTS: Product[] = [
  { id: 1, name: 'Букет "Нежность"', price: 2990, category: 'Розы', stock: 15 },
  { id: 2, name: 'Весенний букет', price: 1990, category: 'Тюльпаны', stock: 23 },
  { id: 3, name: 'Лилии королевские', price: 3490, category: 'Лилии', stock: 8 },
  { id: 4, name: 'Микс "Радуга"', price: 2490, category: 'Микс', stock: 12 },
];

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_ADMIN_PRODUCTS);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md animate-scale-in">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-4">
              <Icon name="Lock" size={32} className="text-primary" />
            </div>
            <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="mt-1.5"
                />
                {error && (
                  <p className="text-sm text-destructive mt-2 flex items-center gap-1">
                    <Icon name="AlertCircle" size={14} />
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground">
                Войти
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Демо: пароль "admin123"
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/logo.jpg" 
                alt="Sakura Flowers" 
                className="h-12 rounded-full"
              />
              <h1 className="text-xl md:text-2xl font-bold">Админ-панель</h1>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
              className="gap-2"
            >
              <Icon name="LogOut" size={18} />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Всего товаров
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Общая выручка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">125 000 ₽</div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Заказов сегодня
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
          </Card>
        </div>

        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Управление товарами</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                    <Icon name="Plus" size={18} />
                    Добавить товар
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый товар</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="name">Название</Label>
                      <Input id="name" placeholder="Название букета" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена (₽)</Label>
                      <Input id="price" type="number" placeholder="2990" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Input id="category" placeholder="Розы" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="stock">Количество</Label>
                      <Input id="stock" type="number" placeholder="10" className="mt-1.5" />
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Создать товар
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full md:w-auto grid-cols-2 mb-4">
                <TabsTrigger value="products">Товары</TabsTrigger>
                <TabsTrigger value="orders">Заказы</TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead className="hidden md:table-cell">Категория</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead className="hidden md:table-cell">Остаток</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">#{product.id}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                          <TableCell>{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge variant={product.stock < 10 ? 'destructive' : 'secondary'}>
                              {product.stock} шт
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Icon name="Pencil" size={14} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Icon name="Trash2" size={14} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <div className="text-center py-12">
                  <div className="bg-secondary/50 rounded-full p-6 inline-flex mb-4">
                    <Icon name="Package" size={48} className="text-muted-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Заказы появятся здесь</h4>
                  <p className="text-muted-foreground text-sm">
                    Список заказов будет доступен после первой покупки
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}