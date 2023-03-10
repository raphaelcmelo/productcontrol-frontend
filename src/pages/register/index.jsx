import { Main, Body, Logo, Spacing, CreateAcc } from "./styles";
import { Input, Button }  from "../../components";
import { useNavigate} from "react-router-dom"
import { useState } from "react";
import api from "../../services/api";

const Register = () => {

  const [data, setData] = useState ({
    name: "",
    email: "",
    cpf: "",
    password: "",
  })

  const navigate = useNavigate();
  
  const save = async (ev) => {
    ev.preventDefault();
    await api.post(`/user`, data);
    alert("Usuário criado com sucesso")
  }

  return (
<Main>
  <Body>
    <form onSubmit={save}>
      <Logo>
        Gerenciador Financeiro
      </Logo>
      <Input
        label="Nome"
        placeholder="Digite o nome"
        required={true}
        value={data.name}
        onChange={ev => setData({ ...data, name: ev.target.value})}
      />
      <Spacing />
      <Input
        label="Email"
        placeholder="Digite o email"
        type="email"
        required={true}
        value={data.email}
        onChange={ev => setData({ ...data, email: ev.target.value})}
      />
      <Spacing />
      <Input
        label="CPF"
        placeholder="Digite o CPF"
        required={true}
        value={data.cpf}
        onChange={ev => setData({ ...data, cpf: ev.target.value})}
      />
      <Spacing />
      <Input
        label="Senha"
        placeholder="Digite a senha"
        type="password"
        required={true}
        value={data.password}
        onChange={ev => setData({ ...data, password: ev.target.value})}
      />
      <Spacing />
      <Button
        label="CRIAR CONTA"
        type="submit"
        variant="btn-primary"
      />
      <Spacing />
      <CreateAcc onClick={() => navigate("/login")}>
        Fazer login
      </CreateAcc>
    </form>
  </Body>
</Main>
  );
};
export default Register;