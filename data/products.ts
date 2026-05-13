export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  brand: string;
  category: string;
  size: string;
  colors: string[];
  image: string;
  condition: "Nuevo con etiqueta" | "Como nuevo" | "Muy bueno" | "Bueno";
  location: string;
  featured: boolean;
};

export const products: Product[] = [
  {
    id: "prd_001",
    name: "Blazer lana vintage",
    slug: "blazer-lana-vintage",
    description: "Silueta estructurada, forro intacto y botones originales.",
    price: 189000,
    stock: 1,
    brand: "Massimo Dutti",
    category: "Chaquetas",
    size: "M",
    colors: ["Negro", "Gris"],
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    condition: "Muy bueno",
    location: "Bogota",
    featured: true
  },
  {
    id: "prd_002",
    name: "Bolso cuero mini",
    slug: "bolso-cuero-mini",
    description: "Cuero granulado, formato compacto y correa ajustable.",
    price: 245000,
    stock: 1,
    brand: "Coach",
    category: "Accesorios",
    size: "Unica",
    colors: ["Cafe"],
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=900&q=80",
    condition: "Como nuevo",
    location: "Medellin",
    featured: true
  },
  {
    id: "prd_003",
    name: "Camisa lino relajada",
    slug: "camisa-lino-relajada",
    description: "Lino liviano con caida suave para looks de verano.",
    price: 79000,
    stock: 2,
    brand: "Zara",
    category: "Camisas",
    size: "S",
    colors: ["Blanco"],
    image:
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=80",
    condition: "Bueno",
    location: "Cali",
    featured: false
  },
  {
    id: "prd_004",
    name: "Denim recto premium",
    slug: "denim-recto-premium",
    description: "Corte recto, tiro alto y desgaste natural.",
    price: 132000,
    stock: 1,
    brand: "Levi's",
    category: "Denim",
    size: "28",
    colors: ["Azul"],
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    condition: "Muy bueno",
    location: "Bogota",
    featured: true
  }
];

export const currencyFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0
});
