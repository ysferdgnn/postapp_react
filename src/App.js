
import { BrowserRouter, Route,Routes,Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Login from './components/Auth/Login';

function App() {

  let token = localStorage.getItem("tokenKey");
  console.log("token :"+token);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='/' element={token === null ? <Navigate replace to="/login"/> : <Home/>}></Route>
          <Route exact path='/users/:userId' element={token === null ? <Navigate replace to="/login"/> : <User/>}></Route>
          
          <Route exact path ='/login' element={ token ===null?  <Login/> : <Navigate replace to="/"/>}>
          


          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
