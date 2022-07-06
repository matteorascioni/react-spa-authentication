import React from 'react';

const Button = ({
    onClick, 
    children,
    type,
    className,
}) => {
    return (
        <button 
            onClick={onClick}
            className={className}
            type={type}
        >
            {children}            
        </button>
    )
}

export default Button;