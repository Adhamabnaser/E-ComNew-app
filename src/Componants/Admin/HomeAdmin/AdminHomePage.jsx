import React from 'react'
import Navbar from './../../Navbar/Navbar';
import { Alert } from '@mui/material';

export default function AdminHomePage() {
  return <>
        <Navbar/> 
        <div className='text-center text-4xl font-mono text-slate-500 pt-20'>
          <h1>Welcome, Admin Home Page</h1>
          <div className='container mx-auto'>
            <Alert severity="warning">This is a warning Alert.</Alert>            
          </div>

        </div>
  
  </>
}
