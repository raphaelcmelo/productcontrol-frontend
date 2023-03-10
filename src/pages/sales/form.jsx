import React, { useState } from 'react';
import { Content, Button, Input, Text, Loading} from "../../components";
import {SessionBtns} from "./styles";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import api from "../../services/api";


const Form = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object({
    product: yup.string().required("Campo obrigatório"),
    date_purchase: yup.string().required("Campo obrigatório"),
    productvalue_purchase: yup.string().required("Campo obrigatório"),
    unity_purchase: yup.string().required("Campo obrigatório"),
    total_money_purchase: yup.string()
  })

  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      productvalue_purchase: 0,
      unity_purchase: 0,
      total_money_purchase: 0,
    },
  })

  const productvalue = watch("productvalue_purchase");
  const unity = watch("unity_purchase");

  const session = JSON.parse(localStorage.getItem("cripto"));

  useEffect(() => {
    const total = productvalue * unity;
    setValue("total_money_purchase", total);
  }, [productvalue, unity, setValue]);

  const save = async (data) => {
    setLoading(true)
    try {
      data.productvalue_purchase = parseFloat(data.productvalue_purchase.replace(",", "."));
      data.unity_purchase = parseFloat(data.unity_purchase.replace(",", "."));
      data.total_money_purchase = parseFloat(data.total_money_purchase.replace(",", "."));
      data.date_purchase = new Date(data.date_purchase.replace(",", "."));

      await api.post("/sales", data,{
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      alert("Compra criada com sucesso!")
      setLoading(false);
      navigate("/sales");
    } catch (error) {
      setLoading(false);
      alert("Compra cancelada!");
      navigate("/sales");
          }
  }

  return (
    <Content>
      <form onSubmit={handleSubmit(save)}>
        <div className='container'>
            <div className='row'>
              <div className='col'>
                <Input {...register("product")} label="Nome" placeholder="Digite o produto"/>
                {errors?.product && <Text color="#ff0000">{errors.product?.message}</Text>}
              </div>
              <div className='col'>
              <Input {...register("date_purchase")} label="Data de compra" type="date"/>
              {errors?.date_purchase && <Text color="#ff0000">{errors.date_purchase?.message}</Text>}
              </div>
            </div>
            <div className='row'style={{marginBottom: 15}}>
              <div className='col'>
                <Input {...register("productvalue_purchase")} label="Valor da unidade (R$)" placeholder="Digite o valor unitário" type="number" step="any"/>
                {errors?.productvalue_purchase && <Text color="#ff0000">{errors.productvalue_purchase?.message}</Text>}
              </div>
              <div className='col'>
                <Input {...register("unity_purchase")} label="Quantidade" type="number" step="any"/>
                {errors?.unity_purchase && <Text color="#ff0000">{errors.unity_purchase?.message}</Text>}
              </div>
              <div className='col'>
                <Input {...register("total_money_purchase")} label="Valor total" type="number" readOnly step="any"/>
                {errors?.total_money_purchase && <Text color="#ff0000">{errors.total_money_purchase?.message}</Text>}
              </div>
            </div>
        </div>
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
            onClick={() => navigate("/sales")}
          />
        </SessionBtns> 
        </div>
        </form>
    </Content>
  )
}

export default Form