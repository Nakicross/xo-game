import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../pages/components/restaurant/header';
import Footer from '../pages/components/restaurant/footer';

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
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors

        let url = 'http://localhost:4000/api/restaurants';
        if (searchQuery) {
          // If search query is not empty, send a POST request to search for restaurants
          url = 'http://localhost:4000/api/searchrestaurants';
        }
        const { data } = await axios.post(url, { query: searchQuery }); // Send search query in the request body
        console.log(data)
        setRestaurants(data);
      } catch (error) {
        setError('Error fetching restaurants data');
      } finally {
        setLoading(false); // Finish loading regardless of success or failure
      }
    };

    fetchRestaurants();
  }, [searchQuery]);

  const handleSearch = () => {
    // Trigger fetching restaurants with new search query
    setLoading(true);
    setError(null);
    // Automatically fetches data due to useEffect dependency on searchQuery
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="page-container">
      <Header onSearch={setSearchQuery} />
      {restaurants.map((restaurant, index) => (
        <div key={index} className="restaurant-container">
          <div className="content-container">
          <div className="restaurant-image">
              {restaurant.photos?.map((photo, photoIndex) => (
                <div key={photoIndex} className="image-container">
                  <img src={photo.url} alt="Restaurant" className="left-image" />
               
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
      <Footer />
    </div>
  );
  
};

export default Restaurant;
