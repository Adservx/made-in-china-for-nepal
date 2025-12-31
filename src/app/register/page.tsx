"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: ""
  });
  const { login } = useAppContext();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.firstName) {
      login({
        name: formData.firstName,
        email: formData.email
      });
      router.push('/');
    }
  };

  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="row g-0">
               <div className="col-md-5 bg-danger text-white p-5 d-flex flex-column justify-content-center">
                  <h4 className="fw-bold mb-4">Why Join Us?</h4>
                  <ul className="list-unstyled d-flex flex-column gap-3">
                     <li className="d-flex gap-2"><div className="bg-white bg-opacity-25 rounded-circle p-1"><Check size={16}/></div> Get tailored quotes in 24h</li>
                     <li className="d-flex gap-2"><div className="bg-white bg-opacity-25 rounded-circle p-1"><Check size={16}/></div> Access verified suppliers</li>
                     <li className="d-flex gap-2"><div className="bg-white bg-opacity-25 rounded-circle p-1"><Check size={16}/></div> Track orders in real-time</li>
                     <li className="d-flex gap-2"><div className="bg-white bg-opacity-25 rounded-circle p-1"><Check size={16}/></div> Exclusive deals & coupons</li>
                  </ul>
               </div>
               <div className="col-md-7">
                  <div className="card-body p-5">
                    <h3 className="fw-bold mb-4">Create Account</h3>
                    <form onSubmit={handleRegister}>
                      <div className="row g-3">
                        <div className="col-md-6">
                           <label className="form-label small text-muted">First Name</label>
                           <input 
                              type="text" 
                              className="form-control bg-light border-0" 
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                           />
                        </div>
                        <div className="col-md-6">
                           <label className="form-label small text-muted">Last Name</label>
                           <input 
                              type="text" 
                              className="form-control bg-light border-0" 
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                           />
                        </div>
                        <div className="col-12">
                           <label className="form-label small text-muted">Email Address</label>
                           <input 
                              type="email" 
                              className="form-control bg-light border-0" 
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                           />
                        </div>
                        <div className="col-12">
                           <label className="form-label small text-muted">Mobile Number</label>
                           <input 
                              type="tel" 
                              className="form-control bg-light border-0" 
                              required
                              value={formData.mobile}
                              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                           />
                        </div>
                        <div className="col-12">
                           <label className="form-label small text-muted">Password</label>
                           <input 
                              type="password" 
                              className="form-control bg-light border-0" 
                              required
                              value={formData.password}
                              onChange={(e) => setFormData({...formData, password: e.target.value})}
                           />
                        </div>
                        <div className="col-12">
                           <div className="form-check">
                             <input className="form-check-input" type="checkbox" id="terms" required />
                             <label className="form-check-label small text-muted" htmlFor="terms">
                               I agree to the <Link href="#" className="text-decoration-none">Terms of Service</Link> and <Link href="#" className="text-decoration-none">Privacy Policy</Link>
                             </label>
                           </div>
                        </div>
                        <div className="col-12 mt-4">
                          <button type="submit" className="btn btn-danger w-100 fw-bold py-3">Register Now</button>
                        </div>
                        <div className="col-12 text-center small text-muted mt-3">
                          Already have an account? <Link href="/login" className="text-danger fw-bold text-decoration-none">Sign In</Link>
                        </div>
                      </div>
                    </form>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}