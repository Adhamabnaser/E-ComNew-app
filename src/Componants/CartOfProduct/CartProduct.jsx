import React, { useContext, useEffect } from 'react'
import { GiShoppingCart, GiTakeMyMoney } from "react-icons/gi";
import { PiListNumbersThin } from "react-icons/pi";
import { TbMoneybag } from "react-icons/tb";
import { HiArrowSmRight, HiOutlineTrash } from "react-icons/hi";
import Footer from '../Footer/Footer';
import { Cartext } from '../Context/CartContext';
import { CircleMinus, CirclePlus, Link } from 'lucide-react';
// import { InfinitySpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function CartProduct() 
{
  const { updateCountProduct,numOfCartItems ,totalPrice ,cartProduct,deleteProduct,clearAllCart} = useContext(Cartext)
  const navigate =  useNavigate()
  // if (cartProduct===null) 
  //   {
  //     return<>
  //     <div className='h-screen w-full flex justify-center items-center'>
  //     <InfinitySpin
  //       visible={true}
  //       width="200"
  //       color="black"
  //       ariaLabel="infinity-spin-loading"
  //       />
  //   </div>
  //     </>
  //   }
   
  async function deleteProductFromCart(id) 
  {
    await deleteProduct(id)
  }
  async function clearCart() 
  {
    await clearAllCart()
  }

  async function updateCounter(productId , count) 
  {
      const res = await updateCountProduct(productId , count)
      console.log(res);
      if (res.status === 'success')
        {
          toast('Updated Successfully ',
          {
          icon: '✔',
          style: {
              borderRadius: '6px',
              background: 'white',
              color: 'black',
              border: '1px solid black',
              fontFamily:'monospace'
          },
          }
        );
        if (count===0) {
          deleteProductFromCart(productId)
        }
        }else
        {
          toast('Error Ouccerd ',
          {
          icon: '✖',
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
  
  return <>
 
        <div className="cart-product lg:m-16 xs:m-2">
         <div className='mt-12 rounded-xl shadow-xl pb-10'>
            <div className='flex flex-col items-center pt-5'>
                <h2 className='text-2xl font-mono flex justify-center'>Shop Cart <div className='pt-1 ps-1'><GiShoppingCart/></div></h2>
                <div style={{width:'170px'}} className='border border-b-black shadow-2xl mt-3'></div>
            </div>
            {numOfCartItems === 0 ? 
            <>
             <div className='w-full flex justify-center h-96'>
             <div style={{maxHeight:'300px',maxWidth:'300px'}} className='p-8'>
               <img  className='w-full' src={require('../image/preview.png')} alt='Not Item In Cart' loading='lazy'/>
                <h2 className='text-2xl font-mono text-center shadow-lg'>No Items In Cart</h2>
                <p onClick={()=>navigate('/product')} className='text-center cursor-pointer font-mono pt-3'>Get Some Product...</p>
              </div>
             </div>
            </> :
            <>
            <div className='Cart-Item'>
              <div className='grid grid-cols-12 pt-4'>
                  <div className='lg:col-span-8 md:col-span-8 sm:col-span-12 xs:col-span-12 lg:ps-10 xs:ps-2 flex lg:justify-start sm:justify-center xs:justify-center '>
                    <div>
                    <h3 className='font-mono flex text-xl' > <div className='pt-1 pe-1'><GiTakeMyMoney/></div> Total Price <span className='font-extrabold pe-2'>:</span> {totalPrice} EGP</h3>
                    <h3 className='font-mono flex text-xl' > <div className='pt-1 pe-1'><PiListNumbersThin/></div> Total Items <span className='font-extrabold pe-2'>:</span> {numOfCartItems} Products</h3>
                    </div>
                 </div>
                  <div className='lg:col-span-4 md:col-span-4 sm:col-span-12 xs:col-span-12 flex lg:justify-end lg:pe-10 sm:justify-center xs:justify-center  lg:p-0 sm:pt-4 xs:pt-4'>
                    <button onClick={()=>clearCart()} className=' text-black border border-black font-mono border-1 px-5 py-2 rounded-lg hover:text-white hover:bg-black'>Clear Cart</button>
                  </div>
              </div>
            <div className='CartProduct lg:m-10 md:m-7 sm:m-4 xs:m-1'>
              <div style={{maxwidth:'50%'}}>

              {
                cartProduct?.map((product,index)=>
                {
                  return <div key={index} className='grid lg:grid-cols-12 border border-stone-200 shadow-sm m-10 rounded-2xl'>

                  <div className='img  lg:col-span-4 xs:col-span-12'>
                    <div className='flex justify-center py-5'>
                      <div className='img'>
                        <img style={{maxwidth:'150px' , maxHeight:'250px'}} className='rounded-md ms-6' src={product.product.imageCover} alt="cart-img" loading='lazy' />
                      </div>
                    </div>
                  </div>
                  <div className='img-detail lg:col-span-8 xs:col-span-12'>
                    <div className='details lg:pt-12 md:pt-8 sm:pt-4 xs:pt-3 grid grid-cols-12'>
                      <div className='about lg:col-span-8 md:col-span-8 sm:col-span-8 xs:col-span-12 lg:p-0 md:p-10 sm:p-4 xs:p-8 sm:justify-center xs:justify-center'>
                       <div className='flex lg:justify-start md:justify-start xs:justify-center'>
                       <div className=''>
                          <div className='text-2xl font-semibold pb-8 font-mono'>{product.product.title}</div>
                          <div className='text-xl font-semibold flex pb-4 font-mono'><div className='pt-1 pe-1'><HiArrowSmRight/></div>{product.product.brand?.name}</div>
                          <div className='font-semibold flex font-mono'><div className='pt-1 pe-1'><TbMoneybag/></div> Price<span className='font-extrabold ps-1 pe-1'>:</span> {product.price} EGP</div>
                          <div className='botton pt-7'>
                              <button onClick={()=>deleteProductFromCart(product.product.id)} className='font-mono flex py-1 px-8 border border-black rounded-md hover:bg-black hover:text-stone-50'><div className='pt-1 pe-1'><HiOutlineTrash /></div> Remove</button>
                          </div>
                       </div>
                       </div>
                      </div>
                    <div className='lg:col-span-4 md:col-span-2 sm:col-span-3 xs:col-span-12'>
                      <div className='h-full flex items-center md:p-0 '>
                        <div className='flex w-full justify-center sm:pb-6 xs:pb-6'>
                            <button onClick={()=>updateCounter(product.product.id , product.count+1)}><CirclePlus /></button>
                                <h2 className='font-semibold px-3 font-mono'>{product.count}</h2>
                            <button onClick={()=>updateCounter(product.product.id , product.count-1)}><CircleMinus /></button>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>

                </div>
                })
              }
              </div>
            </div>
            </div>
            </> }
            
         </div>
        </div>
        <div>
          <Footer/>
        </div>
  </>
}
