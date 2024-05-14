import React, { useContext } from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import { Cartext } from '../Context/CartContext';
import { Badge } from '@mui/material';
import { Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartIcon() 
{
    const {numOfCartItems} = useContext(Cartext)
    const nav =  useNavigate()
  return <>
      
    <div  className='flex justify-center'>
            <Badge color='error' overlap="circular" badgeContent={numOfCartItems}>
                <h2 onClick={()=>nav('/cart')} className='text-3xl p-5 text-white bg-black rounded-full hover:rotate-90 transition cursor-pointer'>
                        <CiShoppingBasket/>
                </h2>
            </Badge>
    </div> 
  </>
}
