import React from 'react'
import { useQuery } from 'react-query';
import { InfinitySpin } from 'react-loader-spinner';
import axios from 'axios';
import Footer from '../Footer/Footer';
export default function Brands() 
{
  async function AllBrands() 
  {
    return await axios.get('https:ecommerce.routemisr.com/api/v1/brands')
  }
  const {isError , isFetching , isLoading, data } =  useQuery('allBrands',AllBrands)
  console.log(data);
  console.log(isFetching);
  console.log(isError);
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
  return<>
  <div className='container'>
    <div className='flex justify-center'>
    <h2 className='text-center text-3xl my-5 px-10 py-1 rounded-tr-full rounded-bl-full border border-black mb-8'>Brands</h2>
    </div>  

    <section>
      <div className='product border rounded-md' >
        <div className=' cards grid md:grid-cols-3 lg:grid-cols-5 sm:grid-cols-2 gap-5 p-10'>

  

          { data?.data?.data.map( function (brand , idx) {
            return<div key={idx} className='card p-5 relative border border-slate-50 rounded-md bg-slate-50 hover:bg-slate-100 cursor-pointer'>
                <div className='image'>
                  <img className='rounded-full' src={brand.image} alt="product" loading='lazy'/>
                </div>
                <div className='title'>
                  <p className='main_title font-bold text-center'> {brand.name}</p>
                </div>
                <div className='button pt-2'> 
                  <button className='border border-black px-4 py-1 w-full hover:bg-black hover:text-slate-200 rounded-lg'>More</button>
                </div>
            </div> 
          })}          


        </div>
      </div>
    </section>
      
  </div>



<div className='broder border-t mt-10'>

<Footer/>
</div>
</>
}
