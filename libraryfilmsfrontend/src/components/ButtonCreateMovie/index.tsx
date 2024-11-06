import React from 'react';
import { StyledButton } from './styles';
import { BiPlus } from 'react-icons/bi';

// Simples botão flutuante. 

interface ButtonCreateMovieProps {
    onClick: () => void; 
}

const ButtonCreateMovie: React.FC<ButtonCreateMovieProps> = ({ onClick }) => {
    return (
        <StyledButton onClick={onClick}>
            <BiPlus size={25} />
            <span>Adicionar</span>
            <span> novo filme</span>
        </StyledButton>
    )
};

export default ButtonCreateMovie;
