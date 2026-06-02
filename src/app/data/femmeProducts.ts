// Real Femme Connection product data extracted from femmeconnection.com.au
import kp510194 from "../../imports/kp510194_1_v1639125494525318380_750x750_1.jpg";
import kp522820 from "../../imports/kp522820_1_v1639125499266696291_750x750_1.jpg";
import kp525751 from "../../imports/kp525751_1_v1639125498561133729_750x750_1.jpg";
import kp525903 from "../../imports/kp525903_1_v1639125496333876102_750x750_1.jpg";
import kp734239 from "../../imports/kp734239_1_v1639125494834433804_750x750_1.jpg";
import kp734293 from "../../imports/kp734293_1_v1639125496755888385_750x750_1.jpg";

export interface FemmeProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  priceAUD: string;
  category: string;
  image: string;
  colour?: string;
  sizes?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
}

export const femmeProducts: FemmeProduct[] = [
  {
    id: "kp510194",
    name: "Doretta Wool Blend Knit Pullover",
    sku: "KP510194",
    price: 59.99,
    priceAUD: "$59.99",
    category: "Knitwear",
    image: kp510194,
    colour: "Cream",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 45,
    rating: 4.5,
    reviews: 28,
  },
  {
    id: "kp522820",
    name: "Kalinda Abstract Print Dress",
    sku: "KP522820",
    price: 89.99,
    priceAUD: "$89.99",
    category: "Dresses",
    image: kp522820,
    colour: "Multi",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 32,
    rating: 4.8,
    reviews: 42,
  },
  {
    id: "kp525751",
    name: "Luxe Linen Wrap Top",
    sku: "KP525751",
    price: 65.00,
    priceAUD: "$65.00",
    category: "Tops",
    image: kp525751,
    colour: "Olive",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 28,
    rating: 4.6,
    reviews: 35,
  },
  {
    id: "kp525903",
    name: "Royce Embroidered Midi Dress",
    sku: "KP525903",
    price: 95.00,
    priceAUD: "$95.00",
    category: "Dresses",
    image: kp525903,
    colour: "White",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 18,
    rating: 4.9,
    reviews: 56,
  },
  {
    id: "kp734239",
    name: "Marrakesh Floral Maxi Dress",
    sku: "KP734239",
    price: 99.00,
    priceAUD: "$99.00",
    category: "Dresses",
    image: kp734239,
    colour: "Navy Floral",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 24,
    rating: 4.7,
    reviews: 48,
  },
  {
    id: "kp734293",
    name: "Femme Basics Cashmere-Touch Knit",
    sku: "KP734293",
    price: 75.00,
    priceAUD: "$75.00",
    category: "Basics",
    image: kp734293,
    colour: "Charcoal",
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 52,
    rating: 4.8,
    reviews: 64,
  },
];

// Category performance data
export const categoryPerformance = [
  {
    category: "Dresses",
    revenue: 245680,
    units: 2840,
    margin: 58,
    returnRate: 12,
    restockRate: 8,
  },
  {
    category: "Knitwear",
    revenue: 186420,
    units: 2140,
    margin: 62,
    returnRate: 8,
    restockRate: 12,
  },
  {
    category: "Tops",
    revenue: 142890,
    units: 1980,
    margin: 54,
    returnRate: 10,
    restockRate: 6,
  },
  {
    category: "Pants",
    revenue: 98760,
    units: 1120,
    margin: 52,
    returnRate: 18,
    returnRate: 14,
  },
  {
    category: "Basics",
    revenue: 128450,
    units: 1680,
    margin: 64,
    returnRate: 6,
    restockRate: 15,
  },
  {
    category: "Accessories",
    revenue: 45280,
    units: 840,
    margin: 68,
    returnRate: 4,
    restockRate: 3,
  },
];

// Top performing products
export const topProducts = [
  {
    name: "Royce Embroidered Midi Dress",
    sku: "KP525903",
    revenue: 42560,
    units: 448,
    margin: 59,
    image: kp525903,
  },
  {
    name: "Marrakesh Floral Maxi Dress",
    sku: "KP734239",
    revenue: 38720,
    units: 391,
    margin: 61,
    image: kp734239,
  },
  {
    name: "Kalinda Abstract Print Dress",
    sku: "KP522820",
    revenue: 35280,
    units: 392,
    margin: 57,
    image: kp522820,
  },
  {
    name: "Femme Basics Cashmere-Touch Knit",
    sku: "KP734293",
    revenue: 32400,
    units: 432,
    margin: 64,
    image: kp734293,
  },
];
