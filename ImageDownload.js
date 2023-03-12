import React, { useState } from 'react';

export default function ImageDownload(){
  const [imageSrc, setImageSrc] = useState('');

  const handleImageRequest = () => {
    const id = 3; // Replace with the id of the image you want to fetch
    fetch(`http://localhost:3001/api/image/${id}`)
      .then(response => response.blob())
      .then(imageBlob => {
        const url = URL.createObjectURL(imageBlob);
        setImageSrc(url);
      })
      .catch(error => console.error('Error fetching image', error));
  };

  return (
    <div>
      <button onClick={handleImageRequest}>Fetch Image</button>
      {imageSrc && <img src={imageSrc} alt="Fetched Image" />}
    </div>
  );
}


