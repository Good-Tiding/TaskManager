import React from 'react';

const Button = ({
  type = 'button',
  variant='secondary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  className = '',

  ...props
}) => {

  const classNames = `btn btn-${variant} btn-${size} ${className}`;


  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
{/* <Button type="submit">Sign Up</Button>
Here, Sign Up is the children of the Button component. Inside the Button component, you can access this children prop and render it where you want. */}
    </button>
  );
};

export default Button;
