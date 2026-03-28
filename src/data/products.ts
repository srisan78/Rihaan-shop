export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  features: string[];
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Pro Grade English Willow Cricket Bat",
    description: "Premium English willow cricket bat designed for professional players. Excellent balance and massive sweet spot.",
    price: 12500,
    originalPrice: 15000,
    category: "Cricket",
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 124,
    stock: 5,
    features: ["Grade 1 English Willow", "Weight: 1150-1200g", "Pre-knocked", "Includes bat cover"]
  },
  {
    id: "p2",
    name: "Official Match Football - Size 5",
    description: "FIFA quality pro match football. Seamless surface for a more predictable trajectory, better touch and lower water uptake.",
    price: 2999,
    originalPrice: 3999,
    category: "Football",
    image: "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 89,
    stock: 12,
    features: ["Size 5", "Thermally bonded seamless surface", "100% polyurethane cover", "FIFA Quality Pro certified"]
  },
  {
    id: "p3",
    name: "Adjustable Dumbbell Set (20kg)",
    description: "Versatile adjustable dumbbell set for home workouts. Easy to change weights for different exercises.",
    price: 4500,
    originalPrice: 5500,
    category: "Gym Equipment",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 210,
    stock: 3,
    features: ["Total weight: 20kg", "Cast iron plates", "Ergonomic chrome handles", "Includes carrying case"]
  },
  {
    id: "p4",
    name: "Professional Badminton Racket",
    description: "Lightweight carbon fiber badminton racket for advanced players seeking speed and power.",
    price: 3200,
    originalPrice: 4000,
    category: "Badminton",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 156,
    stock: 8,
    features: ["Weight: 82g (4U)", "High Modulus Graphite", "Isometric head shape", "Pre-strung at 24 lbs"]
  },
  {
    id: "p5",
    name: "Yoga Mat with Alignment Lines",
    description: "Eco-friendly TPE yoga mat with alignment lines to help you perfect your poses. Non-slip surface.",
    price: 999,
    originalPrice: 1499,
    category: "Fitness Accessories",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800",
    rating: 4.5,
    reviews: 342,
    stock: 25,
    features: ["Thickness: 6mm", "Material: TPE", "Alignment lines", "Includes carrying strap"]
  },
  {
    id: "p6",
    name: "Cricket Batting Gloves",
    description: "Premium leather batting gloves with high-density foam protection and excellent ventilation.",
    price: 1800,
    originalPrice: 2200,
    category: "Cricket",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=800",
    rating: 4.4,
    reviews: 67,
    stock: 15,
    features: ["Sheep leather palm", "High-density foam padding", "Mesh gusset for ventilation", "Velcro closure"]
  },
  {
    id: "p7",
    name: "Football Goalkeeper Gloves",
    description: "Professional goalkeeper gloves with excellent grip and finger protection spines.",
    price: 2100,
    originalPrice: 2800,
    category: "Football",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 92,
    stock: 7,
    features: ["4mm latex palm", "Finger save spines", "Elastic wrist bandage", "Breathable mesh body"]
  },
  {
    id: "p8",
    name: "Resistance Bands Set",
    description: "Set of 5 resistance bands with different tension levels, handles, ankle straps, and door anchor.",
    price: 1200,
    originalPrice: 1800,
    category: "Gym Equipment",
    image: "https://images.unsplash.com/photo-1598266663439-2056e6900339?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 415,
    stock: 30,
    features: ["5 tension levels (10-50 lbs)", "100% natural latex", "Includes handles and straps", "Carrying bag included"]
  }
];

export const categories = [
  "Cricket",
  "Football",
  "Gym Equipment",
  "Badminton",
  "Fitness Accessories"
];
