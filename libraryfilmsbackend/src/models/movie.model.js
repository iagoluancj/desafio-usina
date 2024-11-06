class Movie {
    constructor({ title, description, genre, release_year, duration, image }) {
        this.title = title;
        this.description = description;
        this.genre = genre;
        this.release_year = release_year;
        this.duration = duration;
        this.image = image
    }
}

module.exports = Movie;
