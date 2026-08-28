export interface Category {
  value: string;
  label: string;
}

export const categories: Category[] = [
  { value: '', label: 'Select Area' },
  { value: 'art', label: 'Art and Photography' },
  { value: 'automotive', label: 'Automotive' },
  { value: 'beauty', label: 'Beauty and Makeup' },
  { value: 'business', label: 'Business' },
  { value: 'diversity', label: 'Diversity and Inclusion' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'finance', label: 'Finance' },
  { value: 'food', label: 'Food and Beverage' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'health', label: 'Health and Wellness' },
  { value: 'home', label: 'Home and Gardening' },
  { value: 'outdoor', label: 'Outdoor and Nature' },
  { value: 'parenting', label: 'Parenting and Family' },
  { value: 'pets', label: 'Pets' },
  { value: 'sports', label: 'Sports and Fitness' },
  { value: 'technology', label: 'Technology' },
  { value: 'travel', label: 'Travel' },
  { value: 'videography', label: 'Videography' },
];

export function getCategoryLabel(value?: string): string {
  return value != null
    ? (categories.find((category) => category.value === value)?.label ?? value)
    : '';
}
