import axios from 'axios';

const postApi = async (url, data, userToken = null) => {
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    }

    const response = await axios.post(`${process.env.REACT_APP_API_URL}${url}`, data, {
      headers: headers
    });
    return response.data;
  } catch (error) {
    console.error('Error while making POST request:', error);
    throw error;
  }
};


export default postApi;