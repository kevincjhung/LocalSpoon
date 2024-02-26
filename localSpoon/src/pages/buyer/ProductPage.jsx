import { useParams } from 'react-router-dom';


export default function ProductPage() {
  const { productId } = useParams();

  // TODO: get product data from API

  // TODO: Build photos layout

  // TODO: Build product details layout



  return (
    <>
      <div className="product-page-image-section-container">
        <img className="product-page-main-image" src='https://picsum.photos/seed/3su9xh9a/300/300' />
        <div className='product-page-carousel-slider'>
          <img src='https://picsum.photos/seed/2su9xh9a/300/300' />
          <img src='https://picsum.photos/seed/4su9xh9a/300/300' />
          <img src='https://picsum.photos/seed/5su9xh9a/300/300' />
          <img src='https://picsum.photos/seed/3au9xh9a/300/300' />
          <img src='https://picsum.photos/seed/bsu9xh9a/300/300' />
          <img src='https://picsum.photos/seed/3zu9xh9a/300/300' />
          <img src='https://picsum.photos/seed/3sm9fh9a/300/300' />
          <img src='https://picsum.photos/seed/3su9xh0a/300/300' />
          <img src='https://picsum.photos/seed/Asu9xh9a/300/300' />
          <img src='https://picsum.photos/seed/Vsu9xh9a/300/300' />
        </div>
      </div>
      <div className="product-page-details-section-container">

      </div>
    </>
  );
}
