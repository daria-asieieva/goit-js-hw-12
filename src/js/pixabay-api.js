import axios from 'axios';

const API_KEY = '46845751-23df18a8b1d1a4c3ff293bf75';
const BASE_URL = 'https://pixabay.com/api/';

export async function getData(inputValue, page = 1, per_page = 15) {
    try {
        const { data } = await axios.get(API_URL, {
            params: {
                key: API_KEY,
                q: inputValue,
                image_type: "photo",
                orientation: "horizontal",
                safesearch: true,
                page,
                per_page,
            }
        });
        console.log(data);

        if (data.hits.length === 0) {
            return { hits: [] };
        }
        return data;
    } catch (error) {
        console.log(error);
        iziToast.error({
            title: 'Сталася помилка при отриманні зображень.',
            message: 'Спробуйте ще раз!',
            position: 'topRight'
        });
        return { hits: [] };;
    }
}