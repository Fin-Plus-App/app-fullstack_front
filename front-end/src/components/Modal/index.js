import Modal from 'react-modal';
import './style.css';
import styled from 'styled-components';
import { loadingButton } from '../../assets/styles/LoadingButton';

Modal.setAppElement('#root');

export function ModalComponent({ title, close, confirm, modalIsOpen, setIsOpen, propsFunction, loading }) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
        <Title>{title}</Title>
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
`;

export const ButtonContainer = styled.div`
  width: 9rem;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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
`;
