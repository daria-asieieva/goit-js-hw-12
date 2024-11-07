import axios from 'axios';

const API_KEY = '46845751-23df18a8b1d1a4c3ff293bf75';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
  const url = `${BASE_URL}`;
  try {
    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage
      }
    });
    
    if (response.data.hits.length === 0) {
      throw new Error('No images found');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}