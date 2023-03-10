import { Content, Input, Text, Button, Loading } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SessionBtns } from "./styles"
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../services/api"
import { useState, useEffect } from "react";

const Create = () => {
const [loading, setLoading] = useState(false);
const navigate = useNavigate();

const location = useLocation();


const session = JSON.parse(localStorage.getItem("cripto"));

  const schema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    cpf: yup.string().required("Campo obrigatório").length(11, "CPF inválido"),
    password: yup.string().required("Campo obrigatório").min(6, "Mínimo 6 caracteres"),
  })

  const schemaUpdate = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório").email("Email inválido"),
    password: yup.string(),
  })

  const { handleSubmit, register, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(location?.state?.id ? schemaUpdate : schema)
  })

  const save = async (data) => {
    setLoading(true)
    try {
      if(!location?.state?.id) {
        await api.post("/user", data, {
            headers: {
              Authorization: `Bearer ${session.token}`,
            },
          });
          alert("Usuário criado com sucesso!")
          setLoading(false)
          navigate("/users");
      } else {
        await api.put(`/user/${location?.state?.id}`, data, {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
        });
        alert("Usuário editado com sucesso!")
        setLoading(false)
        navigate("/users");
      }
    } catch (error) {
      alert("Não foi possível realizar a operação, tente novamente")
      setLoading(false)
    }
  };

  const getUserById = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/user/${location?.state?.id}`, {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setValue("name", response?.data?.name)
      setValue("email", response?.data?.email)
      setValue("cpf", response?.data?.cpf)
      setValue("password", response?.data?.password)

      setLoading(false)
    } catch (error) {
      alert("Não foi possível realizar a operação!")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location?.state?.id) getUserById()
  }, []);
  

  return( 
    <Content>
      {loading && <Loading />}
      {!loading && (
        <form onSubmit={handleSubmit(save)}>
        <Input {...register("name")}
          label="Nome"
        />
        {errors?.name && <Text color="#ff0000">{errors.name?.message}</Text>}
        <div style={{marginTop: "10px"}} />
        <Input {...register("email")}
          label="Email"
          type="email"
        />
        {errors?.email && <Text color="#ff0000">{errors.email?.message}</Text>}
        <div style={{marginTop: "10px"}} />
        <Input {...register("cpf")}
          label="CPF"
        />
        {errors?.cpf && <Text color="#ff0000">{errors.cpf?.message}</Text>}
        <div style={{marginTop: "10px"}} />
        <Input {...register("password")}
          label="Senha"
          type="password"
        />
        {errors?.password && <Text color="#ff0000">{errors.password?.message}</Text>}
        <div style={{marginTop: "30px",alignItems: "center", justifyContent: "center", display: "flex"}}>
        <SessionBtns>
          <Button
            label="SALVAR"
            type="submit"
            variant="btn-primary"
          />
          <Button
            label="LIMPAR"
            type="reset"
            variant="btn-warning"
          />
          <Button
            label="CANCELAR"
            variant="btn-danger"
            onClick={() => navigate("/users")}
          />
        </SessionBtns>  
        </div>
      </form>)}
    </Content>
  )
}

export default Create;