import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CartItemWithProduct {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    name: string;
    price: number;
  };
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    address: "",
    email: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
    } else {
      setUserId(session.user.id);
      setUserEmail(session.user.email || "");
      setFormData((prev) => ({ ...prev, email: session.user.email || "" }));
      fetchCartItems(session.user.id);
      fetchProfile(session.user.id);
    }
  };

  const fetchProfile = async (uid: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, mobile, address")
      .eq("id", uid)
      .single();

    if (data) {
      setFormData((prev) => ({
        ...prev,
        fullName: data.full_name || "",
        mobile: data.mobile || "",
        address: data.address || "",
      }));
    }
  };

  const fetchCartItems = async (uid: string) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, product_id, products(name, price)")
      .eq("user_id", uid);

    if (!error && data) {
      setCartItems(data);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.products.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setLoading(true);

    const orderItems = cartItems.map((item) => ({
      product_id: item.product_id,
      product_name: item.products.name,
      quantity: item.quantity,
      price: item.products.price,
    }));

    const { error: orderError } = await supabase.from("orders").insert({
      user_id: userId,
      full_name: formData.fullName,
      mobile: formData.mobile,
      address: formData.address,
      email: formData.email,
      total_amount: totalAmount,
      order_items: orderItems,
      status: "placed",
    });

    if (orderError) {
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    await supabase.from("profiles").upsert({
      id: userId,
      email: formData.email,
      full_name: formData.fullName,
      mobile: formData.mobile,
      address: formData.address,
    });

    await supabase.from("cart_items").delete().eq("user_id", userId);

    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully",
    });

    setTimeout(() => {
      navigate("/orders");
    }, 1000);

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="mb-8 p-6 bg-card border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.products.name} x {item.quantity}
              </span>
              <span className="font-semibold">
                ₹{(item.products.price * item.quantity).toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t border-border mt-4 pt-4 flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span className="text-primary">₹{totalAmount.toLocaleString()}</span>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
