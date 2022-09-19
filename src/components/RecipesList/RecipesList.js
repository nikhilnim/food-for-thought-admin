import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function RecipesList({recipeList,activeRecipeId}) {
  return (
    <ListGroup>
      {recipeList.map((e)=>{
        return (<ListGroup.Item as={Link} to={`${e.id}`} variant={activeRecipeId == e.id ? 'success' : ''} key={e.id}>
          {e.title}
        </ListGroup.Item>)
      })}
    </ListGroup>
  );
}

export default RecipesList;
