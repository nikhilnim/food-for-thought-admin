import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import RecipesList from '../../components/RecipesList/RecipesList';

import { Outlet, useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { REACT_APP_API_SERVER_URL } = process.env;

function RecipesPage() {

  const [recipeList,setRecipeList] = useState([]);
  const [activeRecipeId,setActiveRecipeId] = useState(0)
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id);

  async function getRecipesList(){
    const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes`)
    setRecipeList(data)
  }

  useEffect(()=>{
    getRecipesList();
    if(params.id){
      setActiveRecipeId(params.id)
    }
  },[params.id])

  function TODO(){
    setActiveRecipeId(0)
    navigate("new")
  }

  return (
    <Container fluid="xl">
      <Row className=''>
        <Col className='text-end'>
          <Button variant="primary" onClick={TODO} className="my-3">Add New Recipe</Button>
        </Col> 
      </Row>
      <Row>
        <Col className='col-sm-5'>
        <h1>Recipes List</h1>
         {recipeList && <RecipesList recipeList={recipeList} activeRecipeId={activeRecipeId}/>} 
        </Col>
        <Col>
          <Outlet></Outlet>
        </Col>
      </Row>
    </Container>
  );
}

export default RecipesPage;
