import { Form } from "@/app/login/styles";
import styled, { keyframes } from "styled-components";

const fadeInRigth = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const MovieContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const MovieData = styled.div`

`

export const MoviesContainer = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30rem;
      width: 100%;
      animation: ${fadeInRigth} 0.8s ease-out forwards;

      @media (max-width: 1632px) {
        padding: 20rem;
      }

      @media (max-width: 1300px) {
        padding: 10rem;
      }

      @media (max-width: 974px) {
        padding: 3rem;
      }

      
      @media (max-width: 782px) {
        padding: 1rem;
      }
`
export const HeaderImage = styled.div`
  position: absolute;
  top: 0rem;
  z-index: 0;
  width: 100%;
  height: 400px;

  img {
    object-fit: cover;  
    width: 100%;         
    height: 50%;      
  }
`

export const HeaderMovies = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 1rem;
    width: 100%;
    z-index: 1;

    @media (min-width: 1300px) {
      margin-top: -10rem;
    }

    @media (min-width: 1632px) {
      margin-top: -20rem;
    }

    h1 {
      font-weight: bold;
      color: var(--buttonPrimario);
      text-shadow: 
        -1px -1px 0 #00000050, 
        1px -1px 0 #00000050, 
        -1px 1px 0 #00000050,  
        1px 1px 0 #00000050;   
      }

    p {
      font-weight: 400;
      font-size: 15px;
      margin-bottom: 1rem;
      text-shadow: 
        -1px -1px 0 #00000050, 
        1px -1px 0 #00000050, 
        -1px 1px 0 #00000050,  
        1px 1px 0 #00000050;   
      }
`
export const Search = styled.div`
      display: flex;
      position: relative;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
    
    span {
        position: absolute;
        left: 7px; 
        white-space: nowrap; 
    }

    input {
      padding-left: 1rem;
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
      background-color: var(--cardsEComponents);
      padding: .2rem 1rem;
      padding-left: 2rem;
      width: 100%;

      outline-style: none; 

      border-top: 2px solid #52B788;
      border-left: 2px solid #52B788;
      border-right: 2px solid #52B788;
      border-radius: 30px;
      transition: .1s ease-out;

      &::placeholder {
        font-weight: 700 !important;
        font-size: 12px;
      } 
      
      font-weight: 300;
    }
`

export const FormMovies = styled(Form)`
    margin-bottom: 5rem;
    padding-bottom: 7rem;

    input, textarea {
        color: red;
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

export const CardsFilms = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  z-index: 1;

  > div {
    display: flex;
    flex-direction: column;
    gap: 10px;

    h2 {
      font-size: 1.2rem;
      font-weight: bold;
      color: #ffffff;
    }

    .cards-container {
      display: flex;
      gap: 15px;
      overflow-x: auto;
      padding-bottom: 10px;

      &::-webkit-scrollbar {
        height: 9px;
        cursor: pointer;
      }
      &::-webkit-scrollbar-track {
        background-color: #2c2c2c; 
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #52B788; 
        border-radius: 10px;
        border: 2px solid #2c2c2c; 
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #379c6b; 
        cursor: pointer;
      }
    }
  }
`;

export const MovieCard = styled.div`
  flex: 0 0 auto;
  width: 120px;
  height: 180px;
  border-radius: 8px;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
  position: relative;
  padding: 10px;
  text-align: center;

  opacity: 0;
  transform: scale(0.9);
  animation: fadeInZoom 0.5s ease forwards;

  cursor: pointer;

  img {
    width: 100%;         
    height: 100%;        
    object-fit: cover;  
    position: absolute;  
    top: 0;
    left: 0;
  }

  @keyframes fadeInZoom {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const Rating = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffd700;
  border-radius: 4px;
  padding: 2px 6px;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  
  svg {
    margin-left: 4px;
  }
`;

export const MovieTitle = styled.h3`
  font-size: 0.9rem;
  margin-top: 10px;
  color: #ddd;
`;