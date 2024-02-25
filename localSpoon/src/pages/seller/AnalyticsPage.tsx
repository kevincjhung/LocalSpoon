
import * as React from 'react';

import PastSalesByStoreLinechartCard from '../../components/analytics/PastSalesByStoreLinechartCard';
import TopSellingProductsByQuantityCard from '../../components/analytics/TopSellingProductsByQuantityCard';
import TopSellingProductsByRevenueCard from '../../components/analytics/TopSellingProductsByRevenueCard';
import PastSalesByMonth from '../../components/analytics/PastSalesByMonth';

export default function AnalyticsPage() {

  return (
    <div className="analytics-page-content">
      <div className="analytics-page-grid-container m-6">
        <div className="analytics-page-top-row">
          <PastSalesByStoreLinechartCard storeId={1}/>
        </div>
        <div className="analytics-page-bottom-row">
          <div className="analytics-bottom-container analytics-bottom-left">
            <TopSellingProductsByQuantityCard />
          </div>
          <div className="analytics-bottom-container">
            <PastSalesByMonth storeId={1}/>
          </div>
          <div className="analytics-bottom-container analytics-bottom-right">
            <TopSellingProductsByRevenueCard />
          </div>
        </div>
      </div>
    </div>
  )
}