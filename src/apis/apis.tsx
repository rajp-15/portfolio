import { useState } from 'react';
import { axiosClient } from './index';
import { API_ROUTES } from './routes';

//Hook for get posts
export const useGetPost = () => {
    const [loading, setLoading] = useState(false);

    const getPosts = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get(
                API_ROUTES.GET_POST
            );
            return response.data;
        } finally {
            setLoading(false);
        }
    };

    return { getPosts, loading };
};
