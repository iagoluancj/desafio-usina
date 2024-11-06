export type TypeUsers = {
    id?: number;
    name: string;
    email: string;
    password: string;
    created_at?: Date;
  };
  
  export type TypeMovies = {
    id: number;
    title: string;
    description: string;
    genre: string;
    release_year: number;
    duration: number;
    image: string | null;

    rating?: number | null;
    comment?: string | null;
  };
  
  export type PendingReview = { 
    comment: string | null;
    created_at: string;
    created_by: string | null;
    deleted_at: string | null;
    deleted_by: string | null;
    id: string;
    movie_id: string;
    movies: TypeMovies;
    rating: number | null;
    review_date: string;
    updated_at: string | null;
    updated_by: string | null;
    user_id: string;
  };

  export type TypeReview = {
    id: string;
    movie_id: string;
    user_id: string;
    rating: number | null;
    comment: string | null;
    movies: TypeMovies;
  };