import React, { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

interface ImageUploaderProps {
  currentImage?: string;
  onUpload: (file: File) => Promise<void>;
  className?: string;
}

export default function ImageUploader({ currentImage, onUpload, className = '' }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImage);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      console.log('Files dropped:', acceptedFiles);
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        console.log('Processing file:', file.name);
        // Create preview URL
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
        await onUpload(file);
        console.log('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error in onDrop:', error);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    multiple: false,
    noClick: true
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log('File select triggered');
      const files = e.target.files;
      if (files && files.length > 0) {
        const file = files[0];
        console.log('Processing selected file:', file.name);
        // Create preview URL
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
        await onUpload(file);
        console.log('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error in handleFileSelect:', error);
    }
  };

  // Cleanup preview URL when component unmounts or when preview changes
  React.useEffect(() => {
    return () => {
      if (previewUrl && previewUrl !== currentImage) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, currentImage]);

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        onClick={handleClick}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
        `}
      >
        <input 
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        {previewUrl ? (
          <div className="relative w-full h-48">
            <Image
              src={previewUrl}
              alt="Selected image"
              fill
              className="object-cover rounded"
              onError={(e) => {
                console.error('Error loading image:', previewUrl);
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
        ) : (
          <div className="space-y-2 py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the image here ...</p>
              ) : (
                <p>Drag and drop an image, or click to select</p>
              )}
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
} 