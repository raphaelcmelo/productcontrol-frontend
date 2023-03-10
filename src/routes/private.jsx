import { Navigate } from "react-router-dom"

const Private = ({ Component }) => {
  const session = JSON.parse(localStorage.getItem("cripto"));

  return session?.token ? <Component /> : <Navigate to={"/login"} />
 
}
export default Private;