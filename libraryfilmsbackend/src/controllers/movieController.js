const supabase = require('../../server');
const Movie = require('../models/movie.model');
const Review = require('../models/reviews.model');

exports.getMovies = async (req, res) => {
    const userId = req.query.user_id;

    try {
        const { data: reviewsData, error: reviewsDataError } = await supabase
            .from('reviews')
            .select('*, movies(id, genre, title, duration, description, release_year, image)')
            .eq('user_id', userId);

        if (reviewsDataError) throw reviewsDataError;

        const { data: userReviewsData, error: userReviewsError } = await supabase
            .from('reviews')
            .select('movie_id, rating')
            .eq('user_id', userId);

        if (userReviewsError) throw userReviewsError;

        // Cria estruturação de avaliações do usuário. 
        const userRatings = {};
        userReviewsData.forEach(review => {
            userRatings[review.movie_id] = review.rating;
        });

        // Compara as avaliaçoes com outros usuários
        const { data: otherReviewsData, error: otherReviewsError } = await supabase
            .from('reviews')
            .select('user_id, movie_id, rating')
            .neq('user_id', userId); 

        if (otherReviewsError) throw otherReviewsError;

        // Calcula similaridade do cosseno entre o usuário e os outros usuários com avaliações parecidas.
        const userSimilarity = {};

        otherReviewsData.forEach(review => {
            const otherUserId = review.user_id;
            if (!userSimilarity[otherUserId]) {
                userSimilarity[otherUserId] = { ratings: {}, similarity: 0 };
            }
            userSimilarity[otherUserId].ratings[review.movie_id] = review.rating;
        });

        // Executa de fato a função para calcular similaridade de cosseno
        const calculateCosineSimilarity = (userRatings, otherRatings) => {
            let dotProduct = 0;
            let userMagnitude = 0;
            let otherMagnitude = 0;

            for (const movieId in userRatings) {
                if (otherRatings[movieId] !== undefined) {
                    dotProduct += userRatings[movieId] * otherRatings[movieId];
                }
                userMagnitude += userRatings[movieId] ** 2;
            }

            for (const rating of Object.values(otherRatings)) {
                otherMagnitude += rating ** 2;
            }

            userMagnitude = Math.sqrt(userMagnitude);
            otherMagnitude = Math.sqrt(otherMagnitude);

            return dotProduct / (userMagnitude * otherMagnitude || 1); 
        };

        // Calcula a similaridade de cada usuário
        for (const otherUserId in userSimilarity) {
            const otherRatings = userSimilarity[otherUserId].ratings;
            userSimilarity[otherUserId].similarity = calculateCosineSimilarity(userRatings, otherRatings);
        }

        // Puxa usuários semelhantes, e guarda os valores de ratings junto ao valor da similaridade, onde podemos tratar melhor os valores de similidade e aumentar para mais ou menos similaridade.
        const similarUsers = Object.entries(userSimilarity)
            .filter(([_, data]) => data.similarity > 0) // Atualmente em 0, pois funciona melhor com menor quantidade de filmes, mas é interessante testar com .5 e em uma situação de varias reviews cadastradas, o 1 se torna super interessante.  
            .sort((a, b) => b[1].similarity - a[1].similarity)
            .slice(0, 5);

      
        // Por fim filtra as recomendações
        const recommendedMovies = new Set();
        similarUsers.forEach(([otherUserId, data]) => {
            for (const movieId in data.ratings) {
                if (!userRatings[movieId] && data.ratings[movieId] >= 4) {
                    recommendedMovies.add(movieId);
                } 
            }
        });

        // E buscamos os valores novamente, agora somente os filmes a serem recomendados. 
        const { data: movieRecommendations, error: moviesError } = await supabase
            .from('reviews')
            .select(`
            id,
            created_at,
            created_by,
            deleted_at,
            deleted_by,
            movie_id,
            rating,
            review_date,
            updated_at,
            updated_by,
            user_id,
            movies (id, genre, title, duration, description, release_year, image) 
        `) 
            .in('movie_id', Array.from(recommendedMovies));

        if (moviesError) throw moviesError;

        res.status(200).json({
            recommendations: movieRecommendations,
            reviews: userReviewsData,
            user_reviews: reviewsData
        });
    } catch (error) {
        console.error('Erro ao buscar filmes:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getMovieById = async (req, res) => { // Sem muito segredo, busca movie via id. 
    const { id } = req.params;
    try {
        const { data: movie, error } = await supabase.from('movies').select('*').eq('id', id).single();
        if (error) throw error;
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createMovie = async (req, res) => { // Cria novo filme.
    const { title, description, genre, release_year, duration, image } = req.body;

    const newMovie = new Movie({ title, description, genre, release_year, duration, image });

    try {
        const { data, error } = await supabase.from('movies').insert([newMovie]).select('*');
        if (error) throw error;
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMovie = async (req, res) => { // Atualiza o filme existente. 
    const { id } = req.params;
    const { title, description, genre, release_year, duration, image } = req.body;

    const updatedMovie = new Movie({ title, description, genre, release_year, duration, image });
    console.log(description)

    try {
        const { data, error } = await supabase.from('movies').update(updatedMovie).eq('id', id);
        if (error) throw error;
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => { // Realiza softdelete. 
    const { id } = req.params;
    const deletedAt = new Date()

    try {
        const { data, error } = await supabase
            .from('movies')
            .update({ deleted_at: deletedAt })
            .eq('id', id);

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};