import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { getStores, submitRating, updateRating } from '../services/storeService';

const StoreList = () => {
  const { user } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ratings, setRatings] = useState({});
  const [userRatings, setUserRatings] = useState({});

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores(user.token);
        setStores(response);

        const submittedRatings = {};
        response.forEach(store => {
          if (store.userRating) {
            submittedRatings[store.id] = store.userRating;
          }
        });

        setRatings(submittedRatings);
        setUserRatings(submittedRatings);
      } catch (err) {
        console.error('Failed to fetch stores:', err);
      }
    };
    fetchStores();
  }, [user]);

  const handleRatingChange = (storeId, value) => {
    setRatings(prev => ({ ...prev, [storeId]: value }));
  };

  const handleRatingSubmit = async (storeId) => {
    const ratingValue = parseInt(ratings[storeId], 10);
    if (!ratingValue || ratingValue < 1 || ratingValue > 5) {
      return alert('Please enter a valid rating between 1 and 5');
    }

    try {
      if (userRatings[storeId]) {
        await updateRating(storeId, ratingValue, user.token);
        alert('Rating updated!');
      } else {
        await submitRating(storeId, ratingValue, user.token);
        alert('Rating submitted!');
      }

      // Refresh data
      const updatedStores = await getStores(user.token);
      setStores(updatedStores);

      const updatedUserRatings = {};
      updatedStores.forEach(store => {
        if (store.userRating) {
          updatedUserRatings[store.id] = store.userRating;
        }
      });
      setUserRatings(updatedUserRatings);
      setRatings(updatedUserRatings);
    } catch (err) {
      console.error('Rating operation failed:', err);
      alert('Failed to submit/update rating');
    }
  };

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🛍️ Store Listings</h2>

      <input
        type="text"
        placeholder="Search by Name or Address"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full mb-6"
      />

      {filteredStores.length === 0 ? (
        <p className="text-gray-500">No stores found.</p>
      ) : (
        filteredStores.map((store) => (
          <div
            key={store.id}
            className="bg-white shadow-sm border rounded p-5 mb-4"
          >
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p className="text-gray-600">📍 {store.address}</p>
            <p className="mt-1 text-sm">⭐ Average Rating: {store.avgRating?.toFixed(1) || 'No ratings yet'}</p>
            <p className="text-sm text-green-700 mb-2">
              Your Rating: {userRatings[store.id] || 'Not rated yet'}
            </p>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="5"
                value={ratings[store.id] || ''}
                onChange={(e) => handleRatingChange(store.id, e.target.value)}
                className="border border-gray-300 px-3 py-1 rounded w-24"
              />
              <button
                onClick={() => handleRatingSubmit(store.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
              >
                {userRatings[store.id] ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StoreList;
