import axios from 'axios';

const getApi = async (url, authToken) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${authToken}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error while making GET request:', error);
    throw error;
  }
};

export default getApi;
