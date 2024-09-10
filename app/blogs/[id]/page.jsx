'use client'
import {assets} from '@/Assets/assets';
import Footer from '@/Components/Footer';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import axios from 'axios';

const page = ({ params }) => {
    const [data, setData] = useState(null);

    const fetchBlogData = async () => {
        try {
            const response = await axios.get('/api/blog', {
                params: {
                    id: params.id
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    };

    useEffect(() => {
        fetchBlogData();
    }, []) 

    return (data ? <>
        <div className='bg-gray-200 px-5 md:px-12 lg:px-28'>
            {/* Contenitore per il logo e il pulsante */}
            <div className='flex justify-between items-center py-3'>
                {/* Logo a sinistra con margine superiore */}
                <Link href='/'>
                    <Image 
                        src={assets.logo} 
                        width={180} 
                        height={60} 
                        alt='Logo' 
                        className='w-[130px] sm:w-auto' 
                        style={{ marginTop: '10px' }}  // Aggiunto margine superiore per abbassare il logo
                    />
                </Link>

                {/* Bottone Get Started a destra */}
                <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border-black shadow-[-7px_7px_0px_#000000]'>
                    Get started <Image src={assets.arrow} alt='Arrow' width={20} height={20} />
                </button>
            </div>

            {/* Titolo e autore centrati */}
            <div className='text-center my-24'>
                <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>
                    {data.title}
                </h1>
                <Image 
                    className='mx-auto mt-6 border border-white rounded-full' 
                    src="/author_img.png"
                    width={60} 
                    height={60} 
                    alt='Author' 
                />
                <p className='mt-1 text-lg max-w-[740px] mx-auto'>{data.author}</p>
            </div>
        </div>

        {/* Sezione separata con sfondo bianco per il libro */}
        <div className='bg-white py-10'>
            <div className='mx-5 max-w-[800px] md:mx-auto text-center'>
                <Image className='border-4 border-white mx-auto' src={data.image} width={300} height={200} alt='Libro' />
                <h1 className='my-8 text-[26px] font-semibold'>Descrizione:</h1>
                
                
                <div className='blog-content' dangerouslySetInnerHTML={{__html:data.description}}></div>
                
                <h1 className='my-8 text-[26px] font-semibold'>Opinione:</h1>
                <p>{data.opinion}</p>
                  

                {/* Sezione di condivisione sui social */}
                <div className='my-24'>
                    <p className='text-black font-semibold my-4'>Share this article on social media</p>
                    <div className='flex gap-2 justify-center'>
                        <Image src={assets.facebook_icon} width={20} height={20} alt='' />
                        <Image src={assets.instagram_icon} width={20} height={20} alt='' />
                        <Image src={assets.googleplus_icon} width={20} height={20} alt='' />
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </> : <></>)
}

export default page
