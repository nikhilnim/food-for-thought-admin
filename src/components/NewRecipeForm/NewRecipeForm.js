import axios from "axios";
import { Button } from "react-bootstrap";
import { useForm,Controller } from "react-hook-form";
import { Link,useNavigate } from "react-router-dom";
import Select from "react-select";
function NewRecipeForm() {
  const navigate = useNavigate()
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      intro: "",
      type: [],
      prepTime: "",
      cookTime: "",
      serving: "",
      ingredient: "",
      calories: "",
      fat: "",
      carbs: "",
      protein: "",
      direction: "",
    },
  });

  const recipeTypes=[
    { value: "poultry", label: "Poultry" },
    { value: "veg", label: "Veg" },
    { value: "beef", label: "Beef" },
    { value: "fish", label: "Fish" },
    { value: "pork", label: "Pork" },
    { value: "snacks", label: "Snacks" },
    { value: "dessert", label: "Dessert" },
    { value: "sides", label: "Sides" },
    { value: "appetizers", label: "Appetizers" }
  ]
	const { REACT_APP_API_SERVER_URL } = process.env;

  async function postNewRecipe(recipe) {
    let recipeTypes = recipe.type.map((e)=>{
      return e.value
    })
    let payload = {
      title:recipe.title,
      type:JSON.stringify(recipeTypes),
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
    try{
      const {data} = await axios.post(`${REACT_APP_API_SERVER_URL}/recipes`,payload,{
				headers: {
				  'Content-Type': 'multipart/form-data'
				}
			})
      reset();
      navigate("/recipes")
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
            className="form-control form-control-lg"
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
          <Controller 
            name="type"
            control={control}
            rules={{ required: true }}
            render={({field})=><Select {...field} options={recipeTypes} isMulti/>}
          />
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
            className="form-control form-control-lg"
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
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
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
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
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
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
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
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
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
            className="form-control form-control-lg"
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

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Cover Image Upload
          </label>
          <input className="form-control" type="file" id="formFile" accept="image/*" {...register("image",{
            required:true,
          })} />
          {errors.image && (
            <p className="text-danger fs-6 fw-lighter">
              Please upload image
            </p>
          )}
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary mb-3 me-2 mb-sm-0">
            Add New
          </button>
          <Button as={Link} to=".." className="" variant="secondary">
            Cancle
          </Button>
        </div>
      </form>
    </>
  );
}

export default NewRecipeForm;
