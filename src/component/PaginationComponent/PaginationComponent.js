import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function PaginationComponent({setPageNo, totalPage}) {
  const classes = useStyles();
    const handlePagination =(e,page)=>{
        console.log(page)
        setPageNo(page)
        window.scroll(0,0)
    }

  return (
    <div 
    style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    className={classes.root}>
         <ThemeProvider theme={darkTheme}>
      <Pagination onChange={(e, page)=>handlePagination(e, page)}
                  count={totalPage}
                  color="primary" 
                  hideNextButton
                  hidePrevButton
                  />

         </ThemeProvider>
    </div>
  );
}
