import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import EditRecipeForm from "../../components/EditRecipeForm/EditRecipeForm";


function AddEditRecipe() {
  const [recipe,setRecipe] = useState(null)  
  const param = useParams()
  
  useEffect(()=>{
    const { REACT_APP_API_SERVER_URL } = process.env;
    async function getRecipeById(recipeId){
      const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${recipeId}`)
      console.log(data)
      setRecipe(data);
    }
    if(param.id){
      console.log("param,",param)
      getRecipeById(param.id)
    }
    
  },[param])


  if(recipe){
      return <EditRecipeForm  recipe={recipe}></EditRecipeForm>
  }else{
    return null
  }

  
}

export default AddEditRecipe;
