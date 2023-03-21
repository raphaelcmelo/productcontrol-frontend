import { Content, Button, Loading } from "../../components";
import { BodyBtn, SessionBtns }  from "./styles";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Sales = () => {

  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const session = JSON.parse(localStorage.getItem("cripto"));

const getSales = async () => {
    setLoading(true);
    try {
      const response = await api.get("/sales", {
        headers: {
          Authorization: `Bearer ${session.token}`,
        },
      });
      setSales(response?.data);
      setLoading(false);
    } catch (error) {
      alert("Não foi possível carregar as compras!")
      setLoading(false)
    }
}

useEffect(() => {
  getSales()
}, [] );

const convertValue = (value) => {
  if (value) {
  const convert = value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL"
  });
  return convert;
  }
  return '';
}

const removeSale = async (id) => {
  setLoading(true);
  const message = confirm("Tem certeza que deseja remover esta compra?");
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

  return (
    <>
      <Content>
        <BodyBtn>
          <Button
            label="Nova Compra"
            variant="btn-primary"
            onClick={() => navigate("/sales/form")}
            />
          </BodyBtn>
          {loading && <Loading />}
          {!loading &&
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Data de compra</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Valor Total</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {sales?.length ? 
              sales.map((data, index) => 
                <tr key={index}>
                  <td>{data.id}</td>
                  <td>{data.product}</td>
                  <td>{moment(data.date_purchase).format("DD/MM/YYYY hh:mm:ss")}</td>
                  <td>{data.unity_purchase}</td>
                  <td>{convertValue(data.productvalue_purchase)}</td>
                  <td>{convertValue(data.total_money_purchase)}</td>
                  <td>
                  <SessionBtns>
                    <Button label="Editar" variant="btn-success" onClick={() => navigate("/sales/form", { state: { id: data.id }})}/>
                    <Button label="Excluir" variant="btn-danger" onClick={() => removeSale(data.id)} />
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

export default Sales;