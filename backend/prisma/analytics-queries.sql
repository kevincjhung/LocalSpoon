-- /api/analytics/stores/2/top-selling-products?year=2022
-- Top Selling Products

-- /api/analytics/stores/{storeId}/purchase-orders-count-by-month.
-- Endpoint for Purchase Orders Count by Month:


-- ✅ Total number of purchase orders per month for a given store 
-- results grouped by months within the last 12 months
SELECT
    DATE_TRUNC('month', po.purchase_date) AS month,
    COUNT(*) AS "Number Of Purchase Orders"
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 1
GROUP BY month
ORDER BY month desc
LIMIT 12


-- ✅ Revenue by month for a given store
-- for the last XX months
SELECT
    DATE_TRUNC('month', po.purchase_date) AS month,
    SUM(pr.price * poa.quantity) AS total_sales_amount
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 1
GROUP BY month
ORDER BY month desc


--  GET /analytics/stores/sales 🚧
--  Sales of a single specific Month for a Given Store:
SELECT
    DATE_TRUNC('month', po.purchase_date) AS month,
    SUM(pr.price * poa.quantity) AS total_sales_amount
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id AND pr.store_id = 1 -- Move condition to ON clause
WHERE DATE_TRUNC('month', po.purchase_date) = '2023-11-01' -- Replace with your desired month
GROUP BY month
ORDER BY month DESC;


-- ✅ GET /analytics/stores/sales 🚧
--   Sales of Past 7/14/30 Days for a Given Store:
SELECT
    DATE_TRUNC('day', po.purchase_date) AS day,
    SUM(pr.price * poa.quantity) AS total_sales_amount
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id AND pr.store_id = 1 -- Move condition to ON clause
WHERE pr.store_id = 1
    AND po.purchase_date >= CURRENT_DATE - INTERVAL '14 days' -- Filter for the past 7 days
GROUP BY day
ORDER BY day DESC;


-- GET /analytics/stores/top-selling-products 🚧
-- Top Selling Products for a Given Store with Quantity:
SELECT
    poa.product_id,
    SUM(poa.quantity) AS total_quantity
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 2
GROUP BY poa.product_id
ORDER BY total_quantity DESC;

-- GET /analytics/stores/top-selling-products-for-year 🚧
-- Top Selling Products for a Given Store with Quantity for a Specific Year:
SELECT
    poa.product_id,
    SUM(poa.quantity) AS total_quantity
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 1
    AND EXTRACT(YEAR FROM po.purchase_date) = 2023 -- Replace with your desired year
GROUP BY poa.product_id
ORDER BY total_quantity DESC;


-- Products that generated the most revenue for a given store
SELECT
    poa.product_id,
    SUM(poa.quantity) AS total_quantity,
    MAX(pr.price * poa.quantity) AS highest_total_price
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 2
GROUP BY poa.product_id
ORDER BY total_quantity DESC;


-- GET /analytics/stores/top-selling-products-for-year 🚧
-- Top Selling Products with Highest Total Price for a Given Store and Specific Year:
SELECT
    poa.product_id,
    SUM(poa.quantity) AS total_quantity
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id
WHERE pr.store_id = 2
    AND EXTRACT(YEAR FROM po.purchase_date) = 2022 -- Replace with your desired year
GROUP BY poa.product_id
ORDER BY total_quantity DESC;



