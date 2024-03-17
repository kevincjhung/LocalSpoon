// MateralUI libraries
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

// React
import { useEffect, useState } from 'react';

// Libraries
import axios from 'axios'



export default function ProductDetailsSection({ productId }){
  const [quantity, setQuantity] = useState(1); 
  const [productData, setProductData] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${productId}`);
        const product = response.data;
        // console.log(product[0])
        setProductData(product[0]);

      } catch(error) {
        console.error(error)  
      }
    }

    fetchData();
    
    return () => {
      
    };
  }, [])



  return(
    <div className="product-page-details-section-container">
      <Typography variant="h3">{productData.name}</Typography>
      <div className="product-page-store-price">
        <Typography variant="h5" className="product-page-store">
          {productData.store_name}
        </Typography>
        <Typography variant="h6" className="product-page-price">
          $ {productData.price} 
        </Typography>
      </div>
      <Typography variant="p" className="produce-page-product-description">
        {productData.description.substr(0, 150) + "..."}
      </Typography>
      <div className="product-page-purchase-controls">
      <Select
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          displayEmpty 
        >
          {[...Array(10)].map((_, index) => (
            <MenuItem key={index} value={index + 1}>{index + 1}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="primary">Add to Cart</Button>
      </div>
    </div>
  )
}