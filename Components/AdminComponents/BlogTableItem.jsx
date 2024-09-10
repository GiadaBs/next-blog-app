import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const BlogTableItem = ({ authorImg, title, author, date, deleteBlog, mongoId}) => {

    const BlogDate = new Date(date);


  // Verifica che l'immagine abbia un URL valido o un percorso che inizia con "/"
  const imgSrc = authorImg ? (authorImg.startsWith('http') ? authorImg : `/${authorImg}`) : assets.profile_icon;

  return (
    <tr className='bg-white border-b'>
        <th scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font medium text-gray-900 whitespace-nowrap'>
           <Image 
             src={imgSrc} 
             width={50} 
             height={50} 
             alt={`${author || 'Author'}'s image`} // Migliora l'accessibilità con un alt testuale
             className="rounded-full" // Aggiungi un po' di stile all'immagine se desiderato
           /> 
           <p>{author ? author : "No author"}</p>
        </th>
        <td className='px-6 py-4'>
            {title ? title : "no title"}
        </td>
        <td className='px-6 py-4'>
            {BlogDate.toDateString()}
        </td>
        <td onClick={()=>deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
            x
        </td>
    </tr>
  )
}

export default BlogTableItem
