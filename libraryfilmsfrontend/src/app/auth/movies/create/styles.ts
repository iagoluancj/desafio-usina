import { Button, Form } from "@/app/login/styles";
import styled, { keyframes } from "styled-components";

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const BackButton = styled(Button)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: .5rem 1rem;
    gap: 1rem;
    font-size: 14px;
`;

export const CreateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    animation: ${fadeInLeft} 0.8s ease-out forwards;
`;

export const FormMovies = styled(Form)`
    margin-bottom: 3rem;

    input, textarea {
    }

    button {
        background: linear-gradient(135deg, #52B788, #f7f7f7);
        color: var(--cardsEComponents);
        font-weight: 700;
        border: 2px solid transparent;
        transition: .2s ease;

        &:hover {
            border: 2px solid var(--buttonPrimario);
            background: var(--textoPrimario);
            color: var(--buttonPrimario);
            transform: scale(1.05);

            transition: .2s ease-in;
        }
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.3rem;

    @media (max-width: 733px) {
        flex-direction: column;
    }
`;

export const DurationInputWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    gap: 5px;

    span {
        position: absolute;
        right: 20px; 
        color: var(--cardsEComponents);
        white-space: nowrap; 
    }
`;