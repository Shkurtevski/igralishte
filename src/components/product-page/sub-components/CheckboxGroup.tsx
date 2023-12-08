import React from "react";

interface CheckboxGroupProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  checked,
  onChange,
  count,
}) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={name}>
          {label} {count !== undefined && `(${count})`}
        </label>
      </div>
    </React.Fragment>
  );
};

export default CheckboxGroup;
