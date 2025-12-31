"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const { login } = useAppContext();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate login
      login({
        name: email.split('@')[0],
        email: email
      });
      router.push('/');
    }
  };

  return (
    <div className="container py-5 my-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow-lg p-4">
            <div className="card-body">
              <h3 className="fw-bold mb-4 text-center">Sign In</h3>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label small text-muted">Email or Mobile Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="Enter your email/mobile" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label small text-muted">Password</label>
                  <input type="password" dir="ltr" className="form-control form-control-lg bg-light border-0" placeholder="Enter your password" required />
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4 small">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label text-muted" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <Link href="#" className="text-decoration-none text-danger">Forgot Password?</Link>
                </div>
                <button type="submit" className="btn btn-danger w-100 btn-lg fw-bold mb-3">Sign In</button>
                <div className="text-center small text-muted">
                  Don't have an account? <Link href="/register" className="text-danger fw-bold text-decoration-none">Register Free</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}