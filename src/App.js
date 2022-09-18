import logo from './logo.svg';
import './App.scss';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PageHeader from './components/Navbar/PageHeader';
function App() {
  return (
    <BrowserRouter>
      <PageHeader></PageHeader>
      <Routes>
        <Route path="/" element={""}></Route>
        <Route path="/recipes">
          <Route path=":id" element={""}></Route>
          <Route path="new" element={""}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
