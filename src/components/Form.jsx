import React, {useContext, useState} from 'react'
import {CategoryContext} from '../context/CategoryContext'
import {RecipesContext} from '../context/RecipesContext'

const Form = () => {

    const [ search, setSearch ] = useState({
        name: '',
        category: '' 
    })

    const { categories } = useContext(CategoryContext)
    const {setSearchRecipes, setConsult} = useContext(RecipesContext)

    //función para leer los contenidos
    const getDataRecipes = e => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    }

    return ( 
        
        <form className='col-12' onSubmit={ e => {
            e.preventDefault()
            setSearchRecipes(search)
            setConsult(true)
        }}
        >
            <fieldset className='text-center'>
                <legend>Busca bebidas por categoría o ingrediente</legend>
            </fieldset>

            <div className='row mt-4'>
                <div className='col-md-4'>
                    <input type="text" 
                    name='name' 
                    className='form-control' 
                    placeholder='Buscar por Ingrediente'
                    onChange={getDataRecipes} />
                </div>

                <div className='col-md-4'>
                    <select className='form-control'
                    name='category'
                    onChange={getDataRecipes}
                    >
                        <option value="">-- Selecciona Categoría --</option>
                        {categories.map(category=> (
                            <option value={category.strCategory} key={category.strCategory}>{category.strCategory}</option>
                        ))}
                    </select>
                </div>

                <div className='col-md-4'>
                    <input type="submit"
                    className='btn btn-block btn-primary' 
                    value='Buscar Bebidas'/>
                </div>
            </div>
        </form>
     );
}
 
export default Form;