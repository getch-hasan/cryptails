import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { publicRequest } from '@/config/axios.config';
import Image from 'next/image';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReview = useCallback(async () => {
    try {
      const res = await publicRequest.get('review');
      if (res?.status === 200) {
        setReviews(res?.data?.data?.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReview();
  }, [fetchReview]);

  return (
    <div className="container-custom mt-20 py-12 px-6">
      {/* Heading */}
      <h1 className="md:text-5xl text-2xl font-extrabold text-center  text-primary   mb-10">
        What Our Customers Say
      </h1>

      {/* Review Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md rounded-xl p-6 border border-gray-200 animate-pulse"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="w-32 h-5 bg-gray-300 rounded mb-2"></div>
                      <div className="w-20 h-4 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                  <div className="mt-4 h-20 bg-gray-300 rounded"></div>
                </div>
              ))
          : reviews.length > 0
          ? reviews.map((review, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <Image
                    height={64}
                    width={64}
                    src={review?.thumbnail ? `${process.env.NEXT_PUBLIC_API_SERVER}${review.thumbnail}` : '/profile.jpg'}
                    alt={review?.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{review?.name}</h3>
                    <p className="text-yellow-500 text-sm">{'⭐'.repeat(review?.rating)}</p>
                  </div>
                </div>

                {/* Comment */}
                <p className="mt-4 text-gray-600 text-sm italic leading-relaxed">
                  "{review?.comment}"
                </p>
              </motion.div>
            ))
          : (
            <p className="text-center text-gray-500 col-span-full text-lg">No reviews available</p>
          )}
      </div>
    </div>
  );
};

export default Reviews;
