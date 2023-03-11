import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  createMuiTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import { Search } from '@material-ui/icons';
import axios from 'axios';
import SingleComponent from '../component/SingleComponent/SingleComponent';
import PaginationComponent from '../component/PaginationComponent/PaginationComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields() {
  const classes = useStyles();
  const [type ,setType] = useState(0)
  const [page ,setPage] = useState(1)
  const [searchText, setSearchText] = useState('')
  const [content, setContent] = useState([])
  const [ totalPage, setTotalPage ] = useState(0)
  const fetchSearch =async ()=>{
    console.log(searchText)
    if (searchText.length === 0)
            return;

      try {
        const { data }  = await axios.get(`https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=${process.env.REACT_APP_API_KEY }&language=en-US&query=${searchText}&page=${page}&include_adult=false`)
        console.log(data)
        setContent(data.results)
        setTotalPage(data.total_pages)
      } catch (error) {
        
      }
  }
  useEffect(()=>{
       if (searchText.length)
           fetchSearch()
  },[type, page])
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (<>
     <div className="pageTitle">TV Series</div>
     <div>
     <ThemeProvider theme={darkTheme}>
        <div className="search">
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <Search fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            console.log(newValue)
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
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
                 title={ type ? c.original_name: c.original_title || c.original_name}
                 media_type={type? 'tv': 'movie'}
                 date={ type? c.first_air_date : c.release_date || 'N/A'}
                 rating={ c.vote_average && c.vote_average.toFixed(1) || 'N/A' }
                 />
                </>)
               })
            }
            </div>
            {
              (totalPage > 1) &&
              <PaginationComponent
                setPageNo={setPage}
                totalPage={totalPage}
              /> 
            }
          
     </div>
  </>
  );
}
