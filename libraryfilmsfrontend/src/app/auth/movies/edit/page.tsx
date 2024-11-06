/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import userAuth from "@/utils/userAuth";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ActorCard, ActorName, ActorPhoto, Avaliation, BottomImage, Button, ButtonCancelled, Description, DescriptionAction, DescriptionActionClicked, EditIcon, HeaderImageEdit, Line, MoreItensIdea, MoviesEdit, RatingContainer, TopImage } from "./styles";
import { SupaContext } from "@/Context/context";
import { useRouter } from "next/navigation";
import NavbarComponent from "@/components/Navbar";

import Cookies from 'js-cookie';

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

import DevilMan from '../../../../assets/filmImage3.jpg'

import Image from "next/image";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";

function MovieEdit() {
    const { movieEdit } = useContext(SupaContext)
    const [ratingValue, setRatingValue] = useState(movieEdit?.rating);
    const [description, setDescription] = useState(movieEdit?.movies.description || "");
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const router = useRouter();

    let inactivityTimeout: NodeJS.Timeout;

    const updateRating = async (newValue: number) => { // Fetch para atualziação do rating.
        if (!movieEdit?.id) return;
        const userCookie = Cookies.get('user');

        try {
            const response = await fetch(`http://localhost:3001/reviews/${movieEdit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rating: newValue, user_id: userCookie }),
            });
            if (response.ok) {
            } else {
            }
        } catch (error) {
            toast.error("Erro ao atualizar a avaliação.");
            console.error("Erro ao atualizar avaliação:", error);
        }
    };

    // const updateDescription = async () => { // Edita a descrição do filme em relação a opnião do usuário. Nada de muito complicado por aqui.
    //     if (!movieEdit?.id) return;
    //     const userCookie = Cookies.get('user');

    //     try {
    //         const response = await fetch(`http://localhost:3001/movies/${movieEdit.movie_id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ description, user_id: userCookie }),
    //         });
    //         if (response.ok) {
    //             toast.success("Descrição atualizada com sucesso!");
    //             setIsEditingDescription(false);
    //         } else {
    //             toast.error("Erro ao atualizar a descrição.");
    //         }
    //     } catch (error) {
    //         toast.error("Erro ao atualizar a descrição.");
    //         console.error("Erro ao atualizar descrição:", error);
    //     }
    // };

    function formatDuration(minutes: number): string { // Formata duração de minutos para horas.
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}min`;
    }

    const toBack = () => {
        router.push("/auth/movies");
    };

    const handleRatingChange = (event: SyntheticEvent, newValue: number | null) => { // utlizado breve timeout na alteração do raiting para não gerar demasiada quantidade de eventos.
        const validRating = newValue && newValue >= 1 ? newValue : 0;
        setRatingValue(validRating);
        clearTimeout(inactivityTimeout);

        inactivityTimeout = setTimeout(() => {
            updateRating(validRating);
        }, 1);
    };

    useEffect(() => {
        if (movieEdit?.id === undefined) { //Para melhor resposta visual do usuário, retorna para tela de movies caso o movieEdit tenha seu valor perdido ao atualizar ou trocar de página.
            router.push("/auth/movies");
        }

        return () => clearTimeout(inactivityTimeout);
    }, [movieEdit]);

    return (
        <>
            <NavbarComponent message={`Página de edição`} />
            <MoviesEdit>
                <HeaderImageEdit>
                    <Image src={movieEdit?.movies.image || 'https://coreassociates.org/wp-content/uploads/2013/11/dummy-image-portrait.jpg'} alt='Astronauta no cinema' width={100} height={100} />
                    <TopImage>
                        <button onClick={toBack}><IoArrowBackCircleOutline size={30} /></button>
                        <span></span>
                    </TopImage>
                    <BottomImage>
                        <h3>{movieEdit?.movies.title || 'Film name'}</h3>
                        <div>
                            <span>{movieEdit?.movies.release_year || '0000'}</span> |
                            <span>{movieEdit?.movies.genre || 'Genre'}</span> |
                            <span>{formatDuration(movieEdit?.movies.duration || 0)}</span>
                        </div>
                    </BottomImage>
                </HeaderImageEdit>
                <Avaliation>
                    <Stack spacing={1}>
                        <RatingContainer>
                            <Rating
                                name="half-rating"
                                value={ratingValue}
                                color="#fff"
                                precision={0.5}
                                onChange={handleRatingChange}
                            />
                            <div>{ratingValue || 0}</div>
                        </RatingContainer>
                    </Stack>

                    <Description onClick={() => setIsEditingDescription(true)}>
                        {description || "Clique para adicionar uma descrição."}
                    </Description>

                    {/* {isEditingDescription ? (
                        <DescriptionAction>
                            <Button onClick={updateDescription}>Salvar</Button>
                            <ButtonCancelled onClick={() => setIsEditingDescription(false)}>Cancelar</ButtonCancelled>
                        </DescriptionAction>
                    ) : (
                        <DescriptionActionClicked>Clique no texto para editar.</DescriptionActionClicked>
                    )
                    } */}
                    {/* <EditIcon ><BiEdit size={14} /></EditIcon> */}
                </Avaliation>
                <Line />
                <MoreItensIdea>
                    <ActorCard>
                        <ActorPhoto>
                            <Image src={DevilMan} alt={'aaaa'} />
                        </ActorPhoto>
                        <ActorName>{'Actor 0'}</ActorName>
                    </ActorCard>
                    <ActorCard>
                        <ActorPhoto>
                            <Image src={DevilMan} alt={'aaaa'} />
                        </ActorPhoto>
                        <ActorName>{'Actor 1'}</ActorName>
                    </ActorCard>
                    <ActorCard>
                        <ActorPhoto>
                            <Image src={DevilMan} alt={'aaaa'} />
                        </ActorPhoto>
                        <ActorName>{'Actor 2'}</ActorName>
                    </ActorCard>
                    <ActorCard>
                        <ActorPhoto>
                            <Image src={DevilMan} alt={'aaaa'} />
                        </ActorPhoto>
                        <ActorName>{'Actor 3'}</ActorName>
                    </ActorCard>
                </MoreItensIdea>
            </MoviesEdit>
        </>
    );
}

export default userAuth(MovieEdit);
