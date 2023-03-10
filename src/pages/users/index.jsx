import { Content, Button, Loading } from "../../components";
import { BodyBtn, SessionBtns }  from "./styles";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const session = JSON.parse(localStorage.getItem("cripto"));

  const getUsers = async () => {
    setLoading(true);
    try {
      const users = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${session.token}`
        }
      });
      setUsers(users.data);
      setLoading(false);
    } catch (error) {
      alert("Não foi possível carregar os usuários");
      setLoading(false);
    }
  }

  const removeUser = async (id) => {
    setLoading(true);
    const message = confirm("Tem certeza que deseja remover este usuário?")
    try {
        if(message){
        await api.delete(`/user/${id}`, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });
      }
        setLoading(false);
        getUsers();
   } catch (error) {
      alert("Não foi possível excluir o usuário")
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      <Content>
        <BodyBtn>
          <Button label="Criar Usuário" variant="btn-primary" onClick={() => navigate("/users/create") }/>
        </BodyBtn>
        {loading && <Loading />}
        {!loading &&
          <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users?.length ?
              users.map((data, index) =>
            <tr key={index}>
              <th>{data.id}</th>
              <th>{data.name}</th>
              <th>{data.email}</th>
              <th>{data.cpf}</th>
              <td>
                <SessionBtns>
                  <Button label="Editar" variant="btn-success" onClick={() => navigate("/users/form", { state: { id: data.id }})}/>
                  <Button label="Excluir" variant="btn-danger" onClick={() => removeUser(data.id)} />
                </SessionBtns>
              </td>
            </tr>
              )
              : null}
          </tbody>
        </table>}
      </Content>
    </>
  )
}

export default Users;