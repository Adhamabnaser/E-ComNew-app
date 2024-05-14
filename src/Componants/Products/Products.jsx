import React, { useContext } from 'react'
import {ShoppingBasket, Star } from 'lucide-react';
import Footer from './../Footer/Footer';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import HomeCatSlider from '../HomeCategorySlider/HomeCatSlider';
import { useNavigate } from 'react-router-dom';
import { Cartext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import CartIcon from '../CartOfProduct/CartIcon';
import { PiHeartFill } from 'react-icons/pi';
export default function Products() 
{
    const {addProductToCart} = useContext(Cartext)

    const navigate =  useNavigate()
     async function AllProducts() 
    {
      return await axios.get('https:ecommerce.routemisr.com/api/v1/products')
    }
    const {isLoading, data } =  useQuery('allProduct',AllProducts,
    {
      cacheTime:3000,
      refetchInterval:3000
    })

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

    async function AddToCart(productId) 
    {   
        const res =  await addProductToCart(productId)
        console.log(res);
        if (res.status === 'success') 
          {

            toast(res.message,
            {
              icon: '🛒',
              style: {
                borderRadius: '6px',
                background: 'white',
                color: 'black',
                border: '1px solid black',
                fontFamily:'monospace'
              },
            }
          );
          }
          else{
            toast('Error Happen',
              {
                icon: '🛒',
                style: {
                  borderRadius: '6px',
                  background: 'white',
                  color: 'black',
                  border: '1px solid black',
                  fontFamily:'monospace'
                },
              }
            );
          }
    }


  return<>
  <div className='fixed bottom-6 z-10 right-6'>
    <CartIcon/>
  </div>
      <div className='pb-10 pt-5 px-8 cursor-pointer m-5'>
        <div className=' grid grid-cols-12' >
          <div className='lg:col-span-9 xs:col-span-12 rounded-full '>
              <HomeSlider/>
          </div>
          <div className='lg:col-span-3 xs:col-span-12 lg:pt-0 xs:pt-10 lg:p-0'>
            <div>
              <img style={{height:'200px'}} className='w-full rounded-full' src={require('../image/pexels-karolina-grabowska-4041392.jpg')} alt="asverts"/> 
            </div>
            <div>
              <img style={{height:'200px'}} className='w-full rounded-full' src={require('../image/How-AI-is-transforming-3D-product-design.webp')} alt="asverts"/> 
            </div>
          </div>
        </div>
      </div> 

      <div className='mb-8 m-10 ' >
        
          <HomeCatSlider/>

      </div>

        <div className='container'>
        <div className='flex justify-center'>
        <h2 className='text-center text-3xl my-4 px-10 py-1 rounded-tr-full rounded-bl-full border border-black'>Products</h2> 
        </div>  
        <section>
          <div className='product border rounded-md' >
            <div className=' cards grid md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2 gap-5 p-10'>

      

              { data?.data?.data.map( function (product , idx) {
                return <div key={idx} className='border border-slate-50 rounded-md bg-slate-50 hover:bg-slate-100 cursor-pointer'>
                         <div  onClick={()=>navigate(`/productdetails/${product.id}`)} className='card px-5 pt-5 relative '>
                            <div className='image'>
                                    <img className='rounded-full' src={product.imageCover} alt="product" loading='lazy'/>
                            </div>
                            <div className='title'>
                                            <p className='main_title font-bold text-center pt-1'> {product.category.name}</p>
                                            <p className='sub_title text-center'>{product.title.split(' ').slice(0,2).join(' ')}</p>
                                            <p className='sub_title text-center'>Price <span className='font-extrabold'>:</span> {product.price} EGP </p>
                             </div>
                             <div className='badge absolute top-4 border border-black rounded-md px-3 flex opacity-10 hover:opacity-100'>
                                            <span className='font-semibold text-lg cursor-default'>{product.ratingsAverage} </span><span className='mt-1 ps-1'><Star size={23} strokeWidth={1.5} /></span>
                               </div>         
                             <div className='badge absolute top-4 right-4 p-1 rounded-full'>
                                            <span className='text-xl'><PiHeartFill /></span>
                               </div>           
                            </div> 
                            <div className='button pt-2 flex justify-center px-10 pb-3'> 
                              <button onClick={()=>AddToCart(product.id)}
                                className='border border-black w-full py-1 hover:bg-black hover:text-slate-200 rounded-lg flex justify-center gap-3'>
                                     Add <ShoppingBasket strokeWidth={1} />                              
                              </button>
                            </div>
                       </div>
                
              })}          


            </div>
          </div>
        </section>
          
      </div>
  

    
   <div className='footer broder border-t mt-10'>
    <Footer/>
   </div>
  </>
}
