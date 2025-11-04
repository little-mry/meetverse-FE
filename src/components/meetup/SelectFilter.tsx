import { memo } from 'react';


export type Option = {
  value: string;
  label: string;
};


type SelectFilterProps = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
};


const SelectFilter = memo(function SelectFilter({
  value,
  options,
  onChange,
  placeholder = 'Välj...',
  label,
  className = '',
  disabled = false,
}: SelectFilterProps) {
  return (
    <div className={className}>
      {label ? <span className="sr-only">{label}</span> : null}


      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="p-2 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none w-full sm:w-44"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});


export default SelectFilter;