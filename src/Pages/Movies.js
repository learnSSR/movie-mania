import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SingleComponent from '../component/SingleComponent/SingleComponent'
import PaginationComponent from '../component/PaginationComponent/PaginationComponent'
import Genre from '../component/Genre/Genre'
import { useGenre } from '../hooks/useGenre'

function Movies() {
  const [page, setPageNo] = useState(1)
  const [content, setContent ] = useState([])
  const [totalPage, setTotalPage] = useState(500)
  const [genre, setGenre] = useState([])
  const [selectedGenre , setSelectedGenre ] = useState([])
  
  const genref = useGenre(selectedGenre)
  console.log(genref)
  useEffect(() => {
    async function fetchMovie(){
      const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genref}`)
      console.log(data)
      setContent(data.results)
      setTotalPage(data.total_pages>500?500:data.total_pages)
    }
    fetchMovie()
  
    
  }, [page,selectedGenre])
  
  return (<>
    <div className="pageTitle">Movies</div>
    <> <Genre
         type={'movie'}
         genre={genre}
         setGenre={setGenre}
         selectedGenre={selectedGenre}
         setSelectedGenre={setSelectedGenre}
         />
     </>
    <div 
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}  
            >
            {
               content && content.map((c)=>{
                return(<>
                 <SingleComponent key={c.id} 
                 id={c.id}
                 poster={c.poster_path} 
                 title={ c.media_type && c.media_type === 'tv'? c.original_name: c.original_title || c.original_name}
                 media_type={'movie'}
                 date={ c.release_date || 'N/A'}
                 rating={ c.vote_average && c.vote_average.toFixed(1) || 'N/A' }
                 />
                </>)
               })
            }
            </div>
            {
              (totalPage > 1) &&
              <PaginationComponent
                setPageNo={setPageNo}
                totalPage={totalPage}
              /> 
            }
  </> )
}

export default Movies