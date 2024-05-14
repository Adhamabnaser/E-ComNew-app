import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useQuery } from 'react-query';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
export default function HomeCatSlider() 
{
    async function AllCategory() 
    {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
    const {data , isLoading} =  useQuery('allCategory', AllCategory,
        {
            cacheTime:10000,
            refetchOnMount:false,
            // refetchInterval:3000,
            // staleTime:3000
        }
    )
    console.log(data?.data?.data , isLoading);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:  6,
        slidesToScroll: 1,
      };

      if (isLoading) 
        {
          return<>
          <div className='h-screen w-full flex justify-center items-center'>
            <InfinitySpin
                visible={true}
                width="200"
                color="black"
                ariaLabel="infinity-spin-loading"
                />
           </div>
          </>
        }
  return <>
   <Slider {...settings}>
        {
          data?.data?.data?.map((item , index) =>{
            return<div key={index}>
            <img className='mx-auto w-full lg:h-56 xs:h-24'  src={item.image} alt="Name_Of_Category" />
            <h6 className='text-center pt-2 text-pretty'>{item.name.split(' ').slice(0,1).join(' ')}</h6>
            </div>
          })
        }
    </Slider>
  
  </>
}
