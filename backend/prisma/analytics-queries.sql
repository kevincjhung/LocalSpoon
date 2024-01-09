-- Total number of sales per month for a specific store (with store_id equal to 2), g
-- Grouping the results by truncated purchase months within the last 12 months
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
LIMIT 6


-- Revenue by month for a given store
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
--  Sales of given Month for a Given Store:
SELECT
    DATE_TRUNC('month', po.purchase_date) AS month,
    SUM(pr.price * poa.quantity) AS total_sales_amount
FROM "PurchaseOrderProductAssociation" AS poa
LEFT JOIN "PurchaseOrder" AS po
    ON poa.purchase_order_id = po.id
LEFT JOIN "Product" AS pr
    ON poa.product_id = pr.id AND pr.store_id = 1 -- Move condition to ON clause
WHERE DATE_TRUNC('month', po.purchase_date) = '2023-12-01' -- Replace with your desired month
GROUP BY month
ORDER BY month DESC;


-- GET /analytics/stores/sales 🚧
--   Sales of Past 7 Days for a Given Store:
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
WHERE pr.store_id = 5
GROUP BY poa.product_id
ORDER BY total_quantity DESC;

-- most revenue
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