import React, {createContext, useEffect, useState} from 'react'
import axios from 'axios'

export const ModalContext = createContext()

const ModalProvider = (props) => {

    //state del Provider
    const [idRecipe, setIdRecipe] = useState(null)
    const [info, setInfo] = useState({})

    //una vez tenemos una receta llamamos a la api
    useEffect(()=>{
        const getRecipe = async () => {
            if(!idRecipe) return

            const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`

            const result = await axios.get(url)
            setInfo(result.data.drinks[0])
        }
        getRecipe()
    },[idRecipe])

    return ( 
        <ModalContext.Provider
            value={{
                info,
                setIdRecipe,
                setInfo
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;