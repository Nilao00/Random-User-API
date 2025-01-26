import styled from 'styled-components';

export const Nav = styled.nav`
  padding: 1rem;
  background-color: #1f2937;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavLinks = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;