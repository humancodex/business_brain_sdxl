import { useState } from 'react';
import { motion } from 'framer-motion';
 import Image from"next/image"
import Loader from "@/components/shared/icons/loading-circle"
function Img_generator() {
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  
const spinnerVariants = {
  start: {
    rotate: 20,
  },
  end: {
    rotate: 360,
  },
};

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 setLoading(true);
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
    setImageUrl(imageData[0])
     setInputValue("")
    ; // pass the string value to setImageUrl
  } else {
    console.error('Error:', response);
  }

 setLoading(false);

};

  return (
    <div className="min-h-screen bg-black bg-opacity-90 backdrop-opacity-30 py-6 flex flex-col justify-center sm:py-12">
      <div className=" opacity-1  relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-400 via-violet-200 to-gray-200 border-black transform -skew-y-6 sm:skew-y-0  sm:rounded-2xl"></div>
        <div className="relative px-5 py-10 bg-transparent border-y-indigo-400 shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded"
              placeholder="Enter a prompt..."
            />
            <button type="submit" className="w-full px-3 py-4 text-black bg-gradient-to-r from-gray-200 via-violet-200 to-gray-400 rounded-md focus:outline-none" disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>
      {loading && (
        <div className="mt-12 flex justify-center">
          <motion.div
            className="h-12 w-12 border-4 border-gray-200 rounded-full"
            variants={spinnerVariants}
            animate="end"
            initial="start"
          >
            
          </motion.div>
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
