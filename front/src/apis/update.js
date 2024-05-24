import axios from 'axios';

const patchApi = async (url, data, userToken) => {
  try {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error while making PATCH request:', error);
    throw error;
  }
};

export default patchApi;
