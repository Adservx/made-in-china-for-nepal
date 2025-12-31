"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Globe, Menu, Phone, FileText, Truck, Smartphone, LogOut } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, user, logout } = useAppContext();

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky-top bg-white shadow-sm" style={{ zIndex: 1000 }}>
      {/* Top Bar */}
      <div className="bg-light py-2 border-bottom d-none d-md-block">
        <div className="container d-flex justify-content-between align-items-center fs-7 text-muted">
          <div className="d-flex align-items-center gap-3">
            <span className="d-flex align-items-center gap-1 text-danger fw-medium">
              <Smartphone size={14} /> Download App
            </span>
            <span className="border-start ps-3">Welcome to Made-in-China for Nepal!</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span className="fw-bold text-dark">Hi, {user.name}</span>
                <button onClick={logout} className="btn btn-link btn-sm p-0 text-muted hover-danger text-decoration-none d-flex align-items-center gap-1">
                  <LogOut size={14} /> Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-decoration-none text-muted hover-danger">Sign In</Link>
                <span className="text-muted">|</span>
                <Link href="/register" className="text-decoration-none text-muted hover-danger">Join Free</Link>
              </>
            )}
            <div className="vr mx-2"></div>
            <Link href="/tracking" className="text-decoration-none text-muted d-flex align-items-center gap-1 hover-danger">
              <Truck size={14} /> Order Tracking
            </Link>
            <Link href="#" className="text-decoration-none text-muted d-flex align-items-center gap-1 hover-danger">
              <Globe size={14} /> English / NPR
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg py-3">
        <div className="container">
          <Link href="/" className="navbar-brand fw-bold text-danger d-flex align-items-center me-lg-5">
            <div className="d-flex flex-column align-items-start lh-1">
              <span className="fs-3">MADE-IN-CHINA</span>
              <span className="badge bg-danger text-white rounded-pill px-2 py-1 fs-7 mt-1">FOR NEPAL</span>
            </div>
          </Link>

          <div className="d-flex d-lg-none gap-2">
            <button className="btn btn-link text-dark p-1">
              <Search size={24} />
            </button>
            <Link href="/cart" className="btn btn-link text-dark p-1 position-relative">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="btn btn-link text-dark p-1">
              <Menu size={24} />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Search Bar */}
            <div className="mx-auto w-100 px-lg-4" style={{ maxWidth: '650px' }}>
              <div className="input-group border border-2 border-danger rounded-pill overflow-hidden">
                <button className="btn btn-light dropdown-toggle border-0 ps-3 pe-2 text-muted fw-medium" type="button">
                  Products
                </button>
                <input
                  type="text"
                  className="form-control border-0 px-3"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-danger px-4 m-0 fw-bold d-flex align-items-center gap-2">
                  <Search size={18} /> <span className="d-none d-md-inline">Search</span>
                </button>
              </div>
            </div>

            {/* Right Nav Icons */}
            <ul className="navbar-nav ms-auto align-items-center gap-4">
              <li className="nav-item">
                <Link href="/" className="nav-link d-flex flex-column align-items-center text-center p-0 text-secondary hover-danger">
                  <FileText size={22} className="mb-1" />
                  <span className="fs-7 fw-medium">Post RFQ</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href={user ? "/account" : "/login"} className="nav-link d-flex flex-column align-items-center text-center p-0 text-secondary hover-danger">
                  <User size={22} className="mb-1" />
                  <span className="fs-7 fw-medium">{user ? "Account" : "Sign In"}</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/cart" className="nav-link d-flex flex-column align-items-center text-center p-0 text-secondary hover-danger position-relative">
                  <ShoppingCart size={22} className="mb-1" />
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 end-0 badge rounded-pill bg-danger border border-light p-1" style={{ fontSize: '0.6rem', transform: 'translate(40%, -10%)' }}>
                      {cartCount}
                    </span>
                  )}
                  <span className="fs-7 fw-medium">Cart</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className="bg-white border-top d-none d-lg-block">
        <div className="container">
          <div className="d-flex align-items-center gap-4 py-2">
            <div className="dropdown">
              <button className="btn btn-danger rounded-pill d-flex align-items-center gap-2 px-4 fw-bold">
                <Menu size={18} /> All Categories
              </button>
            </div>
            <div className="d-flex gap-4 fw-medium text-secondary fs-7">
              <Link href="#" className="text-decoration-none text-dark hover-danger">Top Ranking</Link>
              <Link href="#" className="text-decoration-none text-dark hover-danger">New Arrivals</Link>
              <Link href="#" className="text-decoration-none text-dark hover-danger">Trade Shows</Link>
              <Link href="#" className="text-decoration-none text-dark hover-danger">Logistics Services</Link>
              <Link href="#" className="text-decoration-none text-dark hover-danger">Help Center</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
