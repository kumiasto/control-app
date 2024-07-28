import React from 'react';
import classNames from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactNode } from 'react';
import '../styles/components/button.css';

type ButtonProps = {
  disabled?: boolean;
  icon?: ReactNode;
  label?: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
  disabled,
  icon,
  label,
  type = 'button',
  title,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classNames(['button', className, disabled && 'disabled'])}
      type={type}
      disabled={disabled}
      onClick={onClick}
      title={title}
      data-testid='button'
      {...props}
    >
      {Boolean(label) && <div className='label'>{label}</div>}
      {Boolean(icon) && <div className='icon'>{icon}</div>}
    </button>
  );
};
