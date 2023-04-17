import { useContext, useState } from 'react';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { IoPersonCircle } from 'react-icons/io5';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BiLogOut } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

export default function Header() {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserContext);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [hamburguerMenuOpen, setHamburguerMenuOpen] = useState(false);

  function logOut() {
    localStorage.removeItem('userData');
    setUserData({});
    navigate('/');
  }

  function closeMenus() {
    setDropdownMenuOpen(false);
    setHamburguerMenuOpen(false);
  }

  if (!userData || JSON.stringify(userData) === '{}') {
    return <></>;
  }

  return (
    <HeaderContainer>
      <PageMenu>
        <HamburguerMenu onClick={() => setHamburguerMenuOpen(!hamburguerMenuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </HamburguerMenu>
        {hamburguerMenuOpen && (
          <Menu>
            <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
            <MenuItem onClick={() => navigate('/carteira')}>Minha Carteira</MenuItem>
            <MenuItem onClick={() => navigate('/compra')}>
              Registrar Compra
              <PlusIcon>
                <FaPlusCircle />
              </PlusIcon>
            </MenuItem>
            <MenuItem onClick={() => navigate('/venda')}>
              Registrar Venda
              <MinusIcon>
                <FaMinusCircle />
              </MinusIcon>
            </MenuItem>
            <MenuItem onClick={() => navigate('/registros')}>Registros</MenuItem>
          </Menu>
        )}
        <Logo>
          <Link to="/dashboard">fin+</Link>
        </Logo>
      </PageMenu>
      <UserInfos>
        <UserName>{userData.user.name}</UserName>
        {userData.user.pictureUrl ? (
          <UserImage src={userData.user.pictureUrl} alt="avatar" />
        ) : (
          <UserAvatar>
            <IoPersonCircle />
          </UserAvatar>
        )}
        <Options onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}>
          {dropdownMenuOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          {dropdownMenuOpen && (
            <DropdownMenuActive>
              <Link to="/usuario">
                <Option color="#00488E">
                  <IoPersonCircle />
                  <h3>Conta</h3>
                </Option>
              </Link>
              <Option onClick={logOut} color="#d52b2b">
                <BiLogOut />
                <h3>Sair</h3>
              </Option>
            </DropdownMenuActive>
          )}
        </Options>
      </UserInfos>
      <OverlayMenu onClick={closeMenus} menuOpen={dropdownMenuOpen || hamburguerMenuOpen}></OverlayMenu>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 4rem;
  background: #111111;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  @media (min-width: 1024px) {
    height: 5rem;
  }
`;

const OverlayMenu = styled.div`
  display: ${(props) => (props.menuOpen ? 'initial' : 'none')};
  position: fixed;
  top: 4rem;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background: rgba(0, 0, 0, 0);
`;

const PageMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;

  p {
    margin-right: 1rem;
  }
`;

const Logo = styled.h2`
  font-family: 'Alkatra', cursive;
  font-size: 2rem;
  font-weight: 500;
  color: #ffffff;
  text-align: start;
  cursor: pointer;

  @media (min-width: 1024px) {
    font-size: 2.5rem;
  }

  a:visited {
    color: #ffffff;
  }
`;

const UserInfos = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const UserName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  margin-right: 0.5rem;

  @media (min-width: 1024px) {
    font-size: 1.2rem;
    margin-right: 1rem;
  }
`;

const UserImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;

  @media (min-width: 1024px) {
    width: 3rem;
    height: 3rem;
  }
`;

const UserAvatar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
  color: #ffffff;

  @media (min-width: 1024px) {
    font-size: 3rem;
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;

  @media (min-width: 1024px) {
    font-size: 1.8rem;
    margin-left: 1rem;
  }
`;

const DropdownMenuActive = styled.div`
  width: 7.825rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 3.75rem;
  right: 0;
  border-radius: 0.3rem;
  padding: 0.625rem 1.25rem;
  z-index: 3;
  background: #ffffff;

  @media (min-width: 1024px) {
    width: 9rem;
  }

  &::before {
    content: '';
    position: absolute;
    top: -0.3rem;
    right: 0.625rem;
    height: 1.25rem;
    width: 1.25rem;
    z-index: 3;
    transform: rotate(45deg);
    background: #ffffff;
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  font-size: 1.2rem;
  color: #000000;
  margin-top: 0.8rem;

  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }

  &:hover {
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

const HamburguerMenu = styled.div`
  margin-right: 1rem;
  cursor: pointer;
  div {
    width: 2rem;
    height: 0.125rem;
    background: #ffffff;
    margin: 0.5rem;

    @media (min-width: 1024px) {
      width: 2.5rem;
      height: 0.15rem;
    }
  }
`;

const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  list-style-type: none;
  background-color: #ffffff;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 5rem;
  left: 1rem;
  border-radius: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  z-index: 3;
`;

const MenuItem = styled.li`
  width: 100%;
  display: flex;
  padding: 0.8rem 1.2rem;
  font-family: 'Comfortaa', cursive;
  font-weight: 700;
  font-size: 1.2rem;
  color: #000000;
  border-radius: 0.4rem;
  cursor: pointer;

  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }

  &:hover {
    background-color: #00488e;
    color: #ffffff;
  }
`;

const PlusIcon = styled.div`
  margin-left: 1rem;
  color: #008000;
`;

const MinusIcon = styled(PlusIcon)`
  color: #ff0000;
`;
