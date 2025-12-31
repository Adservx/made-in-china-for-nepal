import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card h-100 border-0 shadow-sm product-card transition bg-white overflow-hidden">
      <Link href={`/product/${product.id}`} className="text-decoration-none text-dark h-100 d-flex flex-column">
        <div className="position-relative bg-light" style={{ aspectRatio: '4/3', width: '100%' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-fit-cover"
          />
        </div>
        <div className="card-body d-flex flex-column p-3">
          <h6 className="card-title text-truncate-2 mb-2 fs-6 fw-medium lh-base text-dark" style={{ height: '2.5rem' }}>
            {product.name}
          </h6>
          <div className="mt-auto">
            <div className="text-danger fw-bold fs-5 mb-1">{product.price}</div>
            <div className="small text-muted mb-2 fs-7">Min. Order: {product.minOrder}</div>
            <div className="d-flex align-items-center gap-1 small text-muted mb-2 fs-7">
              <span className="text-warning d-flex align-items-center fw-bold"><Star size={12} fill="currentColor" className="me-1"/> {product.rating}</span>
              <span className="ms-auto text-truncate" style={{maxWidth: '120px'}}>{product.category}</span>
            </div>
            <div className="border-top pt-2 mt-2">
              <div className="small text-truncate text-muted fs-7">{product.supplier}</div>
            </div>
          </div>
        </div>
      </Link>
      <div className="card-footer bg-white border-0 px-3 pb-3 pt-0">
        <button className="btn btn-outline-danger w-100 btn-sm rounded-pill fw-medium">Inquiry Now</button>
      </div>
    </div>
  );
}

