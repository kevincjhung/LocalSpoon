import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

type Product = {
  product_id: number;
  name: string;
  price: number;
  description: string;
  total_quantity: number;
  total_revenue: number;
};

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}


export default function TopSellingProductsByRevenueCard() {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/analytics/stores/1/top-revenue-products`);
        // Extract relevant data from the response
        const products: Product[] = response.data;
        const labels = products.map((product) => product.name);
        const data = products.map((product) => product.total_revenue);

        // Update the state with the chart data
        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], // You can customize the colors
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  useEffect(() => {
    // Destroy existing Chart instance if it exists
    const existingChart = Chart.getChart('topSellingProductsByRevenue');
    if (existingChart) {
      existingChart.destroy();
    }

    // Create and render the doughnut chart
    const ctx = document.getElementById('topSellingProductsByRevenue') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
    });
  }, [chartData]);

  return (
    <div className="analytics-top-selling-products-card ">
      <h1>Top Selling Products By Revenue</h1>
      <canvas id="topSellingProductsByRevenue"></canvas>
    </div>
  );
}