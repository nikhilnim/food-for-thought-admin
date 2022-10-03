import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
let render = 0;
function RecipesList({ recipeList, activeRecipeId }) {
  console.log(render++);
  return (
    <>
      <p className="mb-3">Total Recipes {recipeList.length}</p>
      <ListGroup>
        {recipeList.map((e) => {
          return (
            <ListGroup.Item
              as={Link}
              to={`${e.id}`}
              variant={activeRecipeId === e.id ? "success" : ""}
              key={e.id}
            >
              {e.title}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </>
  );
}

export default RecipesList;
