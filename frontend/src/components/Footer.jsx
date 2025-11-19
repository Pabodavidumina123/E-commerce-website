import React from 'react'
import { assets } from '../assets/assets'
const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <p className='w=full md:w-2/3 text-gray-600'>
                We are dedicated to offering high-quality products that blend style, comfort, and durability.  
                Our mission is to make your shopping experience smooth, trustworthy, and affordable.  
                Thank you for choosing us as your preferred online store.

            </p>
        </div>
        <div>
            <p className='text-x1 font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>

                <li>Home</li>
                <li>about us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>   
            </ul>
        </div>
        <div>
            <p className='text-x1 font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>071 7293695</li>
                <li>contact@foreveryou.com</li>

            </ul>
        </div>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>copyright 2024@foreveryou.com-All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer