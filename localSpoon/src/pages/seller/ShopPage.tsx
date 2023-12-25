import { useParams } from 'react-router-dom';

export default function ShopPage(){
  const { shopID } = useParams();

  return (
    <div>
      <p>Page For Shop id: "{shopID}" is under construction</p>
    </div>
  )
}