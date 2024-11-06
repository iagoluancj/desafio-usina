import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { FaStar } from 'react-icons/fa';
import { MovieCard, Rating } from '@/app/auth/movies/styles';

interface MovieCardSkeletonProps {
    message?: string;
}

const MovieCardSkeleton: React.FC<MovieCardSkeletonProps> = ({ message }) => (
    <MovieCard className="skeleton-card">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={180} width={120} />
            <Rating>
                <Skeleton width={40} height={20} />
                {message ? <><span>{message}</span> <FaStar color="#FFD700" /></> : ''}
            </Rating>
        </SkeletonTheme>
    </MovieCard>
);

export default MovieCardSkeleton;
