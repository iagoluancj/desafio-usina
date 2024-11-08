/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TypeReview } from "@/Types/types";
import userAuth from "@/utils/userAuth";
import { useContext, useEffect, useState } from "react";
import { CardsFilms, HeaderImage, HeaderMovies, MovieCard, MovieContainer, MoviesContainer, Rating, Search } from "./styles";
import { toast } from "react-toastify";
import ButtonCreateMovie from "@/components/ButtonCreateMovie";
import headerImage from '../../../assets/header.jpg'
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Cookies from 'js-cookie';
import { FaStar } from "react-icons/fa";

import { SupaContext } from "@/Context/context";
import { useRouter } from "next/navigation";
import NavbarComponent from "@/components/Navbar";
import MovieCardSkeleton from "@/components/skeleton";
import Joyride, { CallBackProps } from "react-joyride";

function Movies() {
  const [movies, setMovies] = useState<TypeReview[]>([]);
  const [recommendations, setRecommendations] = useState<TypeReview[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [runTour, setRunTour] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const first_access = Cookies.get("first_access");
  const { setMovieEdit, setIsRecommended, updateUserFirstAccess } = useContext(SupaContext)

  const router = useRouter();

  const fetchMovies = async () => { //simples fetch para buscar os filmes.
    try {
      const userCookie = Cookies.get('user');

      if (!userCookie) {
        throw new Error("User ID not found in session storage");
      }

      const res = await fetch(`http://localhost:3001/movies?user_id=${userCookie}`);
      const data = await res.json();
      setMovies(data.user_reviews);
      setRecommendations(data.recommendations)
      setLoading(true)

    } catch (error) {
      setErrorMessage(JSON.stringify(error))
      toast.error(errorMessage)
      setLoading(false)
      console.error("Erro ao buscar filmes:", error);
    }
  };

  const filterRecommendedMovies = (movies: TypeReview[], searchTerm: string) => { // Simples filtro.
    const lowerCaseSearch = searchTerm.toLowerCase();

    return movies.filter((movie) => {
      const { title, genre, release_year, description } = movie.movies;
      return (
        (title && title.toLowerCase().includes(lowerCaseSearch)) ||
        (genre && genre.toLowerCase().includes(lowerCaseSearch)) ||
        (release_year && release_year.toString().includes(lowerCaseSearch)) ||
        (description && description.toLowerCase().includes(lowerCaseSearch))
      );
    });
  };

  const filterRatedMovies = (movies: TypeReview[], searchTerm: string) => { // Filtro com dupla verificação, mas também como metodo para melhor resposta visual ao cliente. 
    const lowerCaseSearch = searchTerm.toLowerCase();

    return movies.filter((movie) => {
      const { title, genre, release_year, description } = movie.movies;
      return (
        ((title && title.toLowerCase().includes(lowerCaseSearch)) ||
          (genre && genre.toLowerCase().includes(lowerCaseSearch)) ||
          (release_year && release_year.toString().includes(lowerCaseSearch)) ||
          (description && description.toLowerCase().includes(lowerCaseSearch))) &&
        movie.rating !== null &&
        movie.rating >= 1 &&
        movie.rating <= 5
      );
    });
  };

  const filterPendingMovies = (movies: TypeReview[], searchTerm: string) => {  // Foram utilizados filtros separados para cada campo de card's para melhor resposta visual ao cliente.. 
    const lowerCaseSearch = searchTerm.toLowerCase();

    return movies.filter((movie) => {
      const { title, genre, release_year, description } = movie.movies;
      return (
        ((title && title.toLowerCase().includes(lowerCaseSearch)) ||
          (genre && genre.toLowerCase().includes(lowerCaseSearch)) ||
          (release_year && release_year.toString().includes(lowerCaseSearch)) ||
          (description && description.toLowerCase().includes(lowerCaseSearch)))
      );
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleEditMovie = (movie: TypeReview) => {
    setMovieEdit(movie);
    router.push("/auth/movies/edit");
  };

  const handleEditMovieRecommended = (movie: TypeReview) => {
    setMovieEdit(movie);
    setIsRecommended(true)
    router.push("/auth/movies/edit");
  };

  const createNewMovie = () => {
    router.push('/auth/movies/create');
  }

  const isValidUrl = (url: string) => {
    try {
      return Boolean(new URL(url));
    } catch {
      return false;
    }
  };


  const steps = [
    {
      target: '.run',
      content: '',
    },
    {
      target: '.recommendations-header',
      content: 'Você pode adicionar seus filmes favoritos usando este botão!',
    },
    {
      target: '.add-movie-button',
      content: 'Após adicionar e avaliar os presentes na lista, irá obter recomendações!',
    },
    {
      target: '.pending-header',
      content: 'Estas são suas recomendações, adicione e avalie novos filmes para receber mais sugestões.',
    }
  ];


  useEffect(() => {
    fetchMovies();

    if (first_access === 'true') {
      setRunTour(true)
      Cookies.set("first_access", 'false');

      const timeoutId = setTimeout(() => {
        updateUserFirstAccess(); 
      }, 10000);

      return () => clearTimeout(timeoutId);
    } else {
      setRunTour(false)
    }

  }, []);

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            zIndex: 1000,
            width: '250px',
            primaryColor: '#52B788',
            backgroundColor: '#31373E',
            textColor: '#fff',
          },
          buttonSkip: {
            backgroundColor: 'transparent',
            color: '#52B788',
          },
          buttonNext: {
            backgroundColor: '#52B788',
            color: '#fff',
          },
          buttonBack: {
            color: '#52B788',
          },
          tooltip: {
            border: '2px solid #52B788',
          },
          tooltipContent: {
            color: '#fff',
          },
        }}
        locale={{
          back: 'Voltar',
          close: 'Fechar',
          last: 'Finalizar',
          next: 'Próximo',
          skip: 'Pular',
        }}
        callback={(data: CallBackProps) => {
          const { status } = data;
          if (status === 'finished' || status === 'skipped') {
            setRunTour(false);
          }
        }}
      />
      <NavbarComponent message='Filmes' />
      <MoviesContainer>
        <HeaderImage>
          <Image src={headerImage} alt='Astronauta no cinema'></Image>
        </HeaderImage>
        <HeaderMovies>
          <div>
            <h1>Em dúvida do que ver hoje? Fica calmo(a), vamos ajduar com sua ansiedade.</h1>
            <p>Que tal algumas recomendações?</p>
          </div>
          <Search>
            <span><BiSearch size={20} /></span>
            <input
              type="text"
              placeholder="Pesquise por Nome, Genêro, descrição ou ano."
              value={searchTerm}
              onChange={handleSearch} />
          </Search>
        </HeaderMovies>

        <CardsFilms>
          <div>
            <h2 >Recomendações</h2>
            <div className="cards-container pending-header" >
              {loading ? (
                (() => {
                  const filteredMovies = filterRecommendedMovies(recommendations, searchTerm);
                  const uniqueTitles = new Set();

                  return filteredMovies.length > 0 ? (
                    filteredMovies
                      .filter((movie) => {
                        if (uniqueTitles.has(movie.movies.title)) {
                          return false;
                        }
                        uniqueTitles.add(movie.movies.title);
                        return true;
                      })
                      .map((movie) => (
                        <MovieContainer key={movie.id}>
                          <MovieCard onClick={() => handleEditMovieRecommended(movie)}>
                            <Image src={
                              movie.movies.image && isValidUrl(movie.movies.image)
                                ? movie.movies.image
                                : 'https://coreassociates.org/wp-content/uploads/2013/11/dummy-image-portrait.jpg'
                            } alt={`Banner do filme ${movie.movies.title}`} width={100} height={100} />
                          </MovieCard>
                        </MovieContainer>
                      ))
                  ) : (
                    // skeleton de item vázio ou não presente nos resultados de busca.
                    <>
                      {Array.from({ length: 7 }).map((_, index) => (
                        <MovieCardSkeleton key={index} message="" />
                      ))}
                    </>
                  );
                })()
              ) : (
                // skeleton de carregamento
                <>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <MovieCardSkeleton key={index} message="" />
                  ))}
                </>
              )}
            </div>
          </div>
          <div>
            <h2>Suas avaliações</h2>
            <div className="cards-container">
              {loading ? (
                (() => {
                  const filteredMovies = filterRatedMovies(movies, searchTerm);
                  return filteredMovies.length > 0 ? (
                    filteredMovies
                      .filter((movie) => movie.rating !== null && movie.rating >= 1 && movie.rating <= 5)
                      .map((movie) => (
                        <MovieCard key={movie.id} onClick={() => handleEditMovie(movie)}>
                          <Image src={
                            movie.movies.image && isValidUrl(movie.movies.image)
                              ? movie.movies.image
                              : 'https://coreassociates.org/wp-content/uploads/2013/11/dummy-image-portrait.jpg'
                          } alt={`Banner do filme ${movie.movies.title}`} width={100} height={100} />
                          <Rating>
                            {movie.rating} <FaStar color="#FFD700" />
                          </Rating>
                        </MovieCard>
                      ))
                  ) : (
                    <>
                      {Array.from({ length: 7 }).map((_, index) => (
                        <MovieCardSkeleton key={index} message="N/A" />
                      ))}
                    </>
                  )
                })()
              ) : (
                <>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <MovieCardSkeleton key={index} message="N/A" />
                  ))}
                </>
              )}
            </div>
          </div>
          <div>
            <h2>Pendente avaliação</h2>
            <div className="cards-container add-movie-button">
              {loading ? (
                (() => {
                  const filteredMovies = filterPendingMovies(movies, searchTerm);

                  return filteredMovies.length > 0 ? (
                    filteredMovies
                      .filter((movie) => movie.rating === null || movie.rating === 0)
                      .map((movie: any) => (
                        <MovieCard key={movie.id} onClick={() => handleEditMovie(movie)}>
                          <Image src={
                            isValidUrl(movie.movies.image)
                              ? movie.movies.image
                              : 'https://coreassociates.org/wp-content/uploads/2013/11/dummy-image-portrait.jpg'
                          } alt={`Banner do filme ${movie.movies.title}`} width={100} height={100} />
                          <Rating>
                            N/A <FaStar color="#FFD700" />
                          </Rating>
                        </MovieCard>
                      ))
                  ) : (
                    <>
                      {Array.from({ length: 7 }).map((_, index) => (
                        <MovieCardSkeleton key={index} message="N/A" />
                      ))}
                    </>
                  )
                })()
              ) : (
                <>
                  {Array.from({ length: 7 }).map((_, index) => (
                    <MovieCardSkeleton key={index} message="N/A" />
                  ))}
                </>
              )}
            </div>
          </div>
        </CardsFilms>
        <ButtonCreateMovie className="recommendations-header" onClick={createNewMovie}></ButtonCreateMovie>
      </MoviesContainer>
    </>
  );
}

export default userAuth(Movies);
