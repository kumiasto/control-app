import React from 'react';
import classNames from 'classnames';
import '../styles/components/progress-bar.css';

type ProgressBarProps = {
  steps: number;
  currentStep: number;
};

export const ProgressBar = ({ steps, currentStep }: ProgressBarProps) => {
  return (
    <div className='progress-bar'>
      {Array.from(Array(steps)).map((_, index) => (
        <div
          key={index + currentStep}
          className={classNames([
            'progress-item',
            currentStep >= index && 'active',
          ])}
          data-testid='progress-item'
        />
      ))}
    </div>
  );
};
