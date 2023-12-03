export interface Product {
  id: string;
  slug: string;
  price: string;
  title: string;
  images: string[];
  description: string;
  sizes: { name: string; quantity: string }[];
  colors: { name: string; hexCode: string; quantity: string }[];
  sizesDescription: string;
  brand: string;
  material: string;
  lining: string;
  maintenance: string;
  condition: string;
  date: string;
  category: string;
  clothingType: string;
  isNew: boolean;
  isAccessory: boolean;
  isDiscounting: boolean;
}


export interface Accessory {
  id: string;
  slug: string;
  price: string;
  title: string;
  images: string[];
  description: string;
  colors: { name: string; hexCode: string; quantity: string }[];
  brand: string;
  material: string;
  maintenance: string;
  condition: string;
  date: string;
  type: string;
  new: boolean;
}

export interface NavbarContentLinks {
  id: number;
  title: string;
  clothingType: string[];
}

export interface Card {
  product: {
    slug: any;
    id: string;
    title: string;
    images: string[];
    price: string;
  };
  numImages?: number;
}
