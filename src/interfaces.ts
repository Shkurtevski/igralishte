export interface Product {
  id: string;
  price: string;
  title: string;
  images: string[];
  description: string;
  sizes: { name: string; quantity: string }[];
  colors: { name: string; hexCode: string; quantity: string }[];
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
    id: string;
    title: string;
    images: string[];
    price: string;
  };
  numImages?: number;
}
