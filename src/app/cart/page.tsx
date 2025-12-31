"use client";

import Link from "next/link";
import { Trash2, ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useAppContext();

  // Helper to parse NPR string to number
  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const subtotal = cart.reduce((total, item) => total + parsePrice(item.price) * item.quantity, 0);
  const tax = Math.round(subtotal * 0.13); // 13% VAT
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="py-5">
          <ShoppingCart size={80} className="text-muted mb-4" />
          <h2 className="fw-bold">Your cart is empty</h2>
          <p className="text-muted mb-4">Start sourcing high-quality products from China for Nepal today!</p>
          <Link href="/" className="btn btn-danger px-5 py-3 fw-bold rounded-pill">
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
          <Link href="/" className="btn btn-link p-0 text-dark"><ArrowLeft /></Link>
          <h2 className="fw-bold mb-0">Shopping Cart ({cart.length})</h2>
      </div>
      
      <div className="row g-4">
        <div className="col-lg-8">
          {cart.map((item) => (
            <div key={item.id} className="card border-0 shadow-sm mb-3 overflow-hidden">
               <div className="card-body p-4">
                 <div className="row align-items-center">
                    <div className="col-md-2 col-4">
                       <div className="position-relative rounded overflow-hidden" style={{aspectRatio: '1/1'}}>
                          <Image src={item.image} alt={item.name} fill className="object-fit-cover" />
                       </div>
                    </div>
                    <div className="col-md-4 col-8">
                       <h6 className="fw-bold mb-1 text-truncate-2">{item.name}</h6>
                       <div className="small text-muted mb-1">Supplier: {item.supplier}</div>
                       <div className="text-danger fw-bold">{item.price}</div>
                    </div>
                    <div className="col-md-3 col-6 mt-3 mt-md-0">
                       <div className="input-group input-group-sm" style={{maxWidth: '120px'}}>
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={14} />
                          </button>
                          <input type="text" className="form-control text-center bg-white" value={item.quantity} readOnly />
                          <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={14} />
                          </button>
                       </div>
                    </div>
                    <div className="col-md-2 col-4 text-end mt-3 mt-md-0">
                       <div className="fw-bold">NPR {(parsePrice(item.price) * item.quantity).toLocaleString()}</div>
                    </div>
                    <div className="col-md-1 col-2 text-end mt-3 mt-md-0">
                       <button className="btn btn-link text-danger p-0" onClick={() => removeFromCart(item.id)}><Trash2 size={18} /></button>
                    </div>
                 </div>
               </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
           <div className="card border-0 shadow-sm sticky-top" style={{top: '100px'}}>
              <div className="card-body p-4">
                 <h5 className="fw-bold mb-4">Order Summary</h5>
                 <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-bold">NPR {subtotal.toLocaleString()}</span>
                 </div>
                 <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Shipping (Est.)</span>
                    <span className="text-muted">Calculated at checkout</span>
                 </div>
                 <div className="d-flex justify-content-between mb-4">
                    <span className="text-muted">Tax (13% VAT)</span>
                    <span className="fw-bold">NPR {tax.toLocaleString()}</span>
                 </div>
                 <hr />
                 <div className="d-flex justify-content-between mb-4">
                    <span className="fw-bold fs-5">Total</span>
                    <span className="fw-bold fs-5 text-danger">NPR {total.toLocaleString()}</span>
                 </div>
                 <button className="btn btn-danger w-100 fw-bold py-3 mb-3 shadow">Proceed to Checkout</button>
                 <Link href="/" className="btn btn-outline-secondary w-100 fw-bold">Continue Shopping</Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}