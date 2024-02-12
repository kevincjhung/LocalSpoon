-- Get the photos of products and associated store info
SELECT "Product".name, "Product".description, "ProductPhoto".resource_url, 
"Store".id AS store_id, "Store".store_name AS store_name, "Store".store_description AS store_description
FROM "Product"
LEFT JOIN "ProductPhoto" ON "Product".id = "ProductPhoto".product_id
LEFT JOIN "Store" ON "Store".id = "Product".store_id
