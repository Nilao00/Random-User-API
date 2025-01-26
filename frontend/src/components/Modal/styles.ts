import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const Label = styled.label`
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.5rem;
  display: flex;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  background-color: #3b82f6;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 1rem;
  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Modal = styled.div`
  background: #fff;
  padding: 50px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;  
  max-height: 500px;
`;

export const ModalContent = styled.div`
  margin-top: 10px;
`;