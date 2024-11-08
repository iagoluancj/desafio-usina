import React from 'react';
import { StyledButton } from './styles';
import { BiPlus } from 'react-icons/bi';

// Simples botão flutuante. 

interface ButtonCreateMovieProps {
    onClick: () => void; 
    className?: string;
}

const ButtonCreateMovie: React.FC<ButtonCreateMovieProps> = ({ onClick, className }) => {
    return (
        <StyledButton className={className} onClick={onClick}>
            <BiPlus size={25} />
            <span>Adicionar</span>
            <span> novo filme</span>
        </StyledButton>
    )
};

export default ButtonCreateMovie;
