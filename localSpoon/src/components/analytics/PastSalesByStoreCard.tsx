import React, { useEffect, useState, useRef } from 'react'
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import axios from "axios"


interface TopSellingProductsCardProps {
  storeId: number;
}

interface SalesDataItem {
  day: string;
  total_sales_amount: number;
}

const TopSellingProductsCard: React.FC<TopSellingProductsCardProps> = ({ storeId }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [pastSalesData, setPastSalesData] = useState<SalesDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: StoreId is hardcoded for now, replace after auth is implemented
        const response = await axios.get<SalesDataItem[]>(`http://localhost:3000/api/analytics/stores/1/sales?numberOfDays=180`);
        console.log(response.data);
        setPastSalesData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current?.getContext('2d');

    if (ctx && pastSalesData.length > 0) {
      const data: ChartData = {
        labels: pastSalesData.map((item) => item.day),
        datasets: [
          {
            label: 'Sales of The Past Year',
            data: pastSalesData.map((item) => item.total_sales_amount),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
            pointStyle: false,
          },
        ],
      };

      const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      };

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',
        data,
        options,
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [storeId, pastSalesData.length]);

  if (!pastSalesData.length) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: '100%', height: '200px', margin: 'auto' }}>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default TopSellingProductsCard;