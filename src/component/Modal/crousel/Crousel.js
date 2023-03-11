

import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../../Config/Config";
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

// const items = [
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
//   <img src="path-to-img" onDragStart={handleDragStart} role="presentation" />,
// ];

const Gallery = ({
    id,
    media_type
}) => {
    const [ crousel , setCrousel] = useState([])
    let items = crousel && crousel.map(c=>(
        <div className="carouselItem" key={c.id}
        onClick={()=>{
            window.open(
                `https://en.wikipedia.org/wiki/${c?.name}`,
                '_blank' // <- This is what makes it open in a new window.
              );
        }}
        style={{
            cursor:'pointer'
        }}
        >
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ))

    const responsive = {
        0: {
          items: 3,
        },
        512: {
          items: 5,
        },
        1024: {
          items: 7,
        },
      };

    useEffect(() => {
      console.log(id)
      async function fetchDetail(){
        const { data:castData }= await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(castData)
        setCrousel(castData.cast)
      }
  
      fetchDetail()
    }, [])

  return (
    <AliceCarousel 
    mouseTracking
    infinite
    disableDotsControls
    // disableButtonsControls
    responsive={responsive}
    items={items}
    autoPlay
    />
  );
}

export default Gallery