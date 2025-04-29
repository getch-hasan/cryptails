export const FoodDetailSkeleton = () => {
  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-2xl border-2 transition-all duration-300 relative max-h-[90vh] overflow-y-auto">
      {/* Close Button Skeleton */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>

      {/* Grid Layout for Image & Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Image Skeleton */}
        <div className="w-full h-52 md:h-64 bg-gray-200 animate-pulse rounded-xl shadow-md"></div>

        {/* Food Details Skeleton */}
        <div>
          <div className="w-48 h-8 bg-gray-200 animate-pulse rounded"></div>

          <div className="flex items-center mt-2">
            <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="w-full h-12 bg-gray-200 animate-pulse rounded mt-4"></div>

          {/* Variation Skeleton */}
          <div className="bg-gray-100 p-4 rounded-lg mt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-32 h-5 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-16 h-5 bg-gray-200 animate-pulse rounded"></div>
            </div>

            <div className="space-y-3">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-200 p-3 rounded-lg animate-pulse"
                >
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Skeleton */}
      <div className="mt-6">
        <div className="w-40 h-6 bg-gray-200 animate-pulse rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center bg-gray-200 p-3 rounded-lg animate-pulse">
              <div className="w-10 h-10 bg-gray-300 rounded-md"></div>
              <div className="w-24 h-4 bg-gray-300 rounded ml-3"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Add to Cart Skeleton */}
      <div className="flex items-center gap-3 mt-6">
        {/* Quantity Selector Skeleton */}
        <div className="w-24 h-10 bg-gray-200 animate-pulse rounded-lg"></div>

        {/* Buttons */}
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="w-full h-10 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    </div>
  );
};

  
 export const MenuSkeleton = () => {
    return (
      <main className="bg-gray-900 ">
        <div className="text-white container-custom py-10">
     
          <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2 gap-8">
            {[1, 2, 3, 4, ].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="flex-1">
                  <div className="w-full h-6 bg-gray-600 animate-pulse rounded"></div>
                  <div className="w-40 h-4 bg-gray-500 animate-pulse rounded mt-2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  };
  
  export const CategorySlekeloton=()=>{
return (
     
     <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-lg mb-6">
     {[1, 2, 3, 4, 5].map((_, index) => (
       <div key={index} className="w-20 h-10 bg-gray-700 animate-pulse rounded-lg"></div>
     ))}
   </div>
)
  }
 
  import { FaStar, FaStarHalfAlt } from "react-icons/fa";

  export default function FoodCardSkeleton() {
    return (
      <div className="w-full h-fit rounded-lg bg-gray-200 animate-pulse flex flex-col justify-between">
        <div className="overflow-hidden w-full rounded-t-[15px] bg-gray-300 h-40"></div>
        
        <div className="p-5">
          <div className="text-center">
            <div className="h-6 w-3/4 mx-auto bg-gray-300 rounded-md"></div>
            
            {/* Ratings Skeleton */}
            <div className="flex justify-center py-2 space-x-1">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className="text-gray-400" />
              ))}
            </div>
            
            <div className="h-4 w-full bg-gray-300 rounded-md my-2"></div>
          </div>
          
          <div className="flex justify-between items-center mt-5">
            <div className="h-6 w-12 bg-gray-300 rounded-md"></div>
            <div className="h-8 w-24 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }
 export const CartSkeleton = () => {
    return (
      <div className="w-full h-fit rounded-lg bg-white flex flex-col justify-between animate-pulse">
        {/* Image Placeholder */}
        <div className="w-full h-40 bg-gray-300 rounded-t-[15px]"></div>
  
        <div className="p-5">
          {/* Name Placeholder */}
          <div className="h-6 w-3/4 bg-gray-300 rounded-md mx-auto"></div>
  
          {/* Rating Placeholder */}
          <div className="flex justify-center py-2 gap-1">
            {Array(10).fill(null).map((_, index) => (
              <div key={index} className="h-4 w-4 bg-gray-300 rounded-full"></div>
            ))}
          </div>
  
          {/* Price & Button Placeholder */}
          <div className="flex justify-between items-center mt-5">
            <div className="h-6 md:w-20 w-12 bg-gray-300 rounded-md"></div>
            <div className="h-6 md:w-20 w-16 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };
  