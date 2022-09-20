import axios from "axios";
import { useEffect, useState } from "react";

import { useParams,useLocation } from "react-router-dom";

import EditRecipeForm from "../../components/RecipeForm/EditRecipeForm";


function AddEditRecipe() {
  const [recipe,setRecipe] = useState(null)  
  const param = useParams()
  
  const { REACT_APP_API_SERVER_URL } = process.env;

  async function getRecipeById(recipeId){
    const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes/${recipeId}`)
    console.log(data)
    setRecipe(data);
  }

  useEffect(()=>{
    if(param.id){
      console.log("param,",param)
      getRecipeById(param.id)
    }
  },[param])

  function afterSumbit(data){
    console.log(data)
  }

  if(recipe){
      return <EditRecipeForm afterSumbit={afterSumbit} recipe={recipe}></EditRecipeForm>
  }else{
    return null
  }

  
}

export default AddEditRecipe;
