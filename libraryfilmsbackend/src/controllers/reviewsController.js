const supabase = require('../../server');
const Review = require('../models/reviews.model');

exports.addReview = async (req, res) => { // Realiza criação de uma nova review, utilizei principalmente no cadastro dos filmes, para que o filme seja vinculado ao usuário no momento da criação.
    const { movieId, userId } = req.body;

    try {
        const { data: existingReview, error: fetchError } = await supabase
            .from('reviews')
            .select('*')
            .eq('movie_id', movieId)
            .eq('user_id', userId)

        if (fetchError) {
            throw fetchError;
        }

        if (existingReview.length > 0) {
            return res.status(200).json({ message: "Filme já vinculado ao seu usuário." });
        }

        const { data: newReview, error: insertError } = await supabase
            .from('reviews')
            .insert([{ movie_id: movieId, user_id: userId }]);

        if (insertError) {
            throw insertError;
        }

        return res.status(201).json({ message: "Filme vinculado com sucesso ao seu usuário.", review: newReview });
    } catch (error) {
        console.error("Erro ao vincular filme ao usuário:", error);
        return res.status(500).json({ message: "Erro ao vincular filme." });
    }
};

exports.getReviews = async (req, res) => { // Busca todas reviews, que não estão com deleted_at.
    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select('*')
            .is('deleted_at', null);
        if (error) throw error;
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewById = async (req, res) => { // Busca review pelo id. 
    const { id } = req.params;
    try {
        const { data: review, error } = await supabase
            .from('reviews')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateReview = async (req, res) => { // Simples rota para atualizar review, com suas devidas validações e mensagens de erro.
    const { id } = req.params;
    const { rating, comment, user_id } = req.body;
    const reviewId = String(id);

    try {
        const { data: existingReview, error: selectError } = await supabase
            .from('reviews')
            .select('*')
            .eq('id', reviewId)
            .eq('user_id', user_id) 
            .single();

        if (selectError || !existingReview) {
            console.error("Review não encontrada ou erro:", selectError);
            return res.status(404).json({ error: "Avaliação não encontrada." });
        }

        const { data: updatedReview, error } = await supabase
            .from('reviews')
            .update({ rating, comment })
            .eq('id', reviewId)
            .eq('user_id', user_id)
            .select('*');
            
        if (error) throw error;

        res.status(200).json({ message: 'Avaliação atualizada com sucesso.', review: updatedReview[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteReview = async (req, res) => { //Também realizando o softdelete.
    const { id } = req.params;
    const deletedAt = new Date().toISOString();

    try {
        const { data, error } = await supabase
            .from('reviews')
            .update({ deleted_at: deletedAt })
            .eq('id', id)
            .select('*');

        if (error) throw error;

        res.status(200).json({ message: 'Avaliação excluída com sucesso.', review: data[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategorizedReviews = async (req, res) => {
    const { userId } = req.params;

    try {
        const { data: reviews, error } = await supabase
            .from('reviews')
            .select(`
                *,
                movies (title, description, genre, release_year, duration)
            `)
            .eq('user_id', userId)
            .is('deleted_at', null);

        if (error) throw error;

        const pendingReviews = reviews.filter(review => review.rating === null);
        const userReviews = reviews.filter(review => review.rating !== null);

        res.status(200).json({
            pendingReviews,
            userReviews
        });
    } catch (error) {
        console.error("Erro ao categorizar avaliações:", error);
        res.status(500).json({ message: 'Erro ao categorizar avaliações.', error: error.message });
    }
};