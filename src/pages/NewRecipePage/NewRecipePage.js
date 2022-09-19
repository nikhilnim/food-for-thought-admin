import NewRecipeForm from "../../components/NewRecipeForm/NewRecipeForm";

function NewRecipePage() {


  function postNewRecipe(data){
    console.log(data)
  }


  return ( 
  <>
    <h2>Add New Recipe</h2>
    <NewRecipeForm postNewRecipe={postNewRecipe}></NewRecipeForm>
  </>
   );
}

export default NewRecipePage;