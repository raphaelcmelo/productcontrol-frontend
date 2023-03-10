import { Main, Body, Logo, Spacing, CreateAcc } from "./styles";
import { Input, Button, Text, Loading }  from "../../components";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver }  from "@hookform/resolvers/yup";
import api from "../../services/api";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const schema = yup.object({
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup
    .string()
    .required("Campo obrigatório")
    .min(6, "Mínimo 6 caracteres"),
  });

  const { handleSubmit, register, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await api.post(`/login`, data);
      const token = { token: response?.data?.token };
      localStorage.setItem("cripto", JSON.stringify(token));
      setLoading(false);
      navigate("/");
    } catch (error) {
      alert("Erro, tente novamente!")
      setLoading(false);
    }
  }

  return (
<Main>
  <Body>
    {loading && <Loading />}
    {!loading && (
    <form onSubmit={handleSubmit(login)}>
      <Logo>
        Gerenciador Financeiro
      </Logo>
      <Input
        label="Email"
        placeholder="Digite o email" 
        type="email"
        required={true}
        {...register("email")}
      />
      {errors?.email && (
     <Text color="#ff0000">
       {errors.email.message}
     </Text>
)}
      <Spacing />
      <Input
        label="Senha"
        placeholder="Digite a senha" 
        type="password"
        required={true}
        {...register("password")}
      />
      {errors?.password && 
      <Text color="#ff0000">
        {errors.password.message}
      </Text>
      }
      <Spacing />
      <Button
        label="ENTRAR"
        type="submit"
        variant="btn-primary"
      />
      <Spacing />
      <CreateAcc onClick={() => navigate("/register")}>Criar conta</CreateAcc>
    </form>
    )}
  </Body>
</Main>
  );
};
export default Login;