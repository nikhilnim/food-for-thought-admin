import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
const { REACT_APP_API_SERVER_URL } = process.env;
function EditRecipeForm({ recipe }) {
  const [imgSrc, setImgSrc] = useState(recipe.image);
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      title: recipe.title,
      intro: recipe.intro,
      type: [],
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      serving: recipe.serving,
      ingredient: recipe.ingredient,
      calories: recipe.nutrition.calories,
      fat: recipe.nutrition.fat,
      carbs: recipe.nutrition.carbs,
      protein: recipe.nutrition.protein,
      direction: recipe.direction,
      image: null,
    },
  });

  useEffect(() => {
    reset({
      title: recipe.title,
      intro: recipe.intro,
      type: recipe.type.map((e)=>{
        return { value: `${e}`, label: `${e}` }
      }),
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      serving: recipe.serving,
      ingredient: recipe.ingredient,
      calories: recipe.nutrition.calories,
      fat: recipe.nutrition.fat,
      carbs: recipe.nutrition.carbs,
      protein: recipe.nutrition.protein,
      direction: recipe.direction,
      image: null,
    });
    setImgSrc(recipe.image);
  }, [recipe,reset]);



  async function updateRecipe(newRecipe) {
     console.log(newRecipe)

    let payload = {
      title: newRecipe.title,
      type: JSON.stringify(newRecipe.type.map((e)=>{
        return e.value
      })),
      cookTime: newRecipe.cookTime,
      direction: newRecipe.direction,
      calories: newRecipe.calories,
      fat: newRecipe.fat,
      protein: newRecipe.protein,
      carbs: newRecipe.carbs,
      ingredient: newRecipe.ingredient,
      intro: newRecipe.intro,
      prepTime: newRecipe.prepTime,
      serving: newRecipe.serving,
    };

    if (newRecipe.image === null) {
      payload.ogiImageName = recipe.image;
      console.log("if block", payload);
    } else if (newRecipe.image.length === 0) {
      payload.ogiImageName = recipe.image;
      console.log("else if block", payload);
    } else {
      payload.image = newRecipe.image.item(0);
      console.log("else", payload);
    }

    try{
      const {data} = await axios.put(`${REACT_APP_API_SERVER_URL}/recipes/${recipe.id}`,payload,{
    		headers: {
    		  'Content-Type': 'multipart/form-data'
    		}
    	})
      console.log(data)
      reset({
        title: data.title,
        intro: data.intro,
        type: data.type.map((e)=>{
          return { value: `${e}`, label: `${e}` }
        }),
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        serving: data.serving,
        ingredient: data.ingredient,
        calories: data.nutrition.calories,
        fat: data.nutrition.fat,
        carbs: data.nutrition.carbs,
        protein: data.nutrition.protein,
        direction: data.direction,
        image: null,
      })
      setImgSrc(data.image)
      navigate("/recipes")
    }catch(err){
    	console.log(err)
    }
  }
  const types=[
    { value: "poultry", label: "Poultry" },
    { value: "veg", label: "Veg" },
    { value: "beef", label: "Beef" },
    { value: "fish", label: "Fish" },
    { value: "snacks", label: "Snacks" },
    { value: "dessert", label: "Dessert" },
    { value: "sides", label: "Sides" },
    { value: "appetizers", label: "Appetizers" }
  ]

  async function deleteRecipe() {
    try{
      let {data} = await axios.delete(`${REACT_APP_API_SERVER_URL}/recipes/${recipe.id}`)
      console.log(data)
      navigate('..')
    }catch(err){
      console.log(err)
    }
  
  }

  return (
    <>
      {/* <Link to="/recipes">link</Link> */}
      <h2 className="mb-4">View/Edit Recipe</h2>
      <Image
        fluid
        thumbnail
        className="mb-3"
        src={`${REACT_APP_API_SERVER_URL}/images/${imgSrc}`}
      ></Image>
      <form onSubmit={handleSubmit(updateRecipe)}>
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
          <textarea
            rows="5"
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
            render={({ field }) => <Select isMulti {...field} options={types}  />
            }
            rules={{ required: true }}
          />
          {/* <select
            className="form-select"
            aria-label="Default select example"
            {...register("type", { required: true })}
          >
            <option value="">Select Type</option>
            <option value="poultry">Poultry</option>
            <option value="beef">Beef</option>
            <option value="fish">fish</option>
            <option value="veg">Veg</option>
          </select> */}
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
          <textarea
            rows="10"
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
          <label htmlFor="direction" className="form-label">
            Direction
          </label>
          <textarea
            rows="10"
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
          <label htmlFor="image" className="form-label">
            Update Cover Image
          </label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          {errors.image && (
            <p className="text-danger fs-6 fw-lighter">Please upload image</p>
          )}
        </div>
        <div className="mb-3">
          {/* <button type="submit" className="btn btn-primary">
            Confirm Edit
          </button> */}
          <button
            type="submit"
            className={isDirty ? "btn btn-primary" : "btn btn-primary disabled"}
          >
            Confirm Edit
          </button>
          <Button as={Link} to=".." className="ms-2" variant="secondary">
            Cancel
          </Button>
          <Button onClick={deleteRecipe} className="ms-2" variant="secondary">
            Delete
          </Button>
        </div>
      </form>
    </>
  );
}

export default EditRecipeForm;
