/// <reference types="vite-plugin-svgr/client" />

import Lightning from '../assets/lightning.svg?react';
import '../styles/components/battery-info.css';

type BatteryInfoProps = {
  batteryLevel: number;
};

const BatteryInfo = ({ batteryLevel }: BatteryInfoProps) => {
  const percent = (batteryLevel / 100) * 20; // 20 to wysokość kontenera
  return (
    <div className="battery-info">
      <div className="battery-container">
        <div className="battery-cap"></div>
        <Lightning width={12} height={12} fill="#cacfd9" />
        <div
          className="battery-indicator"
          id="battery-indicator"
          style={{ height: percent }}
        />
      </div>
      <p>Time left</p>
    </div>
  );
};

export default BatteryInfo;
