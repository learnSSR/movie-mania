import axios from 'axios'
import SingleComponent from '../component/SingleComponent/SingleComponent'
import React, { useState, useEffect } from 'react'
import PaginationComponent from '../component/PaginationComponent/PaginationComponent'

function Trends() {
  const [page, setPageNo] = useState(1)
  const [content, setContent ] = useState([])
  const [totalPage, setTotalPage] = useState(500)

    useEffect(() => {
      async function fetchData(){
        try {
            const { data } = await axios(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
            console.log(data)
            setContent(data.results) 
            setTotalPage(data.total_pages)
        } catch (error) {
            console.log(error)
        }
        }
        fetchData()
    }, [page])
    console.log(content)
  return (<>
        <div className="pageTitle">Trends</div>
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
                 media_type={c.media_type}
                 date={ c.media_type &&  c.media_type === 'tv'? c.first_air_date:c.release_date || 'N/A'}
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
          </>
  )
}

export default Trends