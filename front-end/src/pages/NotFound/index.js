import styled from 'styled-components';
import { BsFillExclamationTriangleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container>
      <IconContainer>
        <BsFillExclamationTriangleFill />
      </IconContainer>
      <Title>404</Title>
      <Title>Page Not Found</Title>
      <TextLink>
        <Link to="/">Voltar para o início</Link>
      </TextLink>
    </Container>
  );
}

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

export const IconContainer = styled.div`
  font-size: 20rem;
  @media (max-width: 1024px) {
    font-size: 12rem;
  }
`;

export const Title = styled.h1`
  font-size: 4rem;
  margin: 1rem 0;
  @media (max-width: 1024px) {
    font-size: 2rem;
  }
`;

export const TextLink = styled.div`
  font-size: 2rem;
  margin: 4rem 0;
  a {
    color: inherit;
  }
  @media (max-width: 1024px) {
    font-size: 1.1rem;
    margin: 3rem 0;
  }
`;
