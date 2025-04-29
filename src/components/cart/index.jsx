import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Cart = ({handleModal,food}) => {
    
  return (
    <div

      className="w-full h-fit rounded-lg bg-white  flex flex-col justify-between "
    >
      <div className="overflow-hidden w-full  rounded-t-[15px] ">
        <Image
          height={400}
          width={300}
          className="w-full object-cover h-40 transition-transform duration-500 hover:scale-125"
          src={`${process.env.NEXT_PUBLIC_API_SERVER}/${food?.cook_image}`}
          alt={food?.cook_name}
        />
      </div>
     
    <div className="p-3 md:p-5">
    <div className="text-center ">
        <h1 className="font-bold font-bubblegum">{food?.cook_name}</h1>
       
            {/* Ratings */}
            <div className="flex justify-center py-2">
              {food?.rating &&
                Array(Math.floor(food?.rating))
                  .fill(null)
                  .map((_, index) => (
                    <FaStar key={index} className="text-primary" />
                  ))}
              {food?.rating % 1 !== 0 ? (
                <FaStarHalfAlt className="text-primary" />
              ) : (
                <FaStar className="text-white" />
              )}
            </div>
            
      
      </div>
      <div className="flex justify-between items-center mt-5 font-openSans ">
        <span className="text-base font-bold text-nowrap">{food?.price} tk</span>
        <motion.button
      onClick={()=>handleModal(food?.cook_id)}
      className="border-2 text-nowrap border-primary md:text-sm text-[10px] font-bold px-3 py-1 rounded-full hover:bg-primary relative overflow-hidden"
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        scale: [1, 1, 1],
        boxShadow: ["0px 0px 5px rgba(29, 78, 216, 0.5)", "0px 0px 10px rgba(29, 78, 216, 1)", "0px 0px 5px rgba(29, 78, 216, 0.5)"],
      }}
      transition={{ duration: 1.5,repeat: Infinity,
        repeatType: "loop", }}
    >
      View More
    </motion.button>

      </div>
    </div>
    </div>
  );
};

export default Cart;
