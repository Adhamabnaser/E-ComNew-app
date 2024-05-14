import React, { useContext } from 'react'
import { authContext } from '../Context/Authentication'

export default function Profile() 
{
  const {token} = useContext(authContext)
  return<>
  <div >
    <h2> {token} </h2>
  </div>
  </>
}

