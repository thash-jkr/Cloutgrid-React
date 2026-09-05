import { categories } from '@/utils/categories';

interface CategoryModalProps {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const CategoryModal = ({ selectedValue, onSelect }: CategoryModalProps) => {
  return (
    <div className="flex flex-wrap gap-2 p-3">
      {categories
        .filter((category) => category.value !== '')
        .map(({ value, label, icon: Icon }) => {
          const isSelected = value === selectedValue;

          return (
            <button
              key={value}
              onClick={() => onSelect(value)}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold
                transition-colors duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:bg-slate-50'
                }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {label}
            </button>
          );
        })}
    </div>
  );
};

export default CategoryModal;