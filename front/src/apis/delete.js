import axios from 'axios';

const deleteApi = async (url, authToken) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${authToken}` 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error while making DELETE request:', error);
    throw error;
  }
};

export default deleteApi;
