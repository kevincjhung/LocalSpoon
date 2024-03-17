import axios from 'axios'

export const api = axios.create({

	baseURL: 'http://localhost:3000'
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
	try {
		console.log('Fetching data for page:', pageParam);

		const response = await api.get(`/api/explore?page=${pageParam}&pageSize=10`, {
			params: {
				...options,
			},
			headers: {
				'Cache-Control': 'no-cache',
			},
		});
		console.log('Response data:', response);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
