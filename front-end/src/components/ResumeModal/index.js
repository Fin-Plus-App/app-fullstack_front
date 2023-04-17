import Modal from 'react-modal';
import './style.css';
import styled from 'styled-components';
import { loadingButton } from '../../assets/styles/LoadingButton';

Modal.setAppElement('#root');

export function ResumeModalComponent({ title, text, close, confirm, modalIsOpen, setIsOpen, propsFunction, loading }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="ResumeModal">
        <Title>{title}</Title>
        {text && (
          <TextContent>
            <div>
              <p>Ticker:</p>
              <p>{text.ticker}</p>
            </div>
            <div>
              <p>Preço Unitário:</p>
              <p>R$ {text.price}</p>
            </div>
            <div>
              <p>Quantidade:</p>
              <p>{text.amount}</p>
            </div>
            <div>
              <p>Total:</p>
              <p>R$ {text.totalPrice}</p>
            </div>
            <div>
              <p>Data:</p>
              <p>{text.date}</p>
            </div>
            <div>
              <p>Tipo:</p>
              <p>{text.status}</p>
            </div>
          </TextContent>
        )}
        {loading ? (
          <ButtonContainer>
            <Close disabled={loading}>{close}</Close>
            <Comfirm disabled={loading}>{loadingButton}</Comfirm>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <Close onClick={closeModal} disabled={loading}>
              {close}
            </Close>
            <Comfirm onClick={propsFunction} disabled={loading}>
              {confirm}
            </Comfirm>
          </ButtonContainer>
        )}
      </Modal>
    </div>
  );
}

export const Title = styled.h2`
  width: 10rem;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 1rem;
  color: #ffffff;
  text-align: center;

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

export const TextContent = styled.h2`
  width: 12rem;
  display: flex;
  flex-direction: column;
  font-weight: 400;
  font-size: 0.9rem;
  color: #ffffff;
  text-align: center;
  margin-top: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    margin: 0.2rem 0;
  }

  p {
    text-align: center;
  }

  @media (min-width: 1024px) {
    width: 17rem;
    font-size: 1.3rem;
  }
`;

export const ButtonContainer = styled.div`
  width: 9rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  @media (min-width: 1024px) {
    width: 14rem;
  }
`;

export const Close = styled.button`
  width: 4rem;
  height: 1.5rem;
  background: #ffffff;
  border-radius: 0.3rem;
  border: none;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  color: #1877f2;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: 6rem;
    height: 2rem;
    font-size: 1rem;
  }
`;

export const Comfirm = styled.button`
  width: 4rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1877f2;
  border-radius: 0.3rem;
  border: none;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 0.6rem;
  color: #ffffff;
  cursor: pointer;

  @media (min-width: 1024px) {
    width: 6rem;
    height: 2rem;
    font-size: 1rem;
  }
`;
