
import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, icon, color, trend }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 transition-transform hover:scale-105 duration-200">
      <div className={`p-4 rounded-xl ${color} text-white`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {trend && <p className="text-xs text-green-600 mt-1 font-semibold">↑ {trend}</p>}
      </div>
    </div>
  );
};
