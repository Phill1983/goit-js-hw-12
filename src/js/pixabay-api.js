import axios from 'axios';


const API_KEY = '49001858-c4e55439ba726653c79b6c0f2';

const BASE_URL = 'https://pixabay.com/api/';

/**
 * Виконує запит до Pixabay API для отримання зображень за заданим запитом.

 * @param {string} query - Пошуковий запит (ключове слово).
 * @param {number} page - Номер сторінки для пагінації.
 * @param {number} perPage - Кількість зображень на сторінку (за замовчуванням 40).
 * @returns {Promise<Object>} - Об'єкт з результатами пошуку.
 */
export async function fetchImages(query, page = 1, perPage = 40) {
  try {

    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,         
        q: query,             
        image_type: 'photo', 
        orientation: 'horizontal', 
        safesearch: true,     
        page: page,          
        per_page: perPage,    
      },
    });

    return response.data;

  } catch (error) {
    console.error('Помилка запиту до Pixabay API:', error);
    throw error;
  }
}