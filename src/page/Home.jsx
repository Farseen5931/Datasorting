import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
const Main = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  padding: 10px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);  // Slight zoom effect on hover
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }

  .product-info {
    padding: 10px 0;
    text-align: center;
  }

  .product-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .product-price {
    font-size: 14px;
    color: #777;
    margin-bottom: 10px;
  }

  .view-button {
    padding: 8px 15px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
`;

const Title = styled.div`
  text-align: center;
  font-family: 'Arial', sans-serif;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
`;

const SortButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

function Home() {
  const [apiData, setApidata] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // Ascending order by default

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setApidata(response.data);
        setSortedData(response.data); // Initially, show products as fetched
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Sort products based on price
  const sortProducts = (order) => {
    const sorted = [...apiData].sort((a, b) => {
      if (order === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortedData(sorted);
    setSortOrder(order);
  };

  return (
    <div>
      <Title>Our Products</Title>
      <SortButtons>
        <Button onClick={() => sortProducts('asc')}>Sort by Price (Low to High)</Button>
        <Button onClick={() => sortProducts('desc')}>Sort by Price (High to Low)</Button>
      </SortButtons>
      <Main>
        {sortedData.map((product) => (
          <ProductCard key={product.id}>
            <img src={product.image} alt={product.title} />
            <div className="product-info">
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price}</div>
              <button className="view-button">View Details</button>
            </div>
          </ProductCard>
        ))}
      </Main>
    </div>
  );
}

export default Home;
