import {
  Palette,
  Car,
  Gem,
  Building2,
  HeartHandshake,
  Lightbulb,
  Drama,
  Shirt,
  Landmark,
  UtensilsCrossed,
  Gamepad2,
  HeartPulse,
  Home,
  Trees,
  Baby,
  PawPrint,
  Dumbbell,
  Cpu,
  Plane,
  Video,
  type LucideIcon,
} from 'lucide-react';

export interface Category {
  value: string;
  label: string;
  icon?: LucideIcon;
}

export const categories: Category[] = [
  { value: '', label: 'Select Area' },
  { value: 'art', label: 'Art and Photography', icon: Palette },
  { value: 'automotive', label: 'Automotive', icon: Car },
  { value: 'beauty', label: 'Beauty and Makeup', icon: Gem },
  { value: 'business', label: 'Business', icon: Building2 },
  { value: 'diversity', label: 'Diversity and Inclusion', icon: HeartHandshake },
  { value: 'education', label: 'Education', icon: Lightbulb },
  { value: 'entertainment', label: 'Entertainment', icon: Drama },
  { value: 'fashion', label: 'Fashion', icon: Shirt },
  { value: 'finance', label: 'Finance', icon: Landmark },
  { value: 'food', label: 'Food and Beverage', icon: UtensilsCrossed },
  { value: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { value: 'health', label: 'Health and Wellness', icon: HeartPulse },
  { value: 'home', label: 'Home and Gardening', icon: Home },
  { value: 'outdoor', label: 'Outdoor and Nature', icon: Trees },
  { value: 'parenting', label: 'Parenting and Family', icon: Baby },
  { value: 'pets', label: 'Pets', icon: PawPrint },
  { value: 'sports', label: 'Sports and Fitness', icon: Dumbbell },
  { value: 'technology', label: 'Technology', icon: Cpu },
  { value: 'travel', label: 'Travel', icon: Plane },
  { value: 'videography', label: 'Videography', icon: Video },
];

export function getCategoryLabel(value?: string): string {
  return value != null
    ? (categories.find((category) => category.value === value)?.label ?? value)
    : '';
}

export function getCategoryIcon(value?: string): LucideIcon | undefined {
  return categories.find((category) => category.value === value)?.icon;
}

export function checkLabel(value: string): boolean {
  return value.trim() !== "" && categories.some((category) => category.label === value);
}