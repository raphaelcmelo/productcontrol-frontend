import styled from "styled-components";
import { AiOutlineHome, AiOutlineUser, AiOutlineShop, AiOutlineLogout } from "react-icons/ai";

const ICON = `
  color: #fff;
  font-size: 22px;
`

export const Menu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 260px;
  background-color: #000
`

export const Header = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 260px;
  height: 70px;
  background-color: #fff;
  box-shadow: 0px 1px 5px 1px rgba(0,0,0,1);
  align-items: center;
  justify-content: flex-end
`

export const Content = styled.div`
  margin-left: 280px;
  margin-top: 90px;
  margin-right: 20px;
  
`
export const Logo = styled.h3`
  color: #fff;
  text-align: center;
  padding: 30px;
`

export const Option = styled.div`
  display: flex;
  padding: 15px 20px;
  align-items: center;
 
  &:hover{
    background-color: #8c88883d;
    cursor: pointer;
  }
`

export const IconHome = styled(AiOutlineHome)`
  ${ICON}
`

export const TextMenu = styled.p`
  margin: 0;
  display: flex;
  padding-left: 10px;
  color: #fff;
  font-size: 19px
`

export const IconUser = styled(AiOutlineUser)`
  ${ICON}
`

export const IconShop = styled(AiOutlineShop)`
  ${ICON}
`

export const IconExit = styled(AiOutlineLogout)`
  ${ICON}
  color: #000;
  font-size: 27px;
  margin-right: 10px;
  cursor: pointer;
`

export const ExitText = styled.p`
  margin-top: 17px;
  color: #000;
  font-size: 21px;
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
  `