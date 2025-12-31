"use client";

import { products } from "@/data/products";
import { Star, ShieldCheck, MessageCircle, Phone, MapPin, CheckCircle, Award, ShoppingCart, Minus, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item"><Link href="/" className="text-decoration-none text-muted hover-danger">Home</Link></li>
          <li className="breadcrumb-item"><Link href="#" className="text-decoration-none text-muted hover-danger">{product.category}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row g-4">
        {/* Image Gallery */}
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm overflow-hidden mb-3">
            <div className="position-relative w-100" style={{ paddingBottom: '75%' }}>
              <Image 
                src={product.image} 
                alt={product.name} 
                fill
                className="object-fit-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="d-flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card border-0 shadow-sm overflow-hidden position-relative" style={{ width: '80px', height: '80px', cursor: 'pointer' }}>
                <Image 
                  src={product.image} 
                  alt="" 
                  fill
                  className="object-fit-cover opacity-75 hover-opacity-100 transition" 
                  sizes="80px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4 h-100">
            <h1 className="h3 fw-bold mb-3">{product.name}</h1>
            
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center text-warning gap-1">
                <Star size={18} fill="currentColor" />
                <span className="fw-bold">{product.rating}</span>
              </div>
              <span className="text-muted">|</span>
              <span className="text-primary">120+ Reviews</span>
              <span className="text-muted">|</span>
              <span className="text-success">500+ Orders</span>
            </div>

            <div className="bg-light p-4 rounded mb-4">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="small text-muted mb-1">Price</div>
                  <div className="h3 fw-bold text-danger mb-0">{product.price}</div>
                  <div className="small text-muted">FOB Price</div>
                </div>
                <div className="col-md-6">
                  <div className="small text-muted mb-1">Minimum Order</div>
                  <div className="h4 fw-bold mb-0">{product.minOrder}</div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h6 className="fw-bold mb-3">Quantity:</h6>
              <div className="d-flex align-items-center gap-3">
                <div className="input-group" style={{maxWidth: '150px'}}>
                  <button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <input type="number" className="form-control text-center" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} />
                  <button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <span className="text-muted small">Available in stock</span>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 mt-auto">
              <button 
                className={`btn ${added ? 'btn-success' : 'btn-danger'} btn-lg d-flex align-items-center justify-content-center gap-2 fw-bold transition`}
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} /> {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-dark btn-lg flex-grow-1 d-flex align-items-center justify-content-center gap-2 fw-bold">
                  <MessageCircle size={20} /> Contact Supplier
                </button>
                <button className="btn btn-outline-secondary btn-lg px-4">
                  <Phone size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Supplier Info Card */}
          <div className="card border-0 shadow-sm mt-4 p-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="bg-light p-2 rounded">
                <Award size={32} className="text-primary" />
              </div>
              <div>
                <h5 className="fw-bold mb-0">{product.supplier}</h5>
                <div className="d-flex align-items-center gap-2 small text-muted">
                  <MapPin size={14} /> Jiangsu, China
                  <span className="badge bg-success-subtle text-success border border-success ms-2">Verified Supplier</span>
                </div>
              </div>
            </div>
            <div className="row g-3 text-center mb-3">
              <div className="col-4">
                <div className="fw-bold">12+</div>
                <div className="small text-muted">Years Exp.</div>
              </div>
              <div className="col-4 border-start">
                <div className="fw-bold">98%</div>
                <div className="small text-muted">Resp. Rate</div>
              </div>
              <div className="col-4 border-start">
                <div className="fw-bold">4.9/5</div>
                <div className="small text-muted">Rating</div>
              </div>
            </div>
            <button className="btn btn-light w-100 fw-bold border">Visit Showroom</button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-5">
        <div className="card border-0 shadow-sm">
          <div className="card-header bg-white border-bottom-0 p-0">
            <ul className="nav nav-tabs px-4 pt-3">
              <li className="nav-item">
                <a className="nav-link active fw-bold text-danger border-top-0 border-start-0 border-end-0 border-bottom-2 border-danger" href="#">Product Description</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted" href="#">Company Profile</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-muted" href="#">Shipping & Payment</a>
              </li>
            </ul>
          </div>
          <div className="card-body p-4">
            <h5 className="fw-bold mb-4">Detailed Description</h5>
            <p className="text-muted">This {product.name} is designed specifically for the needs of the Nepali market, considering local power conditions and usage patterns. Manufactured by {product.supplier}, a leading name in the {product.category} industry.</p>
            
            <ul className="list-group list-group-flush mb-4">
              <li className="list-group-item px-0 border-0 d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>High-efficiency performance under varying temperatures.</span>
              </li>
              <li className="list-group-item px-0 border-0 d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Durable construction with 25-year lifespan guarantee.</span>
              </li>
              <li className="list-group-item px-0 border-0 d-flex gap-2">
                <CheckCircle size={18} className="text-success flex-shrink-0 mt-1" />
                <span>Easy installation and low maintenance costs.</span>
              </li>
            </ul>

            <h5 className="fw-bold mb-3">Trade Assurance Protection</h5>
            <div className="alert alert-info border-0 bg-info-subtle d-flex align-items-center gap-3">
              <ShieldCheck size={32} className="text-info" />
              <div>
                <div className="fw-bold">Trade Assurance</div>
                <div className="small text-muted">Protects your orders from payment to delivery. Guaranteed quality and on-time shipment.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

