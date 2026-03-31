import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="container mx-auto px-4 py-20 text-center max-w-lg">
      <CheckCircle2 className="w-20 h-20 text-success mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-foreground mb-2">Order Placed!</h1>
      <p className="text-muted-foreground mb-4">Thank you for your purchase.</p>

      <div className="bg-card rounded-xl border border-border p-6 mb-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-semibold">#{orderId}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Delivery</span>
          <span className="font-semibold flex items-center gap-1"><Package className="w-4 h-4 text-primary" /> {deliveryDate.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link to="/orders" className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
          View My Orders <ArrowRight className="w-4 h-4" />
        </Link>
        <Link to="/products" className="text-primary text-sm font-medium hover:underline">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
