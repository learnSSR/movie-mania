import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import PageviewIcon from '@material-ui/icons/Pageview';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position:'fixed',
    bottom:0,
    background:"#2d313a",
    color:'white',
    zIndex:100
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
    console.log(value)

    useEffect(() => {
        let navigateType = {
            0:'/',
            1:'/movies',
            2:'/series',
            3:'/search'
        }
        navigate(navigateType[value])
        window.scroll(0,0)
    }, [value])
    
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction style={{ color:'white' }} label="Trending" icon={<WhatshotIcon />} />
      <BottomNavigationAction style={{ color:'white' }} label="Movies" icon={<MovieIcon />} />
      <BottomNavigationAction style={{ color:'white' }} label="TV Series" icon={<TvIcon />} />
      <BottomNavigationAction style={{ color:'white' }} label="Search" icon={<PageviewIcon />} />
    </BottomNavigation>
  );
}
