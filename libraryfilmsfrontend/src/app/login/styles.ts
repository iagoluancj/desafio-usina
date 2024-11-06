import styled from "styled-components";

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    padding: 1rem;

    color: var(--textoPrimario);
    z-index: 1;

    div {
        z-index: 1;
    }
`

export const LoginHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 1rem 0rem;
    gap: .5rem;

    text-align: center;

    h1 {
        font-weight: 700;
        font-size: 24px;
    }
`


export const Elipse = styled.div`
    background: linear-gradient(135deg, #52B788, #f7f7f7);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border-top: 4px solid #52B788;
    border-left: 4px solid #52B788;
    border-right: 4px solid #52B788;

    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    z-index: 1;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%; 
    }
`

export const Vector = styled.div`
    position: absolute;
    margin-left: -500px;
    margin-top: -700px;
    background: rgba(255, 255, 255, .3);
    width: 100px;
    border-radius: 50% 50% 50% 50%;
    height: 100px;
    opacity: 1;
    box-shadow: 0px 0px 100px rgba(255, 255, 255, 1);
    z-index: 0;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    gap: 1.3rem;
    transition: transform 1s ease;

    .form-container {
        transition: transform 1s ease;
    }

    .rotate-positive {
        transform: rotateY(180deg);
    }

    .rotate-negative {
        transform: rotateY(0deg);
    }


    .div-container {
        opacity: 0;
        transition: opacity 0.5s ease-in; 
    }

    .rotate-positive-failed {
    opacity: 1; 
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.3rem;

    transition: transform 1s ease;

    ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    list-style-type: none; 
    padding: 1rem; 
    margin: 0; 
    background-color: var(--cardsEComponents); 
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

li {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-weight: 300;
    font-size: 12px;
    gap: 1rem;
    padding: 0.5rem;
    border-bottom: 1px solid var(--buttonPrimario); 

    p {
        font-size: 16px;
    }
}

li:last-child {
    border-bottom: none; 
}
`

export const FormAnimation = styled(FormContainer)`
`

export const Button = styled.button`
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
    background-color: var(--cardsEComponents);
    padding: .5rem 4rem;
    font-weight: 700;

    border-top: 2px solid #52B788;
    border-left: 2px solid #52B788;
    border-right: 2px solid #52B788;
    border-radius: 30px;
    transition: .1s ease-out;

    &:hover {
        transform: scale(1.05);
        transition: .1s ease-in;
        border-top: 2px solid var(--textoPrimario);
        border-left: 2px solid var(--textoPrimario);
        border-right: 2px solid var(--textoPrimario);

        background-color: var(--buttonPrimario);
    }
`

export const SignInUp = styled.button`
    font-weight: 200;

    &:hover {
        text-decoration: underline;
        text-decoration-color: var(--buttonPrimario);
    }
`

export const FailedLogin = styled(SignInUp)`
`
