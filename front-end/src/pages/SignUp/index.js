import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import ButtonForm from '../../components/Form/Button';
import InputForm from '../../components/Form/Input';
import StaticLogo from '../../components/StaticLogo';
import UserContext from '../../contexts/UserContext';
import useSignUp from '../../hooks/api/useSignUp';

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const { signUpLoading, signUp } = useSignUp();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData.token) {
      navigate('/dashboard');
    }
  }, []);

  function handleForm(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  async function submit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error('As senhas devem ser iguais!');
    } else {
      try {
        const body = {
          name: form.name,
          email: form.email,
          password: form.password,
        };

        await signUp(body);
        toast.success('Inscrito com sucesso! Por favor, faça login.');
        navigate('/');
      } catch (error) {
        toast.error('Não foi possível fazer o cadastro!');
      }
    }
  }

  return (
    <PageContainer>
      <StaticLogo />
      <FormContainer onSubmit={submit}>
        <InputForm
          label="Nome"
          id="name"
          name="name"
          value={form.name}
          onChange={handleForm}
          type="text"
          placeholder="Digite seu nome"
          disabled={signUpLoading}
          autoComplete="off"
          required
        />
        <InputForm
          label="Email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleForm}
          type="email"
          placeholder="exemplo@email.com"
          disabled={signUpLoading}
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
          minLength={6}
          disabled={signUpLoading}
          required
        />
        <InputForm
          label="Confirmar senha"
          id="confirmPassword"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleForm}
          type="password"
          placeholder="Confirme sua senha"
          minLength={6}
          disabled={signUpLoading}
          required
        />
        <ButtonForm type="submit" disabled={signUpLoading}>
          Cadastrar
        </ButtonForm>
      </FormContainer>
      {signUpLoading ? (
        <TextLink disabled={signUpLoading}>Já tem uma conta? Faça o login!</TextLink>
      ) : (
        <TextLink disabled={signUpLoading}>
          <Link to={'/'}>
            <p>Já tem uma conta? Faça o login!</p>
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
