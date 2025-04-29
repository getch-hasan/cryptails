import Image from 'next/image';
import { FiWifi, FiDollarSign } from 'react-icons/fi';
import { TbRecycle } from 'react-icons/tb';

export default function AboutUsSection() {
  return (
    <section className="bg-white py-12 px-6 lg:px-24 flex flex-col lg:flex-row items-center">
      {/* Left: Image */}
      <div className="w-full lg:w-2/5 mb-8 lg:mb-0">
        <Image 
          src="/images/chef.webp" 
          alt="Chef" 
          width={600} 
          height={700} 
          className="rounded-lg object-cover"
        />
      </div>

      {/* Right: Content */}
      <div className="w-full lg:w-3/5 lg:pl-12">
        <p className="text-orange-500 font-semibold mb-2">ABOUT US</p>
        <h2 className="text-3xl lg:text-4xl font-bold font-bubblegum mb-4">
          We Were Founded In The 90&apos;s<br />
          Innovate For The Better
        </h2>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis ex quod perspiciatis accusamus maxime iis ex quod perspiciatis accusamus maxime ommo nditiis ex quod perspiciatis accusamus maxime omm
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3 border border-orange-200 rounded p-4">
            <div className="text-orange-500"><FiWifi size={28} /></div>
            <div>
              <h4 className="font-semibold">Free Wifi</h4>
              <p className="text-sm text-gray-600">Features</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 border border-orange-200 rounded p-4">
            <div className="text-orange-500"><FiDollarSign size={28} /></div>
            <div>
              <h4 className="font-semibold text-nowrap">Friendly Price</h4>
              <p className="text-sm text-gray-600">Price</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 border border-orange-200 rounded p-4">
            <div className="text-orange-500"><TbRecycle size={28} /></div>
            <div>
              <h4 className="font-semibold">Clean & Cool</h4>
              <p className="text-sm text-gray-600">Place</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
