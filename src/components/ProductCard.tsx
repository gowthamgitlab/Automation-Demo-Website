import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  type: string;
  specs: string;
  price: number;
  image_url: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-card)] transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              {product.type}
            </p>
            <h3 className="font-semibold text-base leading-tight">
              {product.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {product.specs}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            <Button
              size="sm"
              onClick={() => onAddToCart(product.id)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
