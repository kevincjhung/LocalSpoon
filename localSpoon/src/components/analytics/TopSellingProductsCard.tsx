import React, { useEffect, useState, useRef } from 'react'
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

// ! TODO: change name to past sales or smth
// TODO: change to bar chart
// TODO: fetch data from backend

interface TopSellingProductsCardProps {
  // Add any props if needed
}

const TopSellingProductsCard: React.FC<TopSellingProductsCardProps> = (props) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null); // To store the Chart instance


  useEffect(() => {
    // Destroy the existing Chart instance, if any
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a line chart using Chart.js
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      const data: ChartData = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      };

      const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data,
        options,
      });
    }

    // Cleanup: Destroy the Chart instance on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '200px', margin: 'auto' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default TopSellingProductsCard;