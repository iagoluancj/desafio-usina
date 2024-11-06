import React from 'react';
import { NavBar, NavButton, NavLink, NavLinks, NavLogo } from './styles';
import { LuLogOut } from 'react-icons/lu';

// Simples navbar; 

interface NavbarProps {
    message: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ message }) => {
    const handleLogout = () => {
        localStorage.removeItem('userSession');

        localStorage.clear();

        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });

        window.location.href = '/login';
    };

    return (
        <NavBar>
            <NavLogo>Logo</NavLogo>
            <NavLinks>
                <NavLink>{message}</NavLink>
            </NavLinks>
            <NavButton onClick={handleLogout}>Sair <LuLogOut /></NavButton>
        </NavBar>
    );
};

export default NavbarComponent;