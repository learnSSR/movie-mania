import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { img_500, unavailable , unavailableLandscape} from '../../Config/Config'
import './modal.css'
import Carousel from './crousel/Crousel'

const useStyles = makeStyles((theme) => ({
  modal: {
   // display: 'flex',
    //alignItems: 'center',
   // justifyContent: 'center',
    overflow:'auto',
    marginLeft: '10%'
  },
  paper: {
    backgroundColor: '#39445a',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    border: "1px solid #282c34",
    borderRadius: 10,
    color: "white",
    width:'90%',
    // padding: theme.spacing(1, 1, 3),
  },
}));

export default function TransitionsModal({
    open,
    setOpen,
    id,
    media_type
}) {
  const classes = useStyles();
  const [content, setContent] = useState({})
  const [ crousel , setCrousel] = useState({})
  useEffect(() => {
    console.log(id)
    async function fetchDetail(){
      const { data }=  await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      console.log(data)
      setContent(data)
    }

    fetchDetail()
  }, [])
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  console.log(content)
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal+ " md_style"}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            { content && (
                <div className="ContentModal" style={{
                  display:'flex',
                  alignItems:'center'
                }}>
                <div>
                    <img
                      src={
                        content.backdrop_path
                          ? `${img_500}/${content.backdrop_path
                          }`
                          : unavailableLandscape
                      }
                      alt={content.name || content.title}
                      className="ContentModal__landscape"
                    />
                </div>
                
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  {/* <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button> */}
                </div>
                </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}