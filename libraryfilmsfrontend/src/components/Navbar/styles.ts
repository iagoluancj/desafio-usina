import styled from "styled-components";

// Simples navbar; 

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #333;
  padding: .5rem 1rem;
  width: 100%;
  color: white;

  position: sticky;
  top: 0rem;

  z-index: 2;
`;

export const NavLogo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;
`;

export const NavLink = styled.li`
  color: #fff;
  cursor: pointer;
  
  &:hover {
    color: #ddd;
  }
`;

export const NavButton = styled.button`
    display: flex;
    gap: .5rem;
    align-items: center;
    justify-content: center;

    padding: 0.2rem .5rem;
    background: #ff6b6b;
    border: 2px solid transparent;
    color: var(--textoPrimario);
    border-radius: 5px;
    cursor: pointer;
    transition: .2s ease-out;
  
  &:hover {
    background-color: var(--textoPrimario);
    color: white;
    border: 1px solid #ff6b6b;
    color: #ff6b6b;

    transform: scale(1.05);

    transition: .2s ease-in;
  }
`;