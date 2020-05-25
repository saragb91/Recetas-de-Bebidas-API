import React, {createContext, useState, useEffect} from 'react'
import axios from 'axios'

//Crear el Context
export const CategoryContext = createContext()

//Provider donde se encuentra las funciones y el state
const CategoryProvider = (props) => {

    //crear el state del Context
    const [categories, setCategories] = useState([])

    //ejercutar la llamada a la API
    useEffect(() => {
        const getCategory = async() => {
            const url= `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
            const category = await axios.get(url)
            setCategories(category.data.drinks)
        }
        getCategory()
    }, [])

    return(
        <CategoryContext.Provider
        value={{
         categories
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider