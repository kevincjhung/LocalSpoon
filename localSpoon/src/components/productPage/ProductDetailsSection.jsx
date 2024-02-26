import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';

export default function ProductDetailsSection({ productId }){

  
  // TODO: take the productId, use it to fetch the product details from the API




  return(
    <div className="product-page-details-section-container">
      <Typography variant="h5">Product Name</Typography>
      <Typography variant="h5">Store</Typography>
      <Typography variant="h5">Price</Typography>
    </div>
  )
}