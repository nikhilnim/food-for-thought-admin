import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function NewRecipeForm({ postNewRecipe }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      intro: "",
      type: "",
      prepTime:"",
      cookTime:"",
      serving:"",

    },
  });
  console.log(errors)
  return (
    <>
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
          <input
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
          <input className="form-control form-control-sm"
            type="number" 
            {...register("prepTime", {
              valueAsNumber: true,required: true
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
          <input className="form-control form-control-sm"
            type="number" 
            {...register("cookTime", {
              valueAsNumber: true,required: true
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
          <input className="form-control form-control-sm"
            type="number" 
            {...register("serving", {
              valueAsNumber: true,required: true
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
          <textarea class="form-control" type="text" {...register("ingredient", {
              required: true
            })} ></textarea>
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
            <span class="input-group-text" id="basic-addon1">Calories</span>
            <input className="form-control"
            type="number" step="any"
            {...register("calories", {
              valueAsNumber: true,required: true
            })}
          />
          </div>   
          {errors.calories && (
              <p className="text-danger fs-6 fw-lighter">
                Please enter calories
              </p>
            )}      
        </div>

        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">Fat</span>
            <input className="form-control"
            type="number" step="any"
            {...register("fat", {
              valueAsNumber: true,required: true
            })}
          />
          </div>   
          {errors.fat && (
              <p className="text-danger fs-6 fw-lighter">
                Please enter fats
              </p>
            )}      
        </div>

        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">Carbs</span>
            <input className="form-control"
            type="number" step="any"
            {...register("carbs", {
              valueAsNumber: true,required: true
            })}
          />
          </div>   
          {errors.carbs && (
              <p className="text-danger fs-6 fw-lighter">
                Please enter carbs
              </p>
            )}      
        </div>
        
        <div className="mb-3">
          <div class="input-group">
            <span class="input-group-text" id="basic-addon1">Protein</span>
            <input className="form-control"
            type="number" step="any"
            {...register("protein", {
              required: true
            })}
          />
          </div>   
          {errors.carbs && (
              <p className="text-danger fs-6 fw-lighter">
                Please enter protein
              </p>
            )}      
        </div>

        <div className="mb-3">
          <label htmlFor="serving" className="form-label">
            Direction  
          </label>
          <textarea class="form-control" type="text" {...register("direction", {
              required: true
            })} ></textarea>
          {errors.direction && (
            <p className="text-danger fs-6 fw-lighter">
              Please enter the directions
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary" >
          Add New
        </button>
        <Button as={Link} to=".." className="ms-2" variant="secondary">Cancle</Button>
      </form>
    </>
  );
}

export default NewRecipeForm;
