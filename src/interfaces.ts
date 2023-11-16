export interface Product {
  id: number;
  price: number;
  title: string;
  images: string[];
  description: string;
  sizes: { name: string; quantity: number }[];
  colors: { name: string; hexCode: string; quantity: number }[];
  sizesDescription: string;
  brand: string;
  date: string;
  category: string;
}

export interface NavbarContentLinks {
  id: number;
  title: string;
  clothingType: string[];
}

export interface Card {
  product: {
    id: number;
    title: string;
    images: string[];
    price: number;
  };
  numImages?: number;
}
