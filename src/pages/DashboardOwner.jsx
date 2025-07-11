import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardOwner = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchOwnerData = async () => {
      try {
        const res = await axios.get('/api/owner/ratings');
        setRatings(res.data.users);
        setAvgRating(res.data.avg);
      } catch (err) {
        console.error('Error fetching owner data:', err);
      }
    };
    fetchOwnerData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Store Owner Dashboard</h1>
      <p className="mb-4">Average Store Rating: <strong>{avgRating}</strong></p>
      <h2 className="text-xl font-semibold mb-2">Ratings Received:</h2>
      <ul className="list-disc ml-6">
        {ratings.map((r, index) => (
          <li key={index}>{r.name} rated {r.rating}/5</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardOwner;