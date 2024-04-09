
import axios from 'axios'



export async function getSessionToken() {

    let data = {}
    try {
      const response = await axios.get('http://localhost:3000//api/auth/token');
      console.log('Session data:', response.data);
      data=response;
    } catch (error) {
      console.error('Error fetching session token:', error);
    }

    return data;



  }


