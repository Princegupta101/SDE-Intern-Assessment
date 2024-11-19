'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ImageUpload({ images, onChange, maxImages = 10 }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadError('');

    // Validate file count
    if (files.length + images.length > maxImages) {
      setUploadError(`Maximum ${maxImages} images allowed`);
      return;
    }

    // Validate file sizes and types
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    for (const file of files) {
      if (file.size > maxSize) {
        setUploadError('Files must be less than 5MB');
        return;
      }
      if (!validTypes.includes(file.type)) {
        setUploadError('Only JPEG, PNG, and WebP images are allowed');
        return;
      }
    }

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);

        console.log('Uploading file:', file.name, 'Size:', file.size, 'Type:', file.type);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to upload image');
        }

        console.log('Upload response:', data);
        uploadedUrls.push(data.url);
      }

      onChange([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      setUploadError(error.message || 'Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      {uploadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {uploadError}
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((url, index) => (
          <div key={index} className="relative aspect-square">
            <Image
              src={url}
              alt={`Uploaded image ${index + 1}`}
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <input
          type="file"
          onChange={handleImageUpload}
          multiple
          accept="image/jpeg,image/png,image/webp"
          disabled={uploading || images.length >= maxImages}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`cursor-pointer px-4 py-2 rounded-lg transition-colors ${
            uploading || images.length >= maxImages
              ? 'bg-gray-400'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {uploading
            ? 'Uploading...'
            : images.length >= maxImages
            ? 'Maximum images reached'
            : 'Upload Images'}
        </label>
      </div>
    </div>
  );
}