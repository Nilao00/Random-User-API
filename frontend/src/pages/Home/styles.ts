import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: #1f2937;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  color: #4b5563;
  margin-top: 1rem;
`;

export const Button = styled(Link)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: #3b82f6;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;