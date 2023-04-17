import styled from 'styled-components';
import { loadingPage } from '../../assets/styles/LoadingPage';

export default function LoadingPage() {
  return (
    <LoadingContainer>
      {loadingPage}
      <p>Carregando...</p>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    font-size: 1.5rem;
    color: #ffffff;
    margin-top: 0.5rem;
  }
`;
