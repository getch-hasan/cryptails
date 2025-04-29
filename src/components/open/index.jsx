export default function OpenHoursSection() {
    return (
      <section className="bg-red-50 py-12 px-6 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-8 font-bubblegum">Open Hours</h2>
  
        {/* Days Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 justify-center mb-6">
          {[
            'Saturday','Sunday','Monday', 'Tuesday', 'Wednesday',
            'Thursday', 
          ].map((day) => (
            <div
              key={day}
              className="border border-dotted border-orange-500 p-4 rounded"
            >
              <p className="font-semibold">{day.toUpperCase()}</p>
              <p className="text-sm">8AM - 11PM</p>
            </div>
          ))}
        </div>
  
        {/* Sunday Highlighted */}
        <div className="bg-primary text-white font-bold py-6 rounded w-full sm:w-1/2 mx-auto">
          <p className="text-lg">FRIDAY</p>
          <p className="text-xl">10 AM - 11 PM</p>
        </div>
      </section>
    );
  }
  