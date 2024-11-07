/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import userAuth from "@/utils/userAuth";
import { SyntheticEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ActorCard, ActorName, ActorPhoto, Avaliation, BottomImage, Button, ButtonAddFilmToList, ButtonCancelled, Comment, Description, DescriptionAction, DescriptionActionClicked, EditIcon, HeaderImageEdit, Line, MoreItensIdea, MoviesEdit, RatingContainer, TopImage } from "./styles";
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
    const { movieEdit, setIsRecommended, isRecommended } = useContext(SupaContext)
    const [ratingValue, setRatingValue] = useState(movieEdit?.rating);
    const [comment, setComment] = useState(movieEdit?.comment || "");
    const [isLoading, setIsLoading] = useState(false); // Loading utilizado para evitar vários clicks no submit. 
    const [isEditingCommment, setIsEditingComment] = useState(false);
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

    const updateComment = async () => { // Edita a descrição do filme em relação a opnião do usuário. Nada de muito complicado por aqui.
        if (!movieEdit?.id) return;
        const userCookie = Cookies.get('user');

        try {
            const response = await fetch(`http://localhost:3001/reviews/${movieEdit.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ comment, user_id: userCookie }),
            });
            if (response.ok) {
                toast.success("Comentário atualizada com sucesso!");
                setIsEditingComment(false);
            } else {
                toast.error("Erro ao atualizar o comentário.");
            }
        } catch (error) {
            toast.error("Erro ao atualizar o comentário.");
            console.error("Erro ao atualizar comentário:", error);
        }
    };

    const addFilmToList = async () => {
        const userCookie = Cookies.get('user'); 

        if (!userCookie || !movieEdit?.movies?.id) {
            toast.error("Erro: usuário ou filme não encontrado.");
            return;
        }

        setIsLoading(true); 

        try {
            const response = await fetch(`http://localhost:3001/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    movieId: movieEdit.movies.id, 
                    userId: userCookie,
                }),
            });

            if (response.ok) {
                toast.success("Filme adicionado à lista com sucesso!");
            } else {
                toast.error("Erro ao adicionar o filme à lista.");
            }
        } catch (error) {
            toast.error("Erro ao adicionar o filme à lista.");
            console.error("Erro ao adicionar filme:", error);
        } finally {
            setIsLoading(false); 
        }
    };

    function formatDuration(minutes: number): string { // Formata duração de minutos para horas.
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}min`;
    }

    const toBack = () => {
        setIsRecommended(false)
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

    const isValidUrl = (url: string) => { // função criada para verificar se a URL é valida e não quebrar ao passar o valor para o SRC.
        try {
            return Boolean(new URL(url));
        } catch {
            return false;
        }
    };

    useEffect(() => {
        if (movieEdit?.id === undefined) { //Para melhor resposta visual do usuário, retorna para tela de movies caso o movieEdit tenha seu valor perdido ao atualizar ou trocar de página.
            setIsRecommended(false)
            router.push("/auth/movies");
        }

        return () => clearTimeout(inactivityTimeout);
    }, [movieEdit]);

    return (
        <>
            <NavbarComponent message={`Página de edição`} />
            <MoviesEdit>
                <HeaderImageEdit>
                    <Image
                        src={
                            movieEdit?.movies?.image && isValidUrl(movieEdit.movies.image)
                                ? movieEdit.movies.image
                                : 'https://coreassociates.org/wp-content/uploads/2013/11/dummy-image-portrait.jpg'
                        }
                        alt='Astronauta no cinema' width={100} height={100} />
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
                            {isRecommended ?
                                <Rating
                                    name="half-rating"
                                    value={ratingValue}
                                    color="#fff"
                                    precision={0.5}
                                    disabled={true}
                                />
                                :
                                <Rating
                                    name="half-rating"
                                    value={ratingValue}
                                    color="#fff"
                                    precision={0.5}
                                    onChange={handleRatingChange}
                                />
                            }
                            <div>{ratingValue || 0}</div>
                        </RatingContainer>
                    </Stack>

                    <Description>
                        {movieEdit?.movies.description}
                    </Description>

                </Avaliation>
                {!isRecommended ?
                    <Comment>
                        <EditIcon ><BiEdit size={14} /></EditIcon>
                        {!isEditingCommment ?
                            <Description onClick={() => setIsEditingComment(true)}>
                                {comment || "Vamos, comente, nós diga oque você achou."}
                            </Description>
                            :
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows={4}
                                style={{ width: "100%", padding: "8px", resize: "vertical" }}
                            />
                        }
                        {isEditingCommment ? (
                            <DescriptionAction>
                                <div>
                                    <Button onClick={updateComment}>Salvar</Button>
                                    <ButtonCancelled onClick={() => setIsEditingComment(false)}>Cancelar</ButtonCancelled>
                                </div>
                            </DescriptionAction>
                        ) : (
                            <DescriptionActionClicked onClick={() => setIsEditingComment(true)}>Clique para inserir um comentário.</DescriptionActionClicked>
                        )
                        }
                    </Comment>
                    :
                    <ButtonAddFilmToList disabled={isLoading} onClick={addFilmToList}>
                        {isLoading ? "Adicionando..." : "Adicionar filme a lista"}
                    </ButtonAddFilmToList>
                }
                <Line />
                <MoreItensIdea>
                    {[0, 1, 2, 3].map((actorIndex) => (
                        <ActorCard key={actorIndex}>
                            <ActorPhoto>
                                <Image src={DevilMan} alt={`Actor ${actorIndex}`} />
                            </ActorPhoto>
                            <ActorName>{`Actor ${actorIndex}`}</ActorName>
                        </ActorCard>
                    ))}
                </MoreItensIdea>
            </MoviesEdit>
        </>
    );
}

export default userAuth(MovieEdit);
