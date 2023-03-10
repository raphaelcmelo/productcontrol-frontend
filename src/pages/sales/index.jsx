import { useEffect, useState } from "react";
import { Content, Button, Loading } from "../../components";
import { BodyBtn, SessionBtns }  from "./styles";
import api from "../../services/api";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Sales = () => {

const [loading, setLoading] = useState(false);
const session = JSON.parse(localStorage.getItem("cripto"));
const [sales, setSales] = useState([]);
const navigate = useNavigate();

const getSales = async () => {
    setLoading(true);

    try {
      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setSales(response?.data);
      setLoading(false)
    } catch (error) {
      alert("Não foi possível carregar as compras!")
      setLoading(false)
    }
}

const removeSale = async (id) => {
  setLoading(true)
  const message = confirm("Tem certeza que deseja remover esta compra?")
  try {
    if(message){
    await api.delete(`/sales/${id}`, {
      headers: {
        Authorization: `Bearer ${session.token}`,
      },
    });
    getSales();
  }
    setLoading(false);
} catch (error) {
  alert("Não foi possível excluir a compra")
  setLoading(false);
}
}

  useEffect(() => {
    getSales()
  }, [] )

  // useEffect(() => {
  //   console.log(sales)
  // }, [sales])

const convertValue = (value) => {
  const convert = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  })
  return convert
}

  return (
      <Content>
        <BodyBtn>
          <Button
            label="Nova Compra"
            variant="btn-primary"
            onClick={() => navigate("/sales/form")}
            />
          </BodyBtn>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Data de compra</th>
                <th>Valor</th>
                <th>Quantidade</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sales?.length ? 
              sales.map((data, index) =>
                <tr key="index">
                  <td>{data.id}</td>
                  <td>{data.product}</td>
                  <td>{moment(data.date_purchase).format("DD/MM/YYYY hh:mm:ss")}</td>
                  <td>{convertValue(data.productvalue_purchase)}</td>
                  <td>{data.unity_purchase}</td>
                  <td>{convertValue(data.total_money_purchase)}</td>
                  <td>
                  <SessionBtns>
                    <Button label="Editar" variant="btn-success" onClick={() => navigate("/sales/create", { state: { id: data.id }})}/>
                    <Button label="Excluir" variant="btn-danger" onClick={() => removeSale(data.id)} />
                </SessionBtns>
                  </td>
                </tr>
              ) 
              : null}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
      </Content>
    )
}

export default Sales;