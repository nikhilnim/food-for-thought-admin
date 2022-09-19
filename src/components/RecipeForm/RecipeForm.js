import { useForm } from "react-hook-form";


function RecipeForm({afterSumbit,recipe}) {
  const { register, handleSubmit, formState:{errors} } = useForm({
    defaultValues:{title:"title"},
  });
  return (
    <>
      <form onSubmit={handleSubmit(afterSumbit)}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input  className="form-control form-control-sm" {...register("title",{required:true})}/>
          {errors.title && <p class="text-danger fs-6 fw-lighter">Please enter title</p>}
        </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
      </form>
    </>
  );
}

export default RecipeForm;
