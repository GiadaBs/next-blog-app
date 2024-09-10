import { assets } from '@/Assets/assets'
import axios from 'axios';
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post('/api/email', formData);

      if (response.data.redirect) {
        // Se la risposta contiene un URL di reindirizzamento, naviga a quello URL
        window.location.href = response.data.redirect;
      } else if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error(response.data.msg || "Error");
      }
    } catch (error) {
      console.error("Submission error:", error.response || error.message || error);
      // Mostra l'errore ricevuto
      toast.error(`An error occurred: ${error.response?.data?.msg || error.message}`);
    }
  };

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={240} height={240} alt='Logo' className='w-[240px] h-[240px] sm:w-auto sm:h-auto mb-4' />
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] ml-auto mt-4'>
          Get Started <Image src={assets.arrow} width={20} height={20} alt='Arrow'/>
        </button> 
      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Blogger</h1>
        <p className='mt-10 max-w-[740px m-auto text-xs sm:text-base'>
          Mi chiamo Alex e questo è il mio personale Blog di Libri. Da grande appassionato ho deciso di aprire questo Blog per recensire i libri che leggo (molti). Se siete appassionati anche voi come me iscrivetevi al blog per non perdervi tutti gli aggiornamenti sui libri.
        </p>
        <form onSubmit={onSubmitHandler} className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Enter your email' className='pl-4 outline-none' required />
          <button type='submit' className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white">Subscribe</button>
        </form>
      </div>
    </div>
  )
}

export default Header;
