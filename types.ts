export type LayoutType = 'horizontal' | 'vertical';

export interface BrandConfig {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    background: string;
  };
  icon: string; // Using generic names for lucide-react icons or text mapping
  style: 'minimal' | 'playful' | 'luxury';
}

export interface CardData {
  brandId: string;
  code: string;
  value: string;
  sender: string;
  recipient: string;
  message: string;
  layout: LayoutType;
}

export interface GenerationConfig {
  occasion: string; // e.g., "Birthday", "Thank You", "Love"
  tone: string; // e.g., "Warm", "Professional", "Funny"
}