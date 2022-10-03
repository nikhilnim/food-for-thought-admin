import { Link } from "react-router-dom";

function HomePage() {
  return ( <div className="container">
    <div className="row">
      <p className="fs-6 mt-5">Coming soon please <Link to="/recipes">click here</Link> to see all recipes</p>
    </div>
  </div> );
}

export default HomePage;