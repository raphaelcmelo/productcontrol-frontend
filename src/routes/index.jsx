import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";
import { Menu } from "../components";
import Users from "../pages/users";
import Create from "../pages/users/create";
import Sales from "../pages/sales";
import Form from "../pages/sales/form";


const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route
        path="/"
        element={
          <Menu>
            <Private Component={Home}/>
          </Menu>
        }
        />
        <Route 
          path='/users'
          element ={
          <Menu>
            <Private Component={Users}/> 
          </Menu>
          }
        />
        <Route 
          path='/users/create'
          element ={
          <Menu>
            <Private Component={Create}/> 
          </Menu>
          }
        />
        <Route
          path="/sales"
          element={
          <Menu>
            <Private Component={Sales}/> 
          </Menu>}
        />
        <Route
          path="/sales/form"
          element={
          <Menu>
            <Private Component={Form}/> 
          </Menu>}
        />
    </Routes>
  )
}

export default RoutesComponent