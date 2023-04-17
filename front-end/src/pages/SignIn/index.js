import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ButtonForm from '../../components/Form/Button';
import InputForm from '../../components/Form/Input';
import Logo from '../../components/Logo';
import UserContext from '../../contexts/UserContext';
import useSignIn from '../../hooks/api/useSignIn';

export default function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const { signInLoading, signIn } = useSignIn();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(userData).length !== 0) {
      navigate('/dashboard');
    }
  }, [userData]);

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function submit(event) {
    event.preventDefault();

    try {
      const body = {
        email: form.email,
        password: form.password,
      };

      const user = await signIn(body);
      setUserData(user);
      toast.success('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Não foi possível fazer o login!');
    }
  }

  return (
    <PageContainer>
      <Logo />
      <FormContainer onSubmit={submit}>
        <InputForm
          label="Email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          type="email"
          placeholder="exemplo@email.com"
          disabled={signInLoading}
          autoComplete="off"
          required
        />
        <InputForm
          label="Senha"
          id="password"
          name="password"
          value={form.password}
          onChange={handleForm}
          type="password"
          placeholder="Digite a senha"
          disabled={signInLoading}
          required
        />
        <ButtonForm type="submit" disabled={signInLoading}>
          Entrar
        </ButtonForm>
      </FormContainer>
      {signInLoading ? (
        <TextLink disabled={signInLoading}>
          <p>Não tem uma conta? Cadastre-se!</p>{' '}
        </TextLink>
      ) : (
        <TextLink disabled={signInLoading}>
          <Link to={'/sign-up'}>
            <p>Não tem uma conta? Cadastre-se!</p>{' '}
          </Link>
        </TextLink>
      )}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextLink = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  p {
    text-decoration: underline;
    font-size: 1rem;
    color: ${(props) => (props.disabled ? '#cecece' : '#ffffff')};
    cursor: pointer;
  }
`;
