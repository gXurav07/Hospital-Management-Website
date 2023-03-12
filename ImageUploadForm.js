import React, { useState } from 'react';

export default function ImageUploadForm() {
  const [imageFile, setImageFile] = useState(null);

  function handleImageUpload(event) {
    setImageFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', imageFile);
    fetch('http://localhost:3001/api/upload-image', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image uploaded successfully');
        console.log(data);
      })
      .catch(error => {
        console.error('Error uploading image', error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageUpload} />
      <button type="submit">Upload Image</button>
    </form>
  );
}

