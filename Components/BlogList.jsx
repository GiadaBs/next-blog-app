import BlogItem from './BlogItem'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blogs, setBlogs] = useState([]);

    const fetchBlogs = async () =>{
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
      console.log(response.data.blogs);
    }
    
    useEffect(()=>{
      fetchBlogs();
    },[])

    return (
    <div>
        <div className='flex justify-center gap-6 my-10'> 
            <button onClick={()=>setMenu('All')} className={menu==="All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
            <button onClick={()=>setMenu('Fantasy')} className={menu==="Fantasy" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Fantasy</button>
            <button onClick={()=>setMenu('Giallo')} className={menu==="Giallo" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Giallo</button>
            <button onClick={()=>setMenu('Horror')} className={menu==="Horror" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Horror</button>
            <button onClick={()=>setMenu('Romanzo')} className={menu==="Romanzo" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Romanzo</button>
            <button onClick={()=>setMenu('Thriller')} className={menu==="Thriller" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Thriller</button>
        </div>
        <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
          {blogs.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
            return <BlogItem key={index} id={item._id} image={item.image} title={item.title} description={item.description} category={item.category} opinion={item.opinion}/>
          })}
        </div>
    </div>
  )
}

export default BlogList