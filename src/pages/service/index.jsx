import { PrimaryButton } from '@/components/button';
import { serviceData } from '@/components/data';
import Image from 'next/image';
import React from 'react';

const Services = () => {
  return (
    <div>
      <section
             id="service"
             className="flex justify-around container-custom items-center mt-16 py-10 flex-col-reverse  md:flex-row gap-8 "
           >
             <div className="lg:w-1/2 w-full flex justify-center ">
               <Image
                 height={400}
                 width={400}
                 src="/images/chef.webp"
                 className="rounded-3xl"
                 alt="service"
               />
             </div>
             <div className="lg:w-1/2 w-full">
               <h1 className="md:text-5xl text-2xl font-bubblegum pb-5">
                 We have Multiple Services
               </h1>
               <p className="text-sm font-openSans ">
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea
                 voluptatibus aut quis velit quidem. Ex facilis voluptas
                 reprehenderit quasi consectetur placeat natus. Non, perferendis ut?
                 Nobis maiores minima officiis dolor.
               </p>
               <div>
                 <div className="grid grid-cols-2 gap-4 justify-between mt-10 pb-10">
                   {serviceData?.map((data, index) => (
                     <div key={data.name} className="flex items-center gap-4 ">
                       {" "}
                       {data?.logo}
                       <p className="text-sm font-bubblegum font-semibold ">
                         {data?.name}
                       </p>
                     </div>
                   ))}
                 </div>
                 <PrimaryButton name={"About Us"} link="/about-us" />
               </div>
             </div>
           </section>
    </div>
  );
};

export default Services;