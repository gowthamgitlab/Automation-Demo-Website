import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface InstrumentCardProps {
  name: string;
  category: string;
  price: string;
  image: string;
  index: number;
}

export const InstrumentCard = ({ name, category, price, image, index }: InstrumentCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden border-border bg-card hover:shadow-[var(--shadow-card)] transition-all duration-500">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <div className="p-6 space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">{category}</p>
            <h3 className="text-2xl font-bold text-foreground">{name}</h3>
            <p className="text-lg font-semibold text-primary">{price}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
