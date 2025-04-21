import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function AboutPage() {
  const { id } = useParams();
  const [alb, setAlb] = useState([]);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchAlbumsById();
  }, []);

  useEffect(() => {
    fetchPhotosByAlbumId();
  }, []);

  const fetchAlbumsById = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${id}`)
      .then((response) => {
        console.log(response.data);
        setAlb(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchPhotosByAlbumId = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((response) => {
        console.log(response.data);
        setPhotos(response.data);
      })
      .catch((err) => console.log('error loading photos:', err));
  };

  return (
      <div>
          <Link className="link" to="/">Back to HomePage</Link>
      <h1>Details about Album: {alb.title} </h1>
      <h3>Album id: {alb.id}</h3>
      <h3>User Id of the album: {alb.userId}</h3>
      <ul>
        <h3>Photos of album: {alb.title}</h3>
        {photos.map((photo) => (
          <li key={photo.id}>
            <h4>
              <strong>Photo Title: {photo.title}</strong>
            </h4>
            <img src={photo.thumbnailUrl} alt={photo.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AboutPage;
