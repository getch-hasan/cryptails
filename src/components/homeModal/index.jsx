import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const HomeModal = ({closeModal,detail}) => {
    const [imageArray, setImageArray] = useState([]);
 const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
      if (detail?.gallary_images) {
        let galleryImages = [];
    
        if (typeof detail.gallary_images === "string") {
          try {
            galleryImages = JSON.parse(detail.gallary_images);
          } catch (error) {
            console.error("Error parsing gallery images:", error);
            return; // Exit if parsing fails
          }
        } else if (Array.isArray(detail.gallary_images)) {
          galleryImages = detail.gallary_images;
        }
    
        if (Array.isArray(galleryImages)) {
          const cleanedImages = galleryImages.map((image) =>
            image.replace(/\\/g, "")
          );
          setImageArray(cleanedImages);
        }
      }
    }, [detail?.gallary_images]); // Fixed dependency
    
    console.log(imageArray, "Updated imageArray");
    
    const nextImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageArray?.length);
    };
  
    const prevImage = () => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex - 1 + imageArray?.length) % imageArray?.length
      );
    };
  
  return (
   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
             <div className="bg-white p-5 rounded-lg shadow-lg w-11/12 max-w-lg relative">
               <button
                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
                 onClick={() => closeModal()}
               >
                 &times;
               </button>
   
               {/* Image Section */}
               <div className="relative flex items-center justify-center py-4">
                 <button
                   onClick={prevImage}
                   className="absolute left-0 px-2 text-3xl text-gray-700 hover:text-black"
                 >
                   &#8249;
                 </button>
                 <div>
                   {imageArray?.[currentImageIndex] ? (
                     <Image
                       key={currentImageIndex}
                       height={400}
                       width={300}
                       className="object-cover rounded w-full h-60"
                       src={`${process.env.NEXT_PUBLIC_API_SERVER}/${imageArray[currentImageIndex]}`}
                       alt={`Image ${currentImageIndex + 1}`}
                       loading="lazy"
                     />
                   ) : (
                     <div className="w-[300px] h-60 bg-gray-200 animate-pulse rounded"></div>
                   )}
                 </div>
                 <button
                   onClick={nextImage}
                   className="absolute right-0 px-2 text-3xl text-gray-700 hover:text-black"
                 >
                   &#8250;
                 </button>
                 <div className="absolute bottom-2 left-2 bg-opacity-50 text-sm px-2 py-1 rounded">
                   {currentImageIndex + 1}/{imageArray?.length}
                 </div>
               </div>
   
               {/* Text Section */}
               <h2 className="text-2xl font-bold text-center font-bubblegum">
                 {detail?.cook_name ? (
                   detail.cook_name
                 ) : (
                   <div className="w-2/3 h-6 bg-gray-200 animate-pulse mx-auto rounded"></div>
                 )}
               </h2>
   
               <p className="py-4 font-openSans">
                 {detail?.about_cook ? (
                   detail.about_cook
                 ) : (
                   <div className="w-5/6 h-4 bg-gray-200 animate-pulse mx-auto rounded"></div>
                 )}
               </p>
   
               {/* Price and Button */}
               <div className="flex justify-between items-center">
                 <span className="text-lg font-bold">
                   {detail?.price ? (
                     `${detail.price} tk`
                   ) : (
                     <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
                   )}
                 </span>
                 <button
                   onClick={() => closeModal()}
                   className="border-2 border-primary px-4 py-2 rounded hover:bg-primary"
                 >
                   Close
                 </button>
               </div>
             </div>
           </div>
  );
};

export default HomeModal;