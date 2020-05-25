import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Recipes = ({recipe}) => {

    //configuración del modal de material-ui
    const [modalStyle] = useState(getModalStyle)
    const [open,setOpen] = useState(false)

    const classes= useStyles()

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    //extraer los valores del context
    const {info, setIdRecipe, setInfo} = useContext(ModalContext)

    //muestra y formatea los ingredientes
    const showIngredients = info => {
        let ingredients = []
        for( let i = 1; i < 16; i++ ){
            if( info[`strIngredient${i}`] ){
                ingredients.push(
                <li>{ info[`strIngredient${i}`] } { info[`strMeasure${i}`] }</li>
                )
            }
        }
        return ingredients
    }
    
    return ( 
        <div className='col-md-4 mb-3'>
            <div className='card'>
                <h2 className='card-header'>{recipe.strDrink}</h2>
                <img src={recipe.strDrinkThumb} className="card-img-top" alt={`Imagen de ${recipe.strDrink}`}/>
                <div className='card-body'>
                    <button type='button'
                            className='btn btn-block btn-primary'
                            onClick={()=> {
                                setIdRecipe(recipe.idDrink)
                                handleOpen()
                            }}
                            >Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setIdRecipe(null)
                            setInfo({})
                            handleClose()
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{info.strDrink}</h2>
                            <h3 className='mt-4'>Instrucciones</h3>
                            <p>{info.strInstructions}</p>

                            <img src={info.strDrinkThumb} className="img-fluid my-4" alt="photoDrinks"/>

                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {showIngredients(info)}
                            </ul>
                        </div>
                    </Modal>
                    
                </div>
            </div>
        </div>
     );
}
 
export default Recipes;