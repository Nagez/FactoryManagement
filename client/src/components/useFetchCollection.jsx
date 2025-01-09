import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';

// Custom hook to fetch data from a given collection
const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token');

  const fetchData = async () => {
    try {
      const { data } = await axiosInstance.get(`/${collectionName}`, {
        headers: {
          'x-access-token': token
        }
      });
      setData(data);
      console.log(data)
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  return { data, loading, error, refetch: fetchData };
}
export default useFetchCollection;
