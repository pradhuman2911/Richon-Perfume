import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  CheckCircle
} from 'lucide-react';

import PageBreadcrumb from '../components/PageBreadcrumb';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
      <>
    {/* <PageBreadcrumb
        links={[
          { path: '/', label: 'Home' },
          { path: '/contact', label: 'Contact us' },
        ]}
      /> */}
    <div className="bg-white min-h-screen">
      {/* Main Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="w-full">
              <div className="bg-[#f5ece3] rounded-2xl p-14">
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-medium text-[#1c1c1c] mb-2">Message Sent Successfully!</h3>
                    <p className="text-[#1c1c1c]/75">Thank you for contacting us. We'll respond within 24 hours.</p>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full h-12 px-0 py-0 border-0 border-b border-[#1c1c1c]/55 bg-transparent focus:outline-none focus:border-[#1c1c1c] transition-all duration-300 text-[#1c1c1c] placeholder-[#1c1c1c]/75 text-base font-normal rounded-none"
                        placeholder="Name:"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-11 px-0 py-0 border-0 border-b border-[#1c1c1c]/55 bg-transparent focus:outline-none focus:border-[#1c1c1c] transition-all duration-300 text-[#1c1c1c] placeholder-[#1c1c1c]/75 text-[15px] font-normal rounded-none"
                        placeholder="Email:"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 px-0 py-0 border-0 border-b border-[#1c1c1c]/55 bg-transparent focus:outline-none focus:border-[#1c1c1c] transition-all duration-300 text-[#1c1c1c] placeholder-[#1c1c1c]/75 text-base font-normal rounded-none"
                        placeholder="Phone number:"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[105px] px-0 py-0 border-0 border-b border-[#1c1c1c]/55 bg-transparent focus:outline-none focus:border-[#1c1c1c] transition-all duration-300 resize-none text-[#1c1c1c] placeholder-[#1c1c1c]/75 text-base font-normal rounded-none"
                        placeholder="Message:"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-[#5d3754] hover:bg-[#5d3754]/90 text-white font-semibold py-3 px-9 rounded-[10px] transition-all duration-300 uppercase text-[15px] tracking-wide"
                      >
                        Send Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="w-full pl-0 lg:pl-16">
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-[32px] font-bold text-[#1c1c1c] mb-4 leading-tight" style={{fontFamily: '"Playfair Display", serif'}}>
                    Keep In Touch with Us
                  </h2>
                  <p className="text-[15.75px] text-[#1c1c1c]/75 leading-relaxed font-normal">
                    We do not sell product from our corporate headquarters in New York City. If you want to visit please reach out to our customer service team first.
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-[19px] font-normal text-[#1c1c1c] mb-2" style={{fontFamily: '"Playfair Display", serif'}}>
                      Visit us:
                    </h3>
                    <p className="text-[15.75px] text-[#1c1c1c]/75 font-normal">
                      Sydney road, Billboard Street 2219-11C
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[19px] font-normal text-[#1c1c1c] mb-2" style={{fontFamily: '"Playfair Display", serif'}}>
                      Email us:
                    </h3>
                    <p className="text-[15.75px] text-[#1c1c1c]/75 font-normal">
                      richonysupport@mail.com
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[19px] font-normal text-[#1c1c1c] mb-2" style={{fontFamily: '"Playfair Display", serif'}}>
                      Call us:
                    </h3>
                    <p className="text-[15.75px] text-[#1c1c1c]/75 font-normal">
                      +1 (880) 567 891 505
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[19px] font-normal text-[#1c1c1c] mb-2" style={{fontFamily: '"Playfair Display", serif'}}>
                      We are open:
                    </h3>
                    <p className="text-[15.75px] text-[#1c1c1c]/75 font-normal">
                      Monday - Friday: 8:00-20:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </>
  );
};

export default Contact;