import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Youtube, CreditCard, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">
        {/* Top Footer: Newsletter */}
        <div className="row justify-content-center mb-5 border-bottom border-secondary pb-4">
          <div className="col-lg-8 text-center">
            <h3 className="fw-bold mb-3">Trade with Confidence</h3>
            <p className="text-secondary mb-4">Subscribe to get the latest product trends and industry news.</p>
            <div className="input-group mb-3 w-75 mx-auto">
              <input type="text" className="form-control py-3 px-4 border-0" placeholder="Enter your email address" />
              <button className="btn btn-danger px-5 fw-bold" type="button">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 fw-bold text-white fs-6 text-uppercase">About Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Our Story</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Why Choose Us</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Success Stories</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Contact Us</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Careers</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 fw-bold text-white fs-6 text-uppercase">Sourcing Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Search Products</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Request for Quotation</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Logistics to Nepal</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Warehousing Service</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Customs Clearance</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 fw-bold text-white fs-6 text-uppercase">Help Center</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Order Tracking</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Payment Guide (eSewa/Khalti)</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Shipping Rates</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Return Policy</Link></li>
              <li className="mb-2"><Link href="#" className="text-secondary text-decoration-none hover-light">Dispute Resolution</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className="mb-4 fw-bold text-white fs-6 text-uppercase">Contact & Connect</h5>
             <p className="text-secondary mb-3 small">
               <strong>Kathmandu Office:</strong><br/>
               New Baneshwor, Kathmandu, Nepal<br/>
               +977-9800000000
             </p>
             <p className="text-secondary mb-4 small">
               <strong>Guangzhou Office:</strong><br/>
               Baiyun District, Guangzhou, China
             </p>
            <div className="d-flex gap-3">
              <Link href="#" className="text-secondary hover-light"><Facebook size={20} /></Link>
              <Link href="#" className="text-secondary hover-light"><Twitter size={20} /></Link>
              <Link href="#" className="text-secondary hover-light"><Linkedin size={20} /></Link>
              <Link href="#" className="text-secondary hover-light"><Instagram size={20} /></Link>
              <Link href="#" className="text-secondary hover-light"><Youtube size={20} /></Link>
            </div>
          </div>
        </div>
        
        <hr className="my-4 border-secondary opacity-50" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <div className="small text-secondary">
            © 2025 Made-in-China for Nepal. All rights reserved.
          </div>
          
          <div className="d-flex align-items-center gap-3">
             <span className="text-secondary small">Secure Payment:</span>
             <div className="d-flex gap-2">
                <div className="bg-white rounded px-2 py-1 d-flex align-items-center" style={{height: '30px'}}>
                   <span className="fw-bold text-success" style={{fontSize: '0.8rem'}}>eSewa</span>
                </div>
                <div className="bg-white rounded px-2 py-1 d-flex align-items-center" style={{height: '30px'}}>
                   <span className="fw-bold text-primary" style={{fontSize: '0.8rem'}}>Khalti</span>
                </div>
                <div className="bg-white rounded px-2 py-1 d-flex align-items-center" style={{height: '30px'}}>
                   <CreditCard size={16} className="text-dark me-1"/> <span className="fw-bold text-dark" style={{fontSize: '0.8rem'}}>VISA</span>
                </div>
             </div>
          </div>
          
          <div className="d-flex gap-3 small">
            <Link href="#" className="text-secondary text-decoration-none hover-light">Privacy Policy</Link>
            <Link href="#" className="text-secondary text-decoration-none hover-light">Terms of Use</Link>
            <Link href="#" className="text-secondary text-decoration-none hover-light">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
