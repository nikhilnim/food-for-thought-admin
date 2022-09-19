import logo from './logo.svg';
import './App.scss';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import RecipesPage from './pages/RecipesPage/RecipesPage';
import AddEditRecipe from './pages/AddEditRecipe/AddEditRecipe';
import NewRecipePage from './pages/NewRecipePage/NewRecipePage';
function App() {
  return (
    <BrowserRouter>
      <PageHeader></PageHeader>
      <Routes>
        <Route path="/" element={""}></Route>
        <Route path="/recipes" element={<RecipesPage></RecipesPage>}>
          <Route path=":id" element={<AddEditRecipe></AddEditRecipe>}></Route>
          <Route path="new" element={<NewRecipePage></NewRecipePage>}></Route>
          <Route path="" element={ <h3>Please select a recipe</h3> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
