import { TypeMovies } from "@/Types/types";
import { toast } from "react-toastify";

export const fetchMovies = async (setMovies: React.Dispatch<React.SetStateAction<TypeMovies[]>>, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    try {
      const res = await fetch("http://localhost:3001/movies");
      const data = await res.json();
      setMovies(data);
    } catch (error) {
      const errorMessage = JSON.stringify(error);
      setErrorMessage(errorMessage);
      toast.error(errorMessage);
    }
  };