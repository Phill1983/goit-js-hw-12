import axios from 'axios';

const API_KEY = '49001858-c4e55439ba726653c79b6c0f2';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Помилка запиту:', error);
    throw error;
  }
}

