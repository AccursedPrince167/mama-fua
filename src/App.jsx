import { useState, useEffect } from 'react';

function App() {
  const services = [
    // --- TOP SPECIAL SERVICES ---
    {
      id: 1,
      title: "Water Tank Cleaning",
      category: "Special Service",
      badge: "TOP SERVICE",
      price: "From KES 2,000",
      description: (
        <span className="block space-y-1 mt-2">
          <span className="block font-semibold text-white">Pricing Breakdown:</span>
          <span className="block">• Small (500L - 1,000L): KES 2,000 - 2,500</span>
          <span className="block">• Medium (2,000L - 5,000L): KES 3,500 - 5,000</span>
          <span className="block">• Large (10,000L / Underground): KES 7,000 - 10,000</span>
          <span className="block text-yellow-400 text-sm mt-2">* Transport fee applies if far.</span>
        </span>
      ),
      imageUrl: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Plumbing Services",
      category: "Special Service",
      badge: "TOP SERVICE",
      price: "From KES 1,500",
      description: (
        <span className="block space-y-1 mt-2">
          <span className="block">Fixing leaks, unblocking drains, installing new pipes, and general plumbing repairs.</span>
          <span className="block mt-2 font-semibold text-white">Call-out Fee: KES 1,500</span>
          <span className="block text-sm text-gray-300">(Parts and materials charged separately based on the job).</span>
        </span>
      ),
      imageUrl: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?q=80&w=1000&auto=format&fit=crop"
    },
    
    // --- REGULAR SERVICES ---
    {
      id: 3,
      title: "Usafi wa Kawaida (Standard Clean)",
      category: "Weekly Maintenance",
      price: "KES 1,500",
      description: "Perfect for weekly upkeep. Includes sweeping, mopping, dusting, and thorough bathroom cleaning.",
      imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Usafi wa Kina (Deep Clean)",
      category: "Premium Service",
      price: "KES 3,500",
      description: "Intensive cleaning for the whole house. Includes inside the fridge, oven, windows, and heavy dusting.",
      imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Move-Out / Move-In Clean",
      category: "Heavy Duty",
      price: "KES 5,500",
      description: "Complete top-to-bottom wash for vacant houses. Guaranteed to get your deposit back.",
      imageUrl: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Post-Construction Cleaning",
      category: "Heavy Duty",
      price: "KES 8,000",
      description: "Remove debris, dust, and paint splatters after a renovation or new build. We make your new space livable.",
      imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Vacuum Cleaning",
      category: "Specialized",
      price: "KES 2,000",
      description: "Deep vacuuming for carpets, rugs, and large spaces. Removes embedded dirt and allergens effectively.",
      imageUrl: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Kuosha Nguo Pekee",
      category: "Laundry",
      price: "KES 1,000",
      description: "We wash, dry, and fold your clothes. Perfect for busy professionals or large families.",
      imageUrl: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Kufua Mkeka (Mat Washing)",
      category: "Specialized",
      price: "KES 800",
      description: "Deep washing and drying of floor mats (mikeka). We remove stubborn stains and odors.",
      imageUrl: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 10,
      title: "Sofa Set Cleaning",
      category: "Upholstery",
      price: "KES 3,000",
      description: "Deep extraction cleaning for your living room sofa. Removes stains, dust mites, and odors.",
      imageUrl: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 11,
      title: "Viti (Dining Chairs) Cleaning",
      category: "Upholstery",
      price: "KES 1,500",
      description: "Professional cleaning for your dining chairs. We restore the fabric to look brand new.",
      imageUrl: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 12,
      title: "Usafi wa Ofisi (Office Clean)",
      category: "Commercial",
      price: "KES 4,000",
      description: "Keep your workspace professional and sanitized. Perfect for small to medium businesses.",
      imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const [activeService, setActiveService] = useState(services[0]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    phone: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((currentService) => {
        const currentIndex = services.findIndex(s => s.id === currentService.id);
        const nextIndex = (currentIndex + 1) % services.length;
        return services[nextIndex];
      });
    }, 6000); // Increased to 6 seconds since the description for water tank is longer
    return () => clearInterval(interval);
  }, [services.length]); 

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert(`Booking Confirmed!\n\nService: ${activeService.title}\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nDate: ${bookingData.date}\nTime: ${bookingData.time}`);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-gray-200 font-sans relative">
      
      {/* Navigation Bar */}
      <nav className="bg-[#15171e] border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <span className="text-2xl font-bold text-blue-500 tracking-wider">MAMA FUA</span>
              <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-400">
                <a href="#" className="text-white hover:text-blue-400 transition">Home</a>
                <a href="#" className="hover:text-white transition">Services</a>
                <a href="#" className="hover:text-white transition">Pricing</a>
                <a href="#" className="hover:text-white transition">Contact</a>
              </div>
            </div>
            <div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.5)]"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* SPOTLIGHT HERO SECTION */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 min-h-[450px] flex items-end">
          {services.map(service => (
            <div 
              key={service.id}
              className={`absolute inset-0 transition-opacity duration-1000 bg-cover bg-center ${
                activeService.id === service.id ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${service.imageUrl})` }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent"></div>
          
          <div className="relative z-10 p-8 md:p-16 w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className={`text-white text-xs font-bold px-2 py-1 rounded shadow-lg ${
                activeService.badge ? 'bg-orange-500 shadow-orange-500/50' : 'bg-blue-600'
              }`}>
                {activeService.badge || "SPOTLIGHT"}
              </span>
              <span className="text-sm font-semibold text-blue-300 bg-blue-900/50 px-2 py-1 rounded">{activeService.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 transition-all duration-500 drop-shadow-lg">
              {activeService.title}
            </h1>
            
            <div className="text-gray-200 max-w-2xl text-lg mb-6 drop-shadow-md leading-relaxed font-medium">
              {activeService.description}
            </div>
            
            <div className="flex items-center gap-4 mt-8">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-md font-bold hover:bg-blue-500 transition shadow-lg"
              >
                Book for {activeService.price}
              </button>
              <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-md font-medium hover:bg-white/20 transition flex items-center gap-2">
                Details
              </button>
            </div>
          </div>
        </div>

        {/* THUMBNAIL SELECTOR */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-12 custom-scrollbar">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service)}
              className={`flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden border-2 transition-all relative ${
                activeService.id === service.id ? 'border-blue-500 scale-105 shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-2 text-left">
                <span className="text-white text-xs font-bold leading-tight">{service.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* GRID SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold text-white">All Services</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => { setActiveService(service); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-gray-800 group-hover:border-blue-500 transition">
                  <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                  
                  {service.badge && (
                     <div className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                       {service.badge}
                     </div>
                  )}

                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight mb-1">{service.title}</h3>
                    <p className="text-blue-400 font-semibold text-sm">{service.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* --- BOOKING MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#15171e] border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Book Service</h2>
                <p className="text-sm text-blue-400 font-medium">{activeService.title} - {activeService.price}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition text-xl">✕</button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" required value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  className="w-full bg-[#0f1115] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Phone Number</label>
                <input 
                  type="tel" required value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full bg-[#0f1115] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500" placeholder="e.g. 0712345678"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
                  <input 
                    type="date" required value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                    className="w-full bg-[#0f1115] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
                  <input 
                    type="time" required value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})}
                    className="w-full bg-[#0f1115] border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:border-blue-500 [color-scheme:dark]"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-500 transition shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;