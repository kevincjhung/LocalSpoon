import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import ProductImageSection from '../../components/productPage/ProductImageSection';
import ProductDetailsSection from '../../components/productPage/ProductDetailsSection';

export default function ProductPage() {
  const { productId } = useParams();
  


  return (
    <div className="product-page-container">
      <ProductImageSection productId={ productId } />
      <ProductDetailsSection productId={ productId } />
    </div>
  );
}
