import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface CategoriesProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export default function Categories({ categories, activeCategory, onSelectCategory }: CategoriesProps) {
  return (
    <div className="border-b border-border bg-white">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSelectCategory(category.id)}
                className={`
                  rounded-full px-4 md:px-6 transition-all duration-200
                  ${activeCategory === category.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-white hover:bg-secondary/50'
                  }
                `}
              >
                <span className="mr-2">{category.emoji}</span>
                <span className="font-medium">{category.name}</span>
              </Button>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
