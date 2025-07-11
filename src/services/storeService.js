import axios from 'axios';

const API = 'http://localhost:5000/api';

// Fetch all stores
export const getStores = async (token) => {
  const res = await axios.get(`${API}/stores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Submit a new rating
export const submitRating = async (storeId, rating, token) => {
  const res = await axios.post(
    `${API}/ratings`,
    { storeId, rating },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Update existing rating
export const updateRating = async (storeId, rating, token) => {
  const res = await axios.put(
    `${API}/ratings/${storeId}`,
    { rating },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
