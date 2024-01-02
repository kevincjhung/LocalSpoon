// Fake data imports
import topSellingProductsExample from "../../utils/fakedata";

// Library imports
import { useEffect, FC, useRef } from 'react';
import * as Plot from '@observablehq/plot';

interface Product {
  productName: string;
  amount: number;
}


const TopSellingProducts: FC = () => {
	const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
			const sortedTopSellingProducts = [...topSellingProductsExample].sort(
        (a: Product, b: Product) => {
          return b.amount - a.amount;
        }
      );


      const plot = Plot.plot({
        marginBottom: 150,
        marginLeft: 150,
        x: {
          tickRotate: -30,
					label: "Product Name",
					
					
        },
        y: {
          label: "Sales Amount",
          grid: true,
        },
        marks: [
          Plot.ruleY([0]),
          Plot.barY(sortedTopSellingProducts, {
            x: 'productName',
            y: 'amount',
            fill: 'steelblue',
            title: 'Top Selling Products',
          }),
        ],
      });

      chartContainerRef.current.appendChild(plot);
    }
  }, []);

  return <div ref={chartContainerRef}></div>;
};

export default TopSellingProducts;
