import axios from "axios";
import { createContext, useEffect, useState} from "react";
import toast from "react-hot-toast";

export const Cartext =  createContext()

export function CartextProvider ({children})
{
    const [cartProduct , setCartProduct] = useState(null)
    const [totalPrice , settotalPrice] = useState(0)
    const [numOfCartItems , setnumOfCartItems] = useState(0)
    async function addProductToCart(productId)
     {
         try {
             const {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/cart',
             {
                 'productId' : productId
             },
         {
             headers:
             {
                 token : `${localStorage.getItem('tkn')}`
             }
         } )    
        //  setnumOfCartItems(data?.numOfCartItems)
        //  settotalPrice(data?.data?.totalCartPrice)
        //  setCartProduct(data?.data?.products)
        // solve this problem
         getCartToUser()
         return data;
         
         } catch (error) {
             console.log(error);
             // toast.error(error.response.data.message);
             toast('There is Maybe Error,Please,Restart The Page',
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
      
     async function getCartToUser() 
     {
      try {
        const {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/cart',
        {
            headers:{token:localStorage.getItem('tkn')}
        }
    ) 
        setnumOfCartItems(data?.numOfCartItems)
        settotalPrice(data?.data?.totalCartPrice)
        setCartProduct(data?.data?.products)
      } catch (error) {
        console.log(error);
      }  
     }
     async function clearAllCart() 
     {
      try {
        const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,
        {
            headers:{token:localStorage.getItem('tkn')}
        }
    )   
    if (data.message==="success") 
        {
            toast('Cart All Deleted Successfully ✔',
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
            setnumOfCartItems(0)
            settotalPrice(0)
            setCartProduct([])   
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }  
     }
     async function updateCountProduct(productId ,count) 
     {
      try {
        const {data} = await axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
            'count' : count
        },
        {
            headers:{token:localStorage.getItem('tkn')}
        }
    ) 
    
        setCartProduct(data?.data.products)
        setnumOfCartItems(data?.numOfCartItems)
        settotalPrice(data?.data?.totalCartPrice)
        return data
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }  
     }
     async function deleteProduct(productId) 
     {
      try {
        const {data} = await axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
        {
            headers:{token:localStorage.getItem('tkn')}
        }
    )   
            toast('Product Deleted Successfully',
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
        setnumOfCartItems(data?.numOfCartItems)
        settotalPrice(data?.data?.totalCartPrice)
        setCartProduct(data?.data?.products)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }  
     }
     useEffect(()=>{
        getCartToUser()
        },[])

    return<Cartext.Provider value={{
        addProductToCart,
        numOfCartItems ,
        totalPrice ,
        cartProduct,
        getCartToUser,
        deleteProduct,
        clearAllCart,
        updateCountProduct
        }}>
        {children}
    </Cartext.Provider>    
    }