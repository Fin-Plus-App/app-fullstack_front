import Header from '../../components/Header';
import styled from 'styled-components';
import { IoPersonCircle } from 'react-icons/io5';
import InputForm from '../../components/Form/Input';
import ButtonForm from '../../components/Form/Button';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserContext from '../../contexts/UserContext';
import useUpdateUser from '../../hooks/api/useUpdateUser';
import LoadingPage from '../../components/LoadingPage';

export default function UserInfos() {
  const { userData, setUserData } = useContext(UserContext);
  const [form, setForm] = useState({
    name: '',
    email: '',
    pictureUrl: '',
  });
  const { updateUser, updateUserLoading } = useUpdateUser();

  useEffect(() => {
    if (userData.user.pictureUrl === null) {
      setForm({ name: userData.user.name, email: userData.user.email, pictureUrl: '' });
    } else {
      setForm({ name: userData.user.name, email: userData.user.email, pictureUrl: userData.user.pictureUrl });
    }
  }, [userData]);

  if (!userData) {
    return <LoadingPage />;
  }

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const pictureUrl = form.pictureUrl;
      let body = {
        name: form.name,
        email: form.email,
      };

      if (pictureUrl !== '') {
        body = {
          name: form.name,
          email: form.email,
          pictureUrl: form.pictureUrl,
        };
      }

      const result = await updateUser(body);
      setUserData({ ...userData, user: result.user });
      toast.success('Informações salvas com sucesso!');
    } catch (error) {
      toast.error('Não foi possível salvar suas informações!');
    }
  }

  return (
    <PageContainer>
      <Header />
      <PageTitle>Informações do perfil</PageTitle>
      <UserInfosContainer>
        <UserPicture>
          {userData.user.pictureUrl ? (
            <img src={userData.user.pictureUrl} alt="Imagem do usuário" />
          ) : (
            <IoPersonCircle />
          )}
        </UserPicture>
        <FormContainer onSubmit={submit}>
          <InputForm
            label="Email"
            id="email"
            name="email"
            value={form.email}
            type="email"
            placeholder="exemplo@email.com"
            disabled={true}
            required
          />
          <InputForm
            label="Nome"
            id="name"
            name="name"
            value={form.name}
            onChange={handleForm}
            type="text"
            placeholder="Digite seu nome"
            disabled={updateUserLoading}
            autoComplete="off"
            required
          />
          <InputForm
            label="Imagem"
            id="pictureUrl"
            name="pictureUrl"
            value={form.pictureUrl}
            onChange={handleForm}
            type="url"
            placeholder="http://example.com"
            disabled={updateUserLoading}
            autoComplete="off"
          />
          <ButtonForm type="submit" disabled={updateUserLoading}>
            Atualizar
          </ButtonForm>
        </FormContainer>
      </UserInfosContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: #ffffff;
  margin-top: 4rem;

  @media (min-width: 1024px) {
    margin-top: 6rem;
  }
`;

const PageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 1.5rem;
  text-align: center;
  cursor: pointer;

  @media (min-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const UserInfosContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-top: 4rem;
  border: 1px solid #cecece;
  border-radius: 1rem;
`;

const UserPicture = styled.div`
  font-size: 10rem;

  img {
    width: 8.125rem;
    height: 8.125rem;
    border-radius: 50%;
    border: 2px solid #cecece;
    margin: 1rem;

    @media (min-width: 1024px) {
      width: 10rem;
      height: 10rem;
    }
  }

  @media (min-width: 1024px) {
    font-size: 12rem;
  }
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;
