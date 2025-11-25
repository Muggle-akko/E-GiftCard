import { BrandConfig } from './types';
import { Coffee, CupSoda, Gift, ShoppingBag, Utensils } from 'lucide-react';

export const BRANDS: BrandConfig[] = [
  {
    id: 'heytea',
    name: '喜茶 HEYTEA',
    colors: {
      primary: '#000000',
      secondary: '#E6E6E6',
      text: '#333333',
      accent: '#D4AF37', // Gold
      background: 'bg-gradient-to-br from-gray-100 to-gray-200',
    },
    icon: 'CupSoda',
    style: 'minimal',
  },
  {
    id: 'chagee',
    name: '霸王茶姬 CHAGEE',
    colors: {
      primary: '#1E3A8A', // Deep Blue
      secondary: '#BFDBFE',
      text: '#1E3A8A',
      accent: '#B91C1C', // Deep Red
      background: 'bg-gradient-to-br from-blue-50 to-blue-100',
    },
    icon: 'CupSoda',
    style: 'luxury',
  },
  {
    id: 'starbucks',
    name: 'Starbucks',
    colors: {
      primary: '#006241', // Starbucks Green
      secondary: '#D4E9E2',
      text: '#1F2937',
      accent: '#006241',
      background: 'bg-gradient-to-br from-green-50 to-emerald-100',
    },
    icon: 'Coffee',
    style: 'minimal',
  },
  {
    id: 'kfc',
    name: 'KFC',
    colors: {
      primary: '#EF4444', // Red
      secondary: '#FEE2E2',
      text: '#1F2937',
      accent: '#B91C1C',
      background: 'bg-gradient-to-br from-red-50 to-orange-50',
    },
    icon: 'Utensils',
    style: 'playful',
  },
  {
    id: 'jd',
    name: '京东 JD.com',
    colors: {
      primary: '#EF4444',
      secondary: '#FEE2E2',
      text: '#333333',
      accent: '#DC2626',
      background: 'bg-gradient-to-br from-red-100 to-red-200',
    },
    icon: 'ShoppingBag',
    style: 'minimal',
  },
  {
    id: 'general',
    name: '通用礼品 Generic',
    colors: {
      primary: '#4B5563',
      secondary: '#E5E7EB',
      text: '#1F2937',
      accent: '#6366F1',
      background: 'bg-gradient-to-br from-gray-50 to-slate-200',
    },
    icon: 'Gift',
    style: 'minimal',
  },
];

export const OCCASIONS = [
  '生日快乐',
  '感谢有你',
  '节日快乐',
  '一点心意',
  '工作顺利',
  '恭喜发财',
  '约个下午茶',
];

export const CARD_DIMENSIONS = {
  horizontal: { width: 600, height: 380 }, // Credit card ratio roughly
  vertical: { width: 380, height: 675 },   // 9:16 approx for phone screens
};