export default function OfferBanner() {
    return (
      <div className="bg-gradient-to-r my-5 from-yellow-500  to-orange-400 text-white rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Offer Info */}
        <div>
          <span className="bg-white text-orange-600 font-bold text-sm px-3 py-1 rounded-full uppercase tracking-wider">
            Wednesday Deal
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-3">
            Enjoy <span className="underline">40% Off</span> Every Wednesday!
          </h2>
          <p className="mt-2 text-sm md:text-base text-orange-100">
            Dine in at our restaurant this Wednesday and enjoy an exclusive discount. Limited time only!
          </p>
        </div>
  
        {/* Call to Visit Button */}
        <button className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-100 transition duration-300">
          Visit Cryptails
        </button>
      </div>
    );
  }
  