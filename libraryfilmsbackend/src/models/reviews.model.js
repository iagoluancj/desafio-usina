class Review {
    constructor({ id, movie_id, user_id, rating = null, comment = null, movies }) {
        this.id = id;
        this.movie_id = movie_id;
        this.user_id = user_id;
        this.rating = rating;
        this.comment = comment;
        this.movies = {
            id: movies.id,
            genre: movies.genre,
            title: movies.title,
            description: movies.description,
            duration: movies.duration,
            release_year: movies.release_year,
            image: movies.image
        };
    }
}

module.exports = Review;
