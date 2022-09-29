import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import RecipesList from '../../components/RecipesList/RecipesList';

import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const { REACT_APP_API_SERVER_URL } = process.env;

function RecipesPage() {

  const [recipeList,setRecipeList] = useState([]);
  const [activeRecipeId,setActiveRecipeId] = useState("")
  const params = useParams();
  let location = useLocation();


  async function getRecipesList(){
    const {data} = await axios.get(`${REACT_APP_API_SERVER_URL}/recipes`)
    setRecipeList(data)
  }

  useEffect(()=>{
    getRecipesList();
    if(params.id){
      setActiveRecipeId(params.id)
    }else{
      setActiveRecipeId("")
    }
  },[params.id,location])

  // function loadNewRecipeForm(){
  //   setActiveRecipeId("")
  //   navigate("new")
  // }

  return (
    <Container fluid="xl">
      <Row className='mt-3'>
        <Col>
          <h1 className='fs-3'>Dashboard</h1>
        </Col>
      </Row>
      <Row className=''>
        <Col className='text-end'>
          {/* <Button variant="primary" onClick={loadNewRecipeForm} className="my-3">Add New Recipe</Button> */}
          {/* <Link to="">test</Link> */}
          <Button as={Link} to="new" className="my-3" variant="primary" >
            Add new recipe
          </Button>
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
