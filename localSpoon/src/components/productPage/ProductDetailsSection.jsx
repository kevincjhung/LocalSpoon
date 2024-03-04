// MateralUI libraries
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';

export default function ProductDetailsSection({ productId }){
  const [quantity, setQuantity] = useState(1); // State to manage quantity selection





  return(
    <div className="product-page-details-section-container">
      <Typography variant="h3">Product Name</Typography>
      <div className="product-page-store-price">
        <Typography variant="h5" className="product-page-store">
          The Croissant Store
        </Typography>
        <Typography variant="h6" className="product-page-price">
          $ 3223
        </Typography>
      </div>
      <Typography variant="p" className="produce-page-product-description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt impedit quae tempore, laborum ducimus pariatur aut sit ut vero veritatis facere consequuntur, sunt vitae dolore aliquam possimus aspernatur quod rerum! Quasi, nam! Quasi distinctio officiis animi pariatur doloremque? Aperiam mollitia nisi nulla harum officia deleniti labore laudantium voluptas sit rerum quam, illo repudiandae repellat tenetur architecto sunt nihil voluptatum quod eius voluptatem error assumenda. Unde quam illo, impedit quo necessitatibus vel? Labore consequuntur consequatur fuga!
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