import styled from 'styled-components';


export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

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
export const SelectCount = styled.select`
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



