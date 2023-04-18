import { useState } from 'react';

 import Image from"next/image"

function Img_generator() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // make the API request with the value of the input field
  const response = await fetch('/api/predictions/text_to_image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputValue })
  });

  if (response.ok) {
    const imageData = await response.json();
    console.log(imageData)
    setImageUrl(imageData[0]); // pass the string value to setImageUrl
  } else {
    console.error('Error:', response);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-green-500 to-cyan-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-5 py-3 text-gray-700 bg-gray-200 rounded"
              placeholder="Enter a prompt..."
            />
            <button type="submit" className="w-full px-3 py-4 text-white bg-gradient-to-r from-cyan-400 via-green-500 to-cyan-400 rounded-md focus:outline-none" disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div className="mt-12 flex justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      )}
      {imageUrl && !loading && (
       <div className='mt-12 flex justify-center'>
          <Image src={imageUrl} alt="Generated image" className="rounded-xl shadow-lg " width={500}
      height={500}/>
      </div>
        
      )}
      <style jsx>{`
        .loader {
          animation: spin 1s linear infinite;
          border-top-color: #3498db;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Img_generator;
