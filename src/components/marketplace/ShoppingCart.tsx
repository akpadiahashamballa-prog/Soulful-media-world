import React from 'react';
import { useMarketplaceStore } from '@/stores/marketplaceStore';
import Container from '@/components/common/Container';
import Button from '@/components/common/Button';
import { formatCurrency } from '@/utils/formatters';
import { Trash2, ArrowRight } from 'lucide-react';

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, updateCartItem, clearCart } = useMarketplaceStore();
  const [paymentMethod, setPaymentMethod] = React.useState<'stripe' | 'paystack' | 'selar'>('stripe');
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // Integration with payment gateway would happen here
    setTimeout(() => {
      setIsCheckingOut(false);
      // Redirect to payment
    }, 1000);
  };

  if (cart.items.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-smw-sage mb-6">Your cart is empty</p>
        <Button variant="primary">Continue Shopping</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-4 p-4 bg-smw-dark rounded-lg border border-smw-gray"
          >
            {/* Product Image */}
            <div className="w-20 h-20 bg-smw-gold/10 rounded flex items-center justify-center flex-shrink-0">
              {item.product.image ? (
                <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover rounded" />
              ) : (
                <span className="text-2xl">📦</span>
              )}
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-serif text-smw-white mb-1">{item.product.title}</h3>
              <p className="text-sm text-smw-sage mb-2">{item.product.creator.name}</p>
              <p className="text-smw-gold font-medium">{formatCurrency(item.product.price)}</p>
            </div>

            {/* Quantity and Remove */}
            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-2 hover:bg-smw-gray rounded transition-colors text-smw-sage hover:text-red-400"
                aria-label="Remove from cart"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartItem(item.product.id, item.quantity - 1)}
                  className="px-2 py-1 bg-smw-gray rounded text-smw-white hover:bg-smw-gold hover:text-smw-black transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-smw-white font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateCartItem(item.product.id, item.quantity + 1)}
                  className="px-2 py-1 bg-smw-gray rounded text-smw-white hover:bg-smw-gold hover:text-smw-black transition-colors"
                >
                  +
                </button>
              </div>
              <p className="text-smw-gold font-serif">
                {formatCurrency(item.product.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Checkout Section */}
      <div className="bg-smw-dark rounded-lg border border-smw-gold/30 p-6 space-y-4">
        {/* Summary */}
        <div className="space-y-2 pb-4 border-b border-smw-gray">
          <div className="flex justify-between text-smw-sage">
            <span>Subtotal:</span>
            <span>{formatCurrency(cart.total)}</span>
          </div>
          <div className="flex justify-between text-smw-sage text-sm">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-smw-white font-serif text-lg pt-2">
            <span>Total:</span>
            <span className="text-smw-gold">{formatCurrency(cart.total)}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3">
          <p className="text-smw-white font-medium text-sm">Payment Method</p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'stripe', label: 'Stripe' },
              { value: 'paystack', label: 'Paystack' },
              { value: 'selar', label: 'Selar' },
            ].map((method) => (
              <button
                key={method.value}
                onClick={() => setPaymentMethod(method.value as 'stripe' | 'paystack' | 'selar')}
                className={`px-3 py-2 rounded border transition-colors ${
                  paymentMethod === method.value
                    ? 'bg-smw-gold text-smw-black border-smw-gold'
                    : 'bg-smw-dark text-smw-white border-smw-gray hover:border-smw-gold'
                }`}
              >
                {method.label}
              </button>
            ))}
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          onClick={handleCheckout}
          isLoading={isCheckingOut}
          size="lg"
          className="w-full"
          disabled={cart.items.length === 0}
        >
          Proceed to Checkout <ArrowRight className="w-4 h-4 ml-2" />
        </Button>

        {/* Continue Shopping */}
        <Button
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={() => clearCart()}
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};

export default ShoppingCart;
