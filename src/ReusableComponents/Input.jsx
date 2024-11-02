import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  className,
  errorMessage,
  options, // For select options
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      ) : type === 'select' ? (
        <select
          id={name}
          name={name}
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className={`form-control ${errorMessage ? 'is-invalid' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      )}
      {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
    </div>
  );
};

export default Input;
