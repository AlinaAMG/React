import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function HomePage() {
  const [albums, setAlbums] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [filteredAlbums, setFilteredAlbums] = useState([]); 
  

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/albums')
      .then((response) => {
        console.log(response.data);
          setAlbums(response.data);
          setFilteredAlbums(response.data);
          
      })
      .catch((err) => {
        console.log('Error  fetching the albums', err);
      });
  },[]);

  const handleOnChange = (e) => {
    setInputSearch(e.target.value);
    };
    
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const filtered= albums.filter((album) => {
      return album.title.toLowerCase().includes(inputSearch.toLowerCase().trim());
    });
      setFilteredAlbums(filtered);
      setInputSearch("");
  };

  return (
    <div>
      <h3>List of Albums</h3>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search here"
          value={inputSearch}
          name="inputSearch"
          onChange={handleOnChange}
        />
        <button type="submit">Submit</button>
      </form>
      {albums &&
        filteredAlbums.map((album) => {
          return (
            <ul key={album.id}>
                  <Link className="list-link" to={`/about/${album.id}`}>
                <li className="list-items">{album.title}</li>
              </Link>
            </ul>
          );
        })}
    </div>
  );
}

export default HomePage;
