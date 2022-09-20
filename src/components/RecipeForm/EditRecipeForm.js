import axios from "axios";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";

function EditRecipeForm({recipe}) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: recipe.title,
      intro: recipe.intro,
      type: recipe.type,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      serving: recipe.serving,
      ingredient: recipe.ingredient,
      calories: recipe.nutrition.calories,
      fat: recipe.nutrition.fat,
      carbs: recipe.nutrition.carbs,
      protein: recipe.nutrition.protein,
      direction: recipe.direction,
    },
  });

  useEffect(() => {
    reset({
      title: recipe.title,
      intro: recipe.intro,
      type: recipe.type,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      serving: recipe.serving,
      ingredient: recipe.ingredient,
      calories: recipe.nutrition.calories,
      fat: recipe.nutrition.fat,
      carbs: recipe.nutrition.carbs,
      protein: recipe.nutrition.protein,
      direction: recipe.direction,
    })
  }, [recipe])

	const { REACT_APP_API_SERVER_URL } = process.env;

  async function postNewRecipe(recipe) {
    
    let payload = {
      title:recipe.title,
      type:recipe.type,
      image:recipe.image[0],
      cookTime:recipe.cookTime,
      direction:recipe.direction,
      
        calories:recipe.calories,
        fat:recipe.fat,
        protein:recipe.protein,
        carbs:recipe.carbs,
    
      ingredient:recipe.ingredient,
      intro:recipe.intro,
      prepTime:recipe.prepTime,
      serving:recipe.serving,
    } 

    console.log(payload)

    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/recipes`,payload,{
				headers: {
				  'Content-Type': 'multipart/form-data'
				}
			})
      reset();
      navigate("/recipes")
      console.log(data)
    }catch(err){
			console.log(err)
		}
    
  } 
  return (
    <>
      {/* <Link to="/recipes">link</Link> */}
      <form onSubmit={handleSubmit(postNewRecipe)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            className="form-control form-control-sm"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <p className="text-danger fs-6 fw-lighter">Please enter title</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="intro" className="form-label">
            Introduction
          </label>
          <textarea rows="5"
            class="form-control form-control-lg"
            className="form-control form-control-sm"
            {...register("intro", { required: true })}
          />
          {errors.intro && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter Introduction
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="prepTime" className="form-label">
            Select Meat or Veg
          </label>
          <select
            class="form-select"
            aria-label="Default select example"
            {...register("type", { required: true })}
          >
            <option value="">Select Type</option>
            <option value="poultry">Poultry</option>
            <option value="beef">Beef</option>
            <option value="fish">fish</option>
            <option value="veg">Veg</option>
          </select>
          {errors.type && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter Introduction
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="prepTime" className="form-label">
            Prep Time in min
          </label>
          <input
            className="form-control form-control-sm"
            type="number"
            {...register("prepTime", {
              valueAsNumber: true,
              required: true,
            })}
          />
          {errors.prepTime && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter a prep time
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cookTime" className="form-label">
            Cooking time
          </label>
          <input
            className="form-control form-control-sm"
            type="number"
            {...register("cookTime", {
              valueAsNumber: true,
              required: true,
            })}
          />
          {errors.cookTime && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter cook time
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="serving" className="form-label">
            Serving Size
          </label>
          <input
            className="form-control form-control-sm"
            type="number"
            {...register("serving", {
              valueAsNumber: true,
              required: true,
            })}
          />
          {errors.serving && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter a serving size
            </p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="serving" className="form-label">
            Ingredient
          </label>
          <textarea rows="10"
            class="form-control form-control-lg"
            type="text"
            {...register("ingredient", {
              required: true,
            })}
          ></textarea>
          {errors.ingredient && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter the ingredients
            </p>
          )}
        </div>

        <label className="form-label" htmlFor="calories">
          Nutrition
        </label>
        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              Calories
            </span>
            <input
              className="form-control"
              type="number"
              step="any"
              {...register("calories", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>
          {errors.calories && (
            <p className="text-danger fs-6 fw-lighter">Please enter calories</p>
          )}
        </div>

        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              Fat
            </span>
            <input
              className="form-control"
              type="number"
              step="any"
              {...register("fat", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>
          {errors.fat && (
            <p className="text-danger fs-6 fw-lighter">Please enter fats</p>
          )}
        </div>

        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              Carbs
            </span>
            <input
              className="form-control"
              type="number"
              step="any"
              {...register("carbs", {
                valueAsNumber: true,
                required: true,
              })}
            />
          </div>
          {errors.carbs && (
            <p className="text-danger fs-6 fw-lighter">Please enter carbs</p>
          )}
        </div>

        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">
              Protein
            </span>
            <input
              className="form-control"
              type="number"
              step="any"
              {...register("protein", {
                valueAsNumber: true,

                required: true,
              })}
            />
          </div>
          {errors.protein && (
            <p className="text-danger fs-6 fw-lighter">Please enter protein</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="serving" className="form-label">
            Direction
          </label>
          <textarea rows="10"
            class="form-control form-control-lg"
            type="text"
            {...register("direction", {
              required: true,
            })}
          ></textarea>
          {errors.direction && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter the directions
            </p>
          )}
        </div>

        <div class="mb-3">
          <label for="formFile" class="form-label">
            Cover Image Upload
          </label>
          <input class="form-control" type="file" id="formFile" accept="image/*" {...register("image",{
            required:true,
          })} />
          {errors.image && (
            <p className="text-danger fs-6 fw-lighter">
              Please upload image
            </p>
          )}
        </div>
        <div class="mb-3">
          <button type="submit" className="btn btn-primary">
            Confirm Edit
          </button>
          <Button as={Link} to=".." className="ms-2" variant="secondary">
            Cancle
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditRecipeForm;
