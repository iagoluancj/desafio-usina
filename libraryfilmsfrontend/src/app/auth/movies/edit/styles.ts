import styled from 'styled-components';

export const MoviesEdit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--fundoPrincipal);
  transform: translateY(100px); 
  opacity: 0;
  transform: scale(0.9);
  animation: fadeInZoom 0.5s ease forwards; 

  @keyframes slideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes fadeInZoom {
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

export const HeaderImageEdit = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    height: 300px;
    margin-bottom: 1rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .7);
    border-radius:  0px 0px 15px 15px;
  }
`;

export const TopImage = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;

  button {
    background-color: #ff6b6b;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem .3rem;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    box-shadow: 0 4px 8px rgba(0, 0, 0, .5);
    transition: .2s ease;

    &:hover {
      background-color: #ff5252;
      transform: scale(1.05);
      transition: .2s ease;
    }
  }

  span {
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

export const BottomImage = styled.div`
    position: absolute;
    bottom: .5rem;
    background-color: rgba(0, 0, 0, 0.7);
    border-top: 1px solid #52B788;
    border-left: 1px solid #52B788;
    border-right: 1px solid #52B788;
    padding: 1rem;
    border-radius: 15px;
    color: white;
    display: flex;
    flex-direction: column;
    text-align: center;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    span {
      font-size: 0.8rem;
      font-weight: 300;
    }
  }
`;

export const Avaliation = styled.div`
    z-index: 2;
    color: var(--textoPrimario);
    padding: 0rem 1rem;
    border-radius: 15px;
    background-color: #f7f7f710;
    border-top: 1px solid #52B788;
    border-left: 1px solid #52B788;
    border-right: 1px solid #52B788;
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
`;

export const RatingContainer = styled.div`  
    display: flex;
    align-items: center;
    justify-content: center;

    gap: .3rem;

    div {
        margin-top: 4px;
    }
`;

export const Description = styled.div`
    font-weight: 200;
    padding-top: .5rem;
    padding-bottom: .5rem;
    text-overflow: ellipsis;
    text-align: center;
    overflow: hidden;
    width: 100%;

    textarea {
      padding: .5rem;
      width: 100%;
      height: 100px;
      border-radius: 4px;
      background-color: #f7f7f710;
    }
`;

export const DescriptionAction = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    gap: .3rem;
    font-weight: 200;
    padding-bottom: .5rem;
`;

export const DescriptionActionClicked = styled.div`
    font-weight: 200;
    font-size: 12px;
    font-style: italic;
`;

export const EditIcon = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    transition: .2 ease;
`;

export const Button = styled.button`
    padding: .1rem .3rem;
    border-radius: 5px;
    background: linear-gradient(135deg, #52B788, #f7f7f7);
    border: 1px solid transparent;
    color: var(--cardsEComponents);

    font-size: 12px;
    font-weight: 500;
    
    &:hover {
      transform: scale(1.07);
      transition: .1s ease-in;

      border: 1px solid #52B788;
      background: #fff;
    }
`;

export const ButtonCancelled = styled(Button)`
    background: #B52E34;
    color: #fff;
      &:hover {
      transform: scale(1.07);
      transition: .1s ease-in;
      color: var(--cardsEComponents);

      border: 1px solid #B52E34;
      background: #fff;
    }
`;

export const Line = styled.div`
  margin: 3rem 0rem;
  width: 90%;
  height: 1px;
  background-color: #52B788;
`;

export const MoreItensIdea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 1rem;
`;

export const ActorCard = styled.div`
  display: flex;
  align-items: center;
`;

export const ActorPhoto = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border-top: 2px solid #52B788;
    border-left: 2px solid #52B788;
    border-bottom: 2px solid #52B788;  overflow: hidden;
    z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ActorName = styled.div`
  margin-left: -1rem;
  font-size: 12px;
  font-weight: 300;
  padding: .5rem 1rem;
  border-radius: 15px;

    border-right: 2px solid #52B788;
    border-top: 2px solid #52B788;
`;