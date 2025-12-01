import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Package, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/login");
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container py-4 flex items-center justify-between gap-4 flex-wrap">
        <div
          className="text-2xl font-bold tracking-widest cursor-pointer"
          style={{ letterSpacing: '0.15em' }}
          onClick={() => navigate("/shop")}
        >
          RAGA VIBES
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/shop")}
          >
            Shop
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/orders")}
          >
            <Package className="w-4 h-4 mr-2" />
            Orders
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
