import { Menu, Header, Content, Logo, Option, IconHome, TextMenu, IconShop, IconUser, IconExit, ExitText } from "./styles";
import { useNavigate } from "react-router-dom";

const MenuComponent = ({ children }) => {
  const navigate = useNavigate();
  return (
    <>
      <Header>
        <IconExit />
        <ExitText> Logout </ExitText>
      </Header>
      <Menu>
        <Logo>Logo</Logo>
        <Option onClick={() => navigate ("/") }>
          <IconHome />
          <TextMenu>
            Home
          </TextMenu>
        </Option>
        <Option onClick={() => navigate ("/users") }>
          <IconUser />
          <TextMenu>
            Usuários
          </TextMenu>
        </Option>
        <Option onClick={() => navigate ("/sales") }>
          <IconShop />
          <TextMenu>
            Compras
          </TextMenu>
        </Option>
      </Menu>
      <Content>
        {children}
      </Content>
    </>
  )
}

export default MenuComponent;