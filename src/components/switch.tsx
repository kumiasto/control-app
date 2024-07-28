import React from 'react';
import classNames from 'classnames';
import '../styles/components/switch.css';

type SwitchProps = {
  id: string;
  label: string;
  onChange: () => void;
  checked?: boolean;
  error?: boolean;
};

export const Switch = ({
  id,
  label,
  onChange,
  checked = false,
  error,
}: SwitchProps) => {
  const handleChange = () => {
    if (onChange) {
      onChange();
    }
  };

  return (
    <label
      htmlFor={id}
      className={classNames(['switch', error && 'error-container'])}
    >
      <div className='label'>
        <span id={`label-${id}`}>{label}</span>
      </div>
      <input
        id={id}
        type='checkbox'
        role='switch'
        checked={checked}
        onChange={handleChange}
        aria-checked={checked}
        aria-labelledby={`label-${id}`}
        data-testid='switch'
        className={classNames([error && 'error'])}
      />
    </label>
  );
};
