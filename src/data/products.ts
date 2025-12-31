export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  minOrder: string;
  supplier: string;
  image: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Industrial Solar Panel 450W Monocrystalline",
    category: "Energy",
    price: "USD 80.00 - 120.00",
    minOrder: "50 Pieces",
    supplier: "Jiangsu Green Energy Co., Ltd.",
    image: "https://images.unsplash.com/photo-1509391366360-fe5bb658582f?w=400&h=300&fit=crop",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Smartphone Accessories Bulk Wholesale",
    category: "Electronics",
    price: "USD 0.50 - 2.00",
    minOrder: "1000 Pieces",
    supplier: "Shenzhen Tech Innovations",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    rating: 4.5,
  },
  {
    id: "3",
    name: "Electric Scooter for City Commuting",
    category: "Vehicles",
    price: "USD 200.00 - 350.00",
    minOrder: "10 Pieces",
    supplier: "Zhejiang Mobility Pro",
    image: "https://images.unsplash.com/photo-1597430335650-327f311542f7?w=400&h=300&fit=crop",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Heavy Duty Excavator Spare Parts",
    category: "Machinery",
    price: "USD 50.00 - 500.00",
    minOrder: "5 Pieces",
    supplier: "Guangzhou Heavy Parts Ltd.",
    image: "https://images.unsplash.com/photo-1581092921461-eab62e92c859?w=400&h=300&fit=crop",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Cotton Men's Casual T-Shirts Bulk",
    category: "Apparel",
    price: "USD 2.50 - 4.00",
    minOrder: "500 Pieces",
    supplier: "Fujian Textile Group",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&h=300&fit=crop",
    rating: 4.3,
  },
  {
    id: "6",
    name: "Smart LED TV 55 inch 4K UHD",
    category: "Electronics",
    price: "USD 180.00 - 250.00",
    minOrder: "20 Pieces",
    supplier: "Anhui Vision Electronics",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop",
    rating: 4.6,
  },
  {
    id: "7",
    name: "Automatic Packaging Machine for Food",
    category: "Machinery",
    price: "USD 1500.00 - 3000.00",
    minOrder: "1 Set",
    supplier: "Shanghai PackTech Co.",
    image: "https://images.unsplash.com/photo-1565608438257-fac33e784dd0?w=400&h=300&fit=crop",
    rating: 4.8,
  },
  {
    id: "8",
    name: "Construction Safety Helmet ANSI Standard",
    category: "Safety",
    price: "USD 3.00 - 6.00",
    minOrder: "200 Pieces",
    supplier: "Shandong Safety Gear",
    image: "https://images.unsplash.com/photo-1589793907316-f94025b46850?w=400&h=300&fit=crop",
    rating: 4.4,
  },
];

export const categories = [
  "Electronics",
  "Machinery",
  "Energy",
  "Apparel",
  "Vehicles",
  "Safety",
  "Home & Garden",
  "Construction",
];
