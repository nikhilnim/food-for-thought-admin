import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import RecipeForm from "../../components/RecipeForm/RecipeForm";

function AddEditRecipe() {
  const [recipe,setRecipe] = useState(null)  
  const param = useParams()
  
  function getRecipeById(){
    setRecipe({title:"title"});
  }
  useEffect(()=>{
    if(param.id){
      console.log(param.id)
      getRecipeById()
    }
  },[param.id])

  function afterSumbit(data){
    console.log(data)
  }

  if(recipe){
      return <RecipeForm afterSumbit={afterSumbit} recipe={recipe}></RecipeForm>
  }else{
    return null
  }

  
}

export default AddEditRecipe;
