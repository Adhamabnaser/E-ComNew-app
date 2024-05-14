import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomeSlider() 
{
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows:false
      };
  return <>
   <Slider {...settings}>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full' src={require('../image/AI-5.webp')} alt="product"/>
      </div>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full ' src={require('../image/How-AI-is-transforming-3D-product-design.webp')} alt="product"/>
      </div>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full' src={require('../image/The-future-of-product-design-–-how-artificial-intelligence-is-changing-the-game-cover.jpg')} alt="product"/>
      </div>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full' src={require('../image/how-AI-is-revolutionising-3D-product-design-ideas.webp')} alt="product"/>
      </div>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full' src={require('../image/maxresdefault.jpg')} alt="product"/>
      </div>
      <div className='rounded-full'>
        <img style={{width:'100%' , height:'400px'}} className='w-20 h-20 rounded-full' src={require('../image/pexels-karolina-grabowska-4041392.jpg')} alt="product"/>
      </div>
    </Slider>
  
  </>
}

