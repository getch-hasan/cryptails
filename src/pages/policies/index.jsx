

const Policies = () => {
  return (
    <div className="min-h-screen container-custom bg-gray-100 py-10 mt-16">
      <div className="   rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-primary mb-6">
          Our Policies
        </h1>

        {/* Policy Sections */}
        <div className="space-y-6">
          <PolicyCard
            title="Reservation Policy"
            description="Reservations are recommended for a seamless dining experience. Walk-ins are welcome but subject to availability."
          />
          <PolicyCard
            title="Cancellation Policy"
            description="Cancellations must be made at least 24 hours in advance. Late cancellations may incur a fee."
          />
          <PolicyCard
            title="Food Safety Policy"
            description="We adhere to the highest hygiene standards, ensuring fresh and safe ingredients in every dish."
          />
          <PolicyCard
            title="Refund & Return Policy"
            description="Payments are non-refundable once food is prepared. If there's an issue with your order, contact us within 30 minutes."
          />
          <PolicyCard
            title="Allergy Disclaimer"
            description="Our dishes may contain allergens such as nuts, dairy, and gluten. Please inform us of any dietary restrictions."
          />
        </div>
      </div>
    </div>
  );
};

// Reusable Policy Card Component
const PolicyCard = ({ title, description }) => {
  return (
    <div className="border-l-4 border-primary p-4 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default Policies;
