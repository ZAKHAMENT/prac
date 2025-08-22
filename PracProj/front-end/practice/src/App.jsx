import { useEffect, useState, } from 'react'
import { useParams, Link } from 'react-router-dom';

import './App.css'
import axios from 'axios';
import Pagination from './Pagination';

function App() {
  const [data, setData] = useState([]);
  const [limitData, setLimitData] = useState([]);
  const {pageID} = useParams();
    let amountOfPages = Math.ceil(data.length/3);

  useEffect(() => {
    
    const fetchData = async () => {
      
      try {
        const res = await axios.get('https://jsonplaceholder.typicode.com/users');
        setData(res.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    }
    fetchData();
    
    let skipUsers = (pageID-1) *3;
    setLimitData(
      data.slice(skipUsers+1, 3+1)
    )
  }, []);

  console.log(limitData);
  
  return (
    <>
      <h1>Data Fetching Example</h1>
      <div className="container">
      {data?.map((curr, i) => (
        <div className="individualContainer" key={i}>
        <p >Name: {curr.name}</p>
        <p>Username: {curr.username}</p>
        <p>Email: {curr.email}</p>
        </div>
      ))}
      </div>
      
      {Array.from({ length: amountOfPages }, (_, i) => (
        <span key={i}>
          <Link to={`/${i+1}`} > 
        <button> {i+1}</button>
        </Link>
        </span>
      ))}
      
      </>
  )
}

export default App
