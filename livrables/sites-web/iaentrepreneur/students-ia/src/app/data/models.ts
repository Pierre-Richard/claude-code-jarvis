export interface Expert {
  name: string;
  role: string;
  experienceYears: number;
  expertise: string;
  sectors: string[];
  langs: string;
  rating: number;
  dailyRate: number;
}

export interface Mission {
  title: string;
  description: string;
}

export interface Step {
  title: string;
  description: string;
}

export interface ValueProp {
  icon: string;
  title: string;
  description: string;
}

export interface Sector {
  icon: string;
  name: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Plan {
  name: string;
  price: string;
  priceNote: string;
  caption: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}
