export interface Product {
  id: string;
  slug: string;
  price: string;
  title: string;
  images: string[];
  description: string;
  sizes: { name: string; quantity: string }[];
  colors: { name: string; hexCode: string; quantity: string }[];
  quantity: string;
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
  isFavorite: boolean;
  isAddedToCard: boolean;
}

export interface Brand {
  id: string;
  brand: string;
  image: string;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
  fourthContent: string;
  fifthContent: string;
  sixthContent: string;
  seventhContent: string;
}

export interface About {
  id: string;
  title: string;
  image: string;
  contentTitle: string;
  descriptionOne: string;
  descriptionTwo: string;
  descriptionThree: string;
}

export interface ContactInfo {
  title: string;
  image: string;
  contentTitle: string;
  description: string;
  adress: string;
  numberTitle: string;
  number: string;
  workHoursTitle: string;
  monFriWorkingHours: string;
  satWorkingHours: string;
}

export interface FooterContentLinks {
  id: string;
  firstContent: string;
  secondContent: string;
  thirdContent: string;
  fourthContent: string;
  fifthContent: string;
  sixthContent: string;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  picture: File | null;
  address: string;
  bio: string;
  subscribe: boolean;
  isLoggedIn: boolean;
}

export interface NavbarContentLinks {
  id: number;
  title: string;
  clothingType: string[];
  brands: string[];
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
  onClick?: () => void;
}
