import styled from 'styled-components';
import { loadingButton } from '../../assets/styles/LoadingButton';

export default function ButtonForm({ type, disabled, children }) {
  return (
    <ButtonContainer>
      {disabled ? (
        <ButtonStyle disabled={disabled}>{loadingButton}</ButtonStyle>
      ) : (
        <ButtonStyle type={type} disabled={disabled}>
          {children}
        </ButtonStyle>
      )}
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
`;

const ButtonStyle = styled.button`
  min-width: 9rem;
  max-width: 16rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 2.5rem;
  border: none;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  background: #1e90ff;
  cursor: ${(props) => (props.disabled ? 'cursor' : 'pointer')};
`;
