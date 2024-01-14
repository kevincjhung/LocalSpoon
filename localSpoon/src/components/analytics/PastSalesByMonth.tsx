import React, { useEffect, useState, useRef } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';
import axios from 'axios';

interface PastSalesByMonthProps {
  storeId: number;
}

interface SalesDataItem {
  month: string;
  total_sales_amount: number;
}

const PastSalesByMonth: React.FC<PastSalesByMonthProps> = ({ storeId }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const [pastSalesData, setPastSalesData] = useState<SalesDataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SalesDataItem[]>(`http://localhost:3000/api/analytics/stores/${storeId}/sales-by-month?numberOfMonths=6`);
        
        // parse through the response, reformat the date as YYYY-MM
      response.data.map((item) => {
      const [year, month] = item.month.split('-');
      return {
        ...item,
        month: `${year}-${month}`,
      };
    });

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
        labels: pastSalesData.map((item) => item.month),
        datasets: [
          {
            label: 'Sales By Month',
            data: pastSalesData.map((item) => item.total_sales_amount),
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            fill: true,
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

      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data,
          options,
        });
      }
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
      <h2>Sales By Month</h2>
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default PastSalesByMonth;