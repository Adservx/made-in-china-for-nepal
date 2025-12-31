import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { ChevronRight, Zap, ShieldCheck, Truck, Award, CreditCard, Box, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero & Categories Section */}
      <section className="py-4">
        <div className="container">
          <div className="row g-3">
            {/* Sidebar Categories */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="card border-0 shadow-sm h-100 overflow-hidden">
                <div className="card-header bg-white fw-bold py-3 border-bottom">
                  <span className="d-flex align-items-center gap-2">
                     MARKET CATEGORIES
                  </span>
                </div>
                <div className="list-group list-group-flush overflow-auto" style={{maxHeight: '400px'}}>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat.toLowerCase()}`}
                      className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center py-2 px-3 fs-7"
                    >
                      {cat} <ChevronRight size={14} className="text-muted" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Hero Area */}
            <div className="col-lg-7 col-md-12">
              <div className="card border-0 shadow-sm overflow-hidden h-100 bg-dark text-white position-relative" style={{minHeight: '380px'}}>
                {/* Background Image Placeholder */}
                <div className="position-absolute top-0 start-0 w-100 h-100 bg-danger" style={{
                  background: 'linear-gradient(135deg, #e62117 0%, #a3110a 100%)',
                  opacity: 0.9
                }}></div>
                
                <div className="card-body p-5 d-flex flex-column justify-content-center h-100 position-relative z-1">
                  <span className="badge bg-warning text-dark mb-3 w-auto align-self-start fw-bold">Direct from China</span>
                  <h1 className="display-5 fw-bold mb-3">Sourcing for Nepal<br/>Made Simple.</h1>
                  <p className="lead mb-4 opacity-75" style={{maxWidth: '450px'}}>Connect with verified manufacturers. Secure payments via eSewa & Khalti. Reliable logistics to Kathmandu.</p>
                  <div className="d-flex gap-3">
                    <button className="btn btn-light btn-lg rounded-pill px-4 fw-bold text-danger border-0 shadow">Source Now</button>
                    <button className="btn btn-outline-light btn-lg rounded-pill px-4">How it Works</button>
                  </div>
                </div>
                {/* Decorative Element */}
                <div className="position-absolute bottom-0 end-0 p-0 opacity-10" style={{transform: 'translate(20%, 20%)'}}>
                  <Truck size={300} />
                </div>
              </div>
            </div>

            {/* Right Side Promo Cards */}
            <div className="col-lg-2 d-none d-lg-block">
              <div className="d-flex flex-column gap-3 h-100">
                <div className="card border-0 shadow-sm flex-fill bg-white">
                  <div className="card-body text-center p-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="bg-light p-3 rounded-circle mb-3">
                       <Zap className="text-warning" size={24} />
                    </div>
                    <h6 className="fw-bold mb-1 fs-7">Fast Inquiry</h6>
                    <p className="small text-muted mb-0 lh-sm">Quotes in 24h</p>
                  </div>
                </div>
                <div className="card border-0 shadow-sm flex-fill bg-white">
                  <div className="card-body text-center p-3 d-flex flex-column justify-content-center align-items-center">
                     <div className="bg-light p-3 rounded-circle mb-3">
                       <ShieldCheck className="text-success" size={24} />
                     </div>
                    <h6 className="fw-bold mb-1 fs-7">Trade Assurance</h6>
                    <p className="small text-muted mb-0 lh-sm">Safe payments</p>
                  </div>
                </div>
                <div className="card border-0 shadow-sm flex-fill bg-white">
                  <div className="card-body text-center p-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="bg-light p-3 rounded-circle mb-3">
                       <User className="text-primary" size={24} />
                    </div>
                    <h6 className="fw-bold mb-1 fs-7">Register Free</h6>
                    <Link href="/register" className="btn btn-sm btn-outline-danger rounded-pill w-100 mt-2 py-0" style={{fontSize: '0.7rem'}}>Join Now</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trade Services Section */}
      <section className="py-4">
        <div className="container">
           <div className="card border-0 shadow-sm p-4">
              <div className="row g-4 text-center">
                 <div className="col-md-3 border-end">
                    <div className="d-flex flex-column align-items-center gap-2">
                       <Truck size={32} className="text-danger" />
                       <h6 className="fw-bold mb-0">Logistics to Nepal</h6>
                       <p className="small text-muted mb-0">Air & Sea Cargo Solutions</p>
                    </div>
                 </div>
                 <div className="col-md-3 border-end">
                    <div className="d-flex flex-column align-items-center gap-2">
                       <CreditCard size={32} className="text-primary" />
                       <h6 className="fw-bold mb-0">Easy Payment</h6>
                       <p className="small text-muted mb-0">eSewa, Khalti & Bank Transfer</p>
                    </div>
                 </div>
                 <div className="col-md-3 border-end">
                    <div className="d-flex flex-column align-items-center gap-2">
                       <Box size={32} className="text-warning" />
                       <h6 className="fw-bold mb-0">Inventory Mgmt</h6>
                       <p className="small text-muted mb-0">Warehousing in Guangzhou</p>
                    </div>
                 </div>
                 <div className="col-md-3">
                    <div className="d-flex flex-column align-items-center gap-2">
                       <Award size={32} className="text-success" />
                       <h6 className="fw-bold mb-0">Quality Control</h6>
                       <p className="small text-muted mb-0">Inspection before Shipment</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
               <h3 className="fw-bold mb-0">Selected for You</h3>
               <span className="badge bg-danger-subtle text-danger border border-danger-subtle">Recommended</span>
            </div>
            <Link href="/products" className="btn btn-outline-dark rounded-pill px-4 fw-bold fs-7">
              View All Products
            </Link>
          </div>
          <div className="row g-3">
            {products.map((product) => (
              <div key={product.id} className="col-xl-2 col-lg-3 col-md-4 col-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing Request Section */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="bg-dark text-white rounded-xl p-5 position-relative overflow-hidden">
             {/* Background Pattern */}
             <div className="position-absolute top-0 end-0 opacity-10">
                <TrendingUp size={400} />
             </div>
             
            <div className="row align-items-center position-relative z-1">
              <div className="col-lg-5">
                <h2 className="fw-bold mb-3 display-6">One-Stop Sourcing</h2>
                <p className="text-white-50 fs-5 mb-4">Tell us what you need. Get quotes from verified suppliers within 24 hours.</p>
                <div className="d-flex gap-3 mb-4 mb-lg-0">
                   <div className="d-flex align-items-center gap-2">
                      <div className="bg-white bg-opacity-10 p-2 rounded-circle"><Clock size={20}/></div>
                      <span className="small">Fast Response</span>
                   </div>
                   <div className="d-flex align-items-center gap-2">
                      <div className="bg-white bg-opacity-10 p-2 rounded-circle"><ShieldCheck size={20}/></div>
                      <span className="small">Verified Suppliers</span>
                   </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="bg-white p-4 rounded-xl shadow-lg text-dark">
                   <h5 className="fw-bold mb-3">Post a Buying Request</h5>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control bg-light border-0 py-3" placeholder="Product Name / Keyword" />
                    </div>
                    <div className="col-md-3">
                      <input type="number" className="form-control bg-light border-0 py-3" placeholder="Quantity" />
                    </div>
                     <div className="col-md-3">
                       <select className="form-select bg-light border-0 py-3 text-muted">
                          <option>Unit</option>
                          <option>Pcs</option>
                          <option>Sets</option>
                          <option>Kg</option>
                       </select>
                     </div>
                    <div className="col-12">
                      <textarea className="form-control bg-light border-0 py-3" rows={2} placeholder="Product Description (Optional)"></textarea>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-danger w-100 py-3 fw-bold rounded-3">Submit Request Now</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Helper component for icon import
function User(props: any) {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        </svg>
    )
}

