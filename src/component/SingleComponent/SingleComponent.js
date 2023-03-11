import React, { useState } from 'react'
import { img_300, unavailable } from '../../Config/Config'
import './style.css'
import { Badge } from '@material-ui/core';
import  ContentModal from '../Modal/Modal';

function SingleComponent({
 id,
poster,
title,
media_type,
date,
rating
}) {
 const [open, setOpen] = useState(false)

 const handleClick = ()=>{
  setOpen(!open)
 }
  return (<>
         {/* <ContentModal> */}
        { open &&
        <ContentModal
          open={open}
          setOpen={setOpen}
          id={id}
          media_type={media_type}
         />
        }
         <div className='media' onClick={()=>handleClick()}>
          
         <Badge color={rating>=7?'primary':'secondary'} badgeContent={rating}>
         </Badge>
            <img src={poster?`${img_300}/${poster}`: unavailable} alt={title}  />
                <b className="title">{title}</b>
                <span className="subTitle">
                  {media_type === "tv" ? "TV Series" : "Movie"}
                  <span className="subTitle">{date}</span>
                </span>
         </div>
               
         {/* </ContentModal> */}
            

  </>)
}

export default SingleComponent