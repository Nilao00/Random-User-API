import styled from 'styled-components';

export const Card = styled.div`
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
`;

export const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #dc2626;
  }
`;

export const ButtonEdit = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    background-color: #2563eb;
  }
`;  