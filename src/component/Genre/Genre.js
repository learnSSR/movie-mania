import axios from 'axios'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }));

function Genre(
    {
        genre,
        setGenre,
        selectedGenre,
        setSelectedGenre,
        type,
    }) {
    const classes = useStyles();
    console.log(genre, selectedGenre)

    useEffect(() => {
      async function fetchGenre(){
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
        console.log(data) 
        setGenre(data.genres) 
    }

      fetchGenre()
    }, [])
    
    const handleClick = (g)=>{ 
        setGenre(genre.map(gen=> gen.id === g.id? g: gen))
        setSelectedGenre([...selectedGenre,g])
    }

    const handleUnclick = (g)=>{  
        setGenre(genre.map(gen=> gen.id === g.id? g: gen))
        setSelectedGenre(selectedGenre.filter(gen=>gen.id !== g.id))
    }

    

  return (<>
     <div className={classes.root}>
        {
            genre && genre.map((g)=>{
                return(
                g.selected?
                <>
                 <Chip 
                 key={g.id}
                 label={g.name}
                 clickable 
                 color={"primary"}
                 onDelete={()=>handleUnclick({...g,selected:false})}
               />
                </>
                :
                <>
                <Chip 
                 key={g.id}
                 label={g.name}
                 clickable 
                 onClick={()=>{ handleClick({...g,selected:true}) }}
               />
                </>
                )
               
            })
        }

     </div>
  </>)
}

export default Genre