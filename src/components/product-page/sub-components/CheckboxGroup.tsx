import React from "react";

interface CheckboxGroupProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  checked,
  onChange,
}) => {
  return (
    <div className="form-group">
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default CheckboxGroup;
