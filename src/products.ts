export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  rating: number;
  stock: number;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Smart LED Desk Lamp",
    price: 29.90,
    category: "Technology",
    description:
      "A modern LED desk lamp with adjustable brightness for your workspace.",
    rating: 4.7,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 2,
    name: "Minimalist Water Bottle",
    price: 19.90,
    category: "Fitness",
    description:
      "A stylish reusable water bottle designed for everyday use and workouts.",
    rating: 4.6,
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 3,
    name: "Wireless Headphones",
    price: 49.90,
    category: "Technology",
    description:
      "Comfortable wireless headphones with a clean design and immersive sound.",
    rating: 4.8,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 4,
    name: "Aesthetic Ceramic Mug",
    price: 16.90,
    category: "Home & Living",
    description:
      "A simple ceramic mug that adds a clean aesthetic to your kitchen.",
    rating: 4.5,
    stock: 32,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 5,
    name: "Portable Mini Fan",
    price: 24.90,
    category: "Technology",
    description:
      "A compact rechargeable fan that's perfect for your desk or travelling.",
    rating: 4.4,
    stock: 21,
    image:
      "https://images.unsplash.com/photo-1524514587686-e2909d7d1f7a?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 6,
    name: "Resistance Bands Set",
    price: 21.90,
    category: "Fitness",
    description:
      "A versatile resistance band set for home workouts and strength training.",
    rating: 4.7,
    stock: 35,
    image:
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 7,
    name: "Skincare Organizer",
    price: 22.90,
    category: "Beauty",
    description:
      "A clean and practical organizer for keeping your skincare products tidy.",
    rating: 4.6,
    stock: 28,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: 8,
    name: "Modern LED Night Light",
    price: 18.90,
    category: "Home & Living",
    description:
      "A warm LED night light designed to create a relaxing atmosphere.",
    rating: 4.5,
    stock: 30,
    image:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
  },
];