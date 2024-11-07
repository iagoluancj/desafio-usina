"use client"

import { supabase } from "@/services/supabase";
import { TypeMovies, TypeReview, TypeUsers } from "@/Types/types";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type SupaProviderProps = {
    children: ReactNode;
};

type SupaContextType = {
    contextUsers: TypeUsers[];
    isRecommended: boolean;
    contextMovies: TypeMovies[];
    movieEdit: TypeReview | null; 
    setIsRecommended: Dispatch<SetStateAction<boolean>>;
    setMovieEdit: (movie: TypeReview | null) => void;
};

export const SupaContext = createContext<SupaContextType>({
    contextUsers: [],
    contextMovies: [],
    isRecommended: false,
    movieEdit: null,
    setIsRecommended: () => {},
    setMovieEdit: () => {},
});

// Context em menor escala, apenas para tratar algumas situações em que se sai melhor do que ao utilizar props.
const SupaProvider: React.FC<SupaProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<TypeUsers[]>([]);
    const [isRecommended, setIsRecommended] = useState(false)
    const [movies, setMovies] = useState<TypeMovies[]>([]);
    const [movieEdit, setMovieEdit] = useState<TypeReview | null>(null);

    useEffect(() => {
        const getAllUsers = async () => {
            const { data: userData } = await supabase
                .from('users')
                .select('*')
                .order('id')
                .returns<TypeUsers[]>();

            return { userData };
        };

        const getAllMovies = async () => {
            const { data: moviesData } = await supabase
                .from('movies')
                .select('*')
                .order('id')
                .returns<TypeMovies[]>();

            return { moviesData };
        };


        (async () => {
            const { userData } = await getAllUsers();
            const { moviesData } = await getAllMovies();

            setUsers(userData || []);
            setMovies(moviesData || []);
        })();

        const usersChannel = supabase
            .channel('users-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'users',
                },
                (payload) => {
                    console.log('Change received for clientes:', payload);
                    getAllUsers().then(({ userData }) => setUsers(userData || []));
                }
            )
            .subscribe();

        const moviesChannel = supabase
            .channel('movies-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'movies',
                },
                (payload) => {
                    console.log('Change received for clientes:', payload);
                    getAllMovies().then(({ moviesData }) => setMovies(moviesData || []));
                }
            )
            .subscribe();




        return () => {
            usersChannel.unsubscribe();
            moviesChannel.unsubscribe();
        };
    }, []);

    return (
        <SupaContext.Provider
            value={{
                contextUsers: users,
                contextMovies: movies,
                movieEdit, 
                isRecommended,
                setIsRecommended,
                setMovieEdit
            }}
        >
            {children}
        </SupaContext.Provider>
    );
};

export default SupaProvider;