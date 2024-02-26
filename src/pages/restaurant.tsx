import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Define the interface for restaurant data
interface Restaurant {
  name: string;
  address: string;
  rating: number;
  types: string[];
  photos?: {
      url: string | undefined; photo_reference: string 
}[];
}

interface Photo {
    width: number;
    height: number;
    photo_reference: string;
    url:string;
  }
const Restaurant = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Updated error state to allow null values

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/restaurants');
        setRestaurants(data);
      } catch (error) {
        setError('Error fetching restaurants data');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
      <h1 className="header">Restaurants</h1>
      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant-container">
          <div className="content-container">
          <div className="restaurant-image">
              {restaurant.photos?.map((photo, photoIndex) => (
                <div key={photoIndex} className="image-container">
                  <img src={photo.url} alt="Restaurant" className="left-image" />
                  {/* Additional text here */}
                </div>
              ))}
            </div>
            <div className="restaurant-details">
              <h2>{restaurant.name}</h2>
              <p>Address: {restaurant.address}</p>
              <p>Rating: {restaurant.rating}</p>
              <p>Types: {restaurant.types.join(', ')}</p>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default Restaurant;
