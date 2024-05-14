import React, { useContext, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { InfinitySpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { ShoppingBasket } from 'lucide-react'
import { Cartext } from '../Context/CartContext'
import CartIcon from '../CartOfProduct/CartIcon'

export default function ProductDetails() 
{
  const {id : productId} = useParams()
  const {addProductToCart} = useContext(Cartext)
  const [load , setLoad] = useState(false)

    async function detailsProduct() 
    {
        return await axios.get(`https:ecommerce.routemisr.com/api/v1/products/${productId}`)
    }
    const {data , isLoading , isError} = useQuery('detailsProduct',detailsProduct ,
        {
            // cacheTime:10000,
            refetchOnMount:true,
            // refetchInterval:3000,
            // staleTime:3000 
        }
    )
    console.log(data?.data);
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
    if (isError) 
    {
        console.log(isError);
        toast('Sorry, May be you have to refresh page',
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
      );    }

      async function AddToCart(productId) 
      {
        setLoad(true)
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
          setLoad(false)
         
      }

  return <>
  <div className='fixed bottom-6 z-10 right-6'>
    <CartIcon/>
  </div>
  <div className=' mx-auto py-16'>
      <div className='grid lg:grid-cols-12 px-10'>
        <div className='lg:col-span-4 md:col-span-6 xs:col-span-12 md:ps-24 xs:ps-5 '>
            <figure className='border border-black border-dashed rounded-full shadow-2xl w-full'>
                <img className='w-full' src={data?.data?.data?.imageCover} alt="productPic" loading='lazy'/>
            </figure>
        </div>
        <div className='lg:col-span-8 px-10 md:col-span-12 xs:col-span-12 flex justify-center items-center'>
            <div className='details'>
                <h2 className='text-center text-4xl font-mono font-extrabold pb-10 pt-5'>{data?.data?.data?.title}</h2>
                <p className='text-slate-400'>{data?.data?.data?.description}</p>
                <p className='text-center font-bold font-mono py-3'>{data?.data?.data?.category?.name}</p>
                <p className='font-mono text-center'>{data?.data?.data?.stock}</p>
                <p className='font-mono text-center'>{data?.data?.data?.brand?.name}</p>
                <p className='font-mono text-center'>Price <span className='font-extrabold fo'>: </span>{data?.data?.data?.price} EGP</p>
            <div className='pt-3 flex justify-center'>
                <button 
                  onClick={()=>AddToCart(productId)}
                  className='border border-black px-24 rounded-xl py-1 hover:bg-black hover:text-white flex gap-3'>
                     {
                                    load ?<>
                                     <div style={{height:'25px'}} className='pe-5 w-full flex justify-center items-center'>
                                        <InfinitySpin
                                          visible={true}
                                          width="70"
                                          color="gray"
                                          ariaLabel="infinity-spin-loading"
                                          
                                          />
                                      </div>
                                    </>
                                    :
                                    <>
                                     Add <ShoppingBasket strokeWidth={1} />
                                    </>
                                  }
                    
                </button>
            </div>
            </div>
        </div>
      </div>
  </div>
  <div>
    <Footer/>
  </div>
  </>
}
