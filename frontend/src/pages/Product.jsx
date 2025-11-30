import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');

  const fetchProductData = () => {
    // Use _id because Collection passes _id
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      console.log(product);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  if (!productData) return <div className='opacity-0'></div>;

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product data section */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Images section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((items, index) => (
              <img onClick={() => setImage(items)}
                key={index}
                src={items}
                alt=""
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img  className='w-full h-auto' src={image} alt=""/>

          </div>
         </div>
         {/*------Product information section------*/}
         
      </div>
    </div>
  ) 
};

export default Product;
