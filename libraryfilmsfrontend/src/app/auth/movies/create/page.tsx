/* eslint-disable prefer-const */
"use client";

import userAuth from "@/utils/userAuth";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { BackButton, CreateContainer, DurationInputWrapper, FormContainer, FormMovies } from "./styles";
import { useRouter } from "next/navigation";
import { LoginHeader } from "@/app/login/styles";
import InputComponent from "@/components/primitivy/input";
import { toast } from "react-toastify";
import { SupaContext } from "@/Context/context";
import Cookies from 'js-cookie';
import NavbarComponent from "@/components/Navbar";
import { TypeMovies } from "@/Types/types";

function Movies() {
    const { contextMovies } = useContext(SupaContext);
    const [isLoading, setIsLoading] = useState(false); // Loading utilizado para evitar vários clicks no submit. 
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        genre: "",
        release_year: "",
        duration: "",
        image: ""
    });

    const router = useRouter();

    const handleCreateMovie = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { release_year } = formData;
        const currentYear = new Date().getFullYear();

        if (parseInt(release_year) < 1900 || parseInt(release_year) > currentYear) { // Verificação de ano de acordo com a constraint do banco antes de realizar o submit. 
            toast.error(`Ano de lançamento deve estar entre 1900 e ${currentYear}`);
            setIsLoading(false);
            return;
        }

        const movieData = {
            title: formData.title,
            description: formData.description,
            duration: formData.duration,
            genre: formData.genre,
            release_year: formData.release_year,
            image: formData.image
        };

        try {
            const existingMovie = contextMovies.find(movie => movie.title === formData.title);
            const userCookie = Cookies.get('user');

            if (!userCookie) {
                throw new Error("ID do usuário não encontrado nos Cookies");
            }

            if (existingMovie) {
                await fetch(`http://localhost:3001/reviews`, { //Caso filme já exista, apenas vinculado ao usuário logado.
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        movieId: existingMovie.id,
                        userId: userCookie
                    }),
                });
                toast.success("Filme vinculado ao seu usuário.");
            } else {
                const res = await fetch("http://localhost:3001/movies", { // Caso o filme não exista, cria o filme e vincula. 
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(movieData),
                });

                if (res.ok) {
                    const newMovie = await res.json();
                    const movieId = newMovie[0]?.id;

                    await fetch(`http://localhost:3001/reviews`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            movieId: movieId,
                            userId: userCookie
                        }),
                    });
                    toast.success("Filme adicionado com sucesso e vinculado ao seu usuário.");
                    toast.success("Volte para avaliar o filme adicionado.", {
                        className: "toast-custom-info",
                    })
                    setFormData({
                        title: "",
                        description: "",
                        genre: "",
                        release_year: "",
                        duration: "",
                        image: ""
                    });
                }
            }
        } catch (error) {
            console.error(`Erro ao salvar o filme: ${error}`);
            toast.error("Erro ao adicionar o filme.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "title") {
            const selectedMovie = contextMovies.find((movie) => movie.title === value);

            if (selectedMovie) {
                setFormData({
                    title: selectedMovie.title,
                    description: selectedMovie.description,
                    genre: selectedMovie.genre,
                    release_year: String(selectedMovie.release_year),
                    duration: String(selectedMovie.duration),
                    image: selectedMovie.image || '',
                });
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                    description: "",
                    genre: "",
                    release_year: "",
                    duration: "",
                    image: "",
                }));
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleNumericInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (/^\d*$/.test(value)) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const createNewMovie = () => {
        router.push('/auth/movies');
    }

    const getTitleMovies = (contextMovies: TypeMovies[]): string[] => {
        return contextMovies.map(movie => movie.title);
    };

    const titleMovies = getTitleMovies(contextMovies)

    console.log(contextMovies)

    return (
        <>
            <NavbarComponent message='Adicionar Filmes' />
            <CreateContainer>
                <LoginHeader>
                    <>
                        <h1>Vamos lá, nos diga, oque você tem visto ultimamente?</h1>
                        <p>E depois disso te recomendaremos alguns hihihi</p>
                    </>
                </LoginHeader>

                <FormMovies onSubmit={handleCreateMovie} className="flex flex-col gap-4">
                    <InputComponent
                        label="Nome do filme:"
                        name="title"
                        maxLength={100}
                        value={formData.title}
                        onChange={handleChange}
                        suggestions={titleMovies}
                        required
                    />
                    <FormContainer>
                        <InputComponent
                            label="Gênero: "
                            name="genre"
                            maxLength={50}
                            value={formData.genre}
                            onChange={handleChange}
                            required
                        />
                        <InputComponent
                            label="Ano de lançamento: "
                            name="release_year"
                            maxLength={4}
                            value={formData.release_year}
                            onChange={handleNumericInputChange}
                            required
                        />
                        <DurationInputWrapper>
                            <InputComponent
                                label="Duração: "
                                name="duration"
                                maxLength={4}
                                value={formData.duration}
                                onChange={handleNumericInputChange}
                                required
                            />
                            <span>minutos</span>
                        </DurationInputWrapper>
                    </FormContainer>
                    <InputComponent
                        label="Link banner do filme: "
                        name="image"
                        maxLength={1000}
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                    <InputComponent
                        label="Breve descrição do filme:"
                        name="description"
                        type="textarea"
                        height={100}
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                    <button disabled={isLoading} type="submit" className="p-2 bg-blue-500 text-white rounded">
                        {isLoading ? "Adicionando..." : "Adicionar filme"}
                    </button>
                </FormMovies>
                {isLoading}
                <BackButton onClick={createNewMovie}><IoIosArrowBack /> Voltar</BackButton>
            </CreateContainer>
        </>
    );
}

export default userAuth(Movies);
