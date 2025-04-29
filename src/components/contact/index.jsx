import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactSection() {
  return (
    <section className="flex flex-col lg:flex-row rounded-lg overflow-hidden  mt-10 ">
      {/* Google Maps iframe */}
      <div className="w-full lg:w-1/2 h-[400px]">
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.2607690421855!2d90.36381937493826!3d23.809324478630337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c1e3e709ca85%3A0x95892ce27465e668!2sCryptails!5e0!3m2!1sen!2sbd!4v1745943339718!5m2!1sen!2sbd"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
></iframe>

      </div>

      {/* Contact Info */}
      <div className="w-full lg:w-1/2 bg-red-50 p-8">
        <h2 className="text-3xl font-bold mb-8 font-bubblegum">Contact us</h2>
        <div className="space-y-6">
          {/* Phone */}
          <div className="flex items-start gap-4">
            <div className="border border-orange-500 p-3 rounded">
              <FiPhone className="text-orange-500 text-xl" />
            </div>
            <p className="text-gray-800">01613072175</p>
          </div>
          {/* Email */}
          <div className="flex items-start gap-4">
            <div className="border border-orange-500 p-3 rounded">
              <FiMail className="text-orange-500 text-xl" />
            </div>
            <p className="text-gray-800">contact@cryptails.com</p>
          </div>
          {/* Address */}
          <div className="flex items-start gap-4">
            <div className="border border-orange-500 p-3 rounded">
              <FiMapPin className="text-orange-500 text-xl" />
            </div>
            <p className="text-gray-800">
            house-40, Mirpur-6-,block-,lane-2, Dhaka 1216
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
