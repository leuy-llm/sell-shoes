import { useState, useEffect } from "react";
import { X, CreditCard, User, Mail, MapPin, Lock, Calendar, Shield, ShoppingBag, CheckCircle, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

interface CheckoutProps {
  onClose: () => void;
}


const Checkout = ({ onClose }: CheckoutProps) => {
  const { state, dispatch } = useCart(); // make sure you have dispatch here
    const cartItems = state.items;
    // Mock cart data for demo
//   const cartItems = ;
 const total = cartItems.reduce((acc, item) => acc + item.newPrice * item.quantity, 0);
const tax = total * 0.08;
const shipping = total > 100 ? 0 : 9.99;
const finalTotal = total + tax + shipping;


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    card: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [_orderComplete, setOrderComplete] = useState(false);
  const [orderItems, setOrderItems] = useState<typeof cartItems>([]);

  

  useEffect(() => {
    setShow(true);
  }, []);

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    if (step === 1) {
      if (!form.name.trim()) newErrors.name = "Full name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
      if (form.email && !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    }
    
    if (step === 2) {
      if (!form.address.trim()) newErrors.address = "Address is required";
      if (!form.city.trim()) newErrors.city = "City is required";
      if (!form.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    }
    
    if (step === 3) {
      if (!form.card.trim()) newErrors.card = "Card number is required";
      if (!form.expiry.trim()) newErrors.expiry = "Expiry date is required";
      if (!form.cvv.trim()) newErrors.cvv = "CVV is required";
      if (!form.nameOnCard.trim()) newErrors.nameOnCard = "Cardholder name is required";
      if (form.card && form.card.length < 16) newErrors.card = "Invalid card number";
      if (form.cvv && form.cvv.length < 3) newErrors.cvv = "Invalid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
  if (!validateStep(3)) return;

  setIsProcessing(true);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  setIsProcessing(false);

  // ✅ Save current cart items before clearing
  setOrderItems(cartItems);

  // ✅ Clear cart
  dispatch({ type: "CLEAR_CART" });

  // Go to success screen
  setOrderComplete(true);
  setCurrentStep(4);
};



  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setForm({ ...form, card: formatted });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-epunda">Personal Information</h3>
        <p className="text-gray-600 mt-2 font-epunda">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 font-lato bg-gray-200 border outline-none rounded-xl transition-all duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm font-epunda mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-lato font-semibold text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 font-lato bg-gray-200 border outline-none rounded-xl transition-all duration-200 ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.email && <p className="text-red-500 font-epunda text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-lato text-sm font-semibold text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full px-4 py-3 bg-gray-200 border outline-none rounded-xl transition-all duration-200 ${
              errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.phone && <p className="text-red-500 font-epunda text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-epunda">Shipping Address</h3>
        <p className="text-gray-600 mt-2 font-epunda">Where should we deliver your order?</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-lato">Street Address <span className="text-red-500">*</span></label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <textarea
              placeholder="Enter your full address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              className={`w-full pl-10 pr-4 py-3 border font-lato bg-gray-200 outline-none rounded-xl transition-all duration-200 resize-none ${
                errors.address ? 'border-red-500 bg-red-50 font-epunda' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.address && <p className="text-red-500 font-epunda text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold font-lato text-gray-700 mb-2">City <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter city"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className={`w-full px-4 py-3 border rounded-xl font-lato bg-gray-200 outline-none transition-all duration-200 ${
                errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.city && <p className="text-red-500 font-lato text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block font-lato text-sm font-semibold text-gray-700 mb-2">ZIP Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Enter ZIP code"
              value={form.zipCode}
              onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
              className={`w-full px-4 py-3 font-lato border rounded-xl bg-gray-200 outline-none transition-all duration-200 ${
                errors.zipCode ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.zipCode && <p className="text-red-500 font-epunda text-sm mt-1">{errors.zipCode}</p>}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <CreditCard className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 font-epunda">Payment Details</h3>
        <p className="text-gray-600 mt-2 font-epunda">Secure payment processing</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 font-lato">Cardholder Name <span className="text-red-500">*</span></label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Name on card"
              value={form.nameOnCard}
              onChange={(e) => setForm({ ...form, nameOnCard: e.target.value })}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl font-lato bg-gray-200 outline-none transition-all duration-200 ${
                errors.nameOnCard ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.nameOnCard && <p className="text-red-500 font-epundatext-sm mt-1">{errors.nameOnCard}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold font-lato text-gray-700 mb-2">Card Number <span className="text-red-500">*</span></label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              value={form.card}
              onChange={handleCardChange}
              maxLength={19}
              className={`w-full pl-10 pr-4 py-3  font-lato border rounded-xl bg-gray-200 outline-none transition-all duration-200 ${
                errors.card ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.card && <p className="text-red-500  font-epunda text-sm mt-1">{errors.card}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-lato text-sm font-semibold text-gray-700 mb-2">Expiry Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                maxLength={5}
                className={`w-full pl-10 pr-4 font-lato py-3 border rounded-xl bg-gray-200 outline-none transition-all duration-200 ${
                  errors.expiry ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.expiry && <p className="text-red-500 font-epundatext-sm mt-1">{errors.expiry}</p>}
          </div>

          <div>
            <label className="block font-lato text-sm font-semibold text-gray-700 mb-2">CVV <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="123"
                value={form.cvv}
                onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                maxLength={4}
                className={`w-full font-lato pl-10 pr-4 py-3 border bg-gray-200 outline-none rounded-xl transition-all duration-200 ${
                  errors.cvv ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.cvv && <p className="text-red-500 font-epunda text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Shield className="w-5 h-5 text-green-500" />
            <span className="font-epunda">Your payment information is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
  <div className="text-center py-8">
    <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
      <CheckCircle className="w-10 h-10 text-green-600" />
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-4 font-epunda">Order Placed Successfully!</h3>
    <p className="text-lg text-gray-600 mb-8 font-epunda">Thank you for your purchase. We'll send you a confirmation email shortly.</p>
    
    <div className="bg-gray-50 rounded-xl p-6 mb-6">
      <h4 className="font-semibold text-gray-900 mb-2 font-epunda">Order Summary</h4>
      <p className="text-gray-600 font-epunda">Order Total: <span className="font-bold text-green-600 font-lato">${finalTotal.toFixed(2)}</span></p>
      <p className="text-gray-600 font-lato">Items: {orderItems.length}</p>
    </div>

    <button
      onClick={onClose}
      className="bg-blue-600 font-lato text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
    >
      Continue Shopping
    </button>
  </div>
);


  const renderOrderSummary = () => (
    <div className="bg-gray-50 rounded-xl p-6 h-fit">
      <h3 className="text-lg font-bold font-epunda text-gray-900 mb-4 flex items-center">
        <ShoppingBag className="w-5 h-5 mr-2" />
        Order Summary
      </h3>
      
      <div className=" space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden flex items-center justify-center">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover"/>
            </div>
           <div className="flex-1">
        <p className="font-medium text-gray-900 font-epunda text-sm">{item.title}</p>
        <p className="text-gray-600 text-xs font-lato">Qty: {item.quantity}</p>
      </div>
      <p className="font-bold text-gray-900 font-lato">
        ${(item.newPrice * item.quantity).toFixed(2)}
      </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-gray-600">
          <span className="font-epunda">Subtotal</span>
          <span className="font-lato">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-epunda">Tax</span>
          <span className="font-lato">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span className="font-epunda">Shipping</span>
          <span className="font-lato">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
          <span className="font-epunda">Total</span>
          <span className="font-lato">${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {shipping === 0 && (
        <div className="mt-4 p-3 bg-green-100 rounded-lg">
          <p className="text-green-800 text-sm font-medium font-epunda">🎉 Free shipping applied!</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm   z-40 transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0  z-50 flex items-start sm:items-center justify-center p-4 overflow-auto">
        <div
          className={`bg-white w-full max-w-6xl transform transition-all duration-500 ease-out max-h-[95vh] overflow-hidden
            ${show ? "translate-y-0 opacity-100 scale-100" : "-translate-y-full opacity-0 scale-95"}
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-4">
              {currentStep > 1 && currentStep < 4 && (
                <button
                  onClick={prevStep}
                  className="p-2 hover:bg-gray-100 rounded-lg font-lato transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div>
                <h2 className="text-2xl font-bold font-epunda text-gray-900">Checkout</h2>
                {currentStep < 4 && (
                  <p className="text-gray-600 font-epunda text-sm">Step {currentStep} of 3</p>
                )}
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Progress Bar */}
          {currentStep < 4 && (
            <div className="px-6 py-4 bg-gray-50">
              <div className="flex items-center">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        currentStep >= step
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`h-1 w-16 mx-2 transition-all duration-300 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex font-lato font-semibold justify-between mt-2 text-xs text-gray-600">
                <span>Personal Info</span>
                <span>Shipping</span>
                <span>Payment</span>
              </div>
            </div>
          )}

          {/* Body */}
         <div className="overflow-auto max-h-[calc(95vh-200px)]">
  {cartItems.length === 0 && currentStep < 4 ? (
    // 🛑 Only show empty cart if we're not in step 4+
    <div className="p-12 text-center">
      <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
      <button
        onClick={onClose}
        className="bg-blue-600 font-lato text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200"
      >
        Continue Shopping
      </button>
    </div>
  ) : (
    // ✅ Checkout steps (including success screen)
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
      {/* Main Content */}
      <div
        className={`lg:col-span-2 ${
          currentStep === 4 ? "lg:col-span-3 flex justify-center" : ""
        }`}
      >
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && (
          <div className="w-full max-w-md">{renderStep4()}</div>
        )}
      </div>

      {/* Order Summary */}
      {currentStep < 4 && (
        <div className="lg:col-span-1">{renderOrderSummary()}</div>
      )}
    </div>
  )}
</div>


          {/* Footer */}
          {currentStep < 4 && cartItems.length > 0 && (
            <div className="p-6 border-t border-gray-200 bg-white">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="w-full font-lato sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center"
                  >
                    Continue
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order • ${finalTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;