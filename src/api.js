// 47192464 - fcc47f6df3479fe275626acec

// PIXABAY - The API returns JSON-encoded objects.
// By default, you can make up to 100 requests per 60 seconds.
// Requests are associated with the API key, and not with your IP address.

import axios from "axios";

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '47192464-fcc47f6df3479fe275626acec';

const getImages = async (query, page = 1) => {
    const response = await axios.get(ENDPOINT, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 40
      },
    });

    return response.data;
}

export { getImages };