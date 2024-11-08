import React from 'react';
import { NavBar, NavButton, NavLink, NavLinks, NavLogo } from './styles';
import { LuLogOut } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

// Simples navbar; 

interface NavbarProps {
    message: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({ message }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('userSession');
        localStorage.clear();

        document.cookie.split(';').forEach((cookie) => {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        });

        router.push('/login');
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