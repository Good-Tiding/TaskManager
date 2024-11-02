import React from 'react';

const Card = ({ title, text, imageUrl, imageAlt, footer, children, className, ...props }) => {
  return (
    <div className={`${className}`} {...props}>
      {imageUrl && <img src={imageUrl} className="card-img-top" alt={imageAlt || 'Card image'} />}
      <div >
        {title && <h5 className="card-title">{title}</h5>}
        {text && <p className="card-text">{text}</p>}
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
