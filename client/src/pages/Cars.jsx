import React, { useState } from 'react';
import { Car, Droplets, Shield, Clock, Star, Check, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const packages = [
    {
      id: 'small',
      name: 'Small Sedan Wash',
      price: 29.99,
      originalPrice: 49.99,
      popular: false,
      features: [
        'Exterior wash & rinse',
        'Interior vacuum cleaning',
        'Dashboard & console wipe',
        'Window cleaning (inside & out)',
        'Tire cleaning',
        'Monthly service (4 washes)',
      ],
      ideal: 'Perfect for sedans, hatchbacks, and compact cars',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'large',
      name: 'Large Car Wash',
      price: 49.99,
      originalPrice: 79.99,
      popular: true,
      features: [
        'Premium exterior wash & wax',
        'Deep interior detailing',
        'Leather/fabric conditioning',
        'Engine bay cleaning',
        'Wheel & tire detailing',
        'Monthly service (4 washes)',
        'Priority booking',
        'Free air freshener',
      ],
      ideal: 'Perfect for SUVs, trucks, and luxury vehicles',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const handlePackageSelect = (packageId) => {
    setSelectedPackage(packageId);
    // Here you would typically navigate to the registration form
    console.log(`Selected package: ${packageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Droplets className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-white">AquaClean</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-white">
            <a href="#services" className="hover:text-cyan-400 transition-colors">
              Services
            </a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            <span className="text-white text-sm">Premium Car Wash Subscription Service</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Keep Your Car
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent block">
              Spotless
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Professional monthly car wash subscription delivered right to your doorstep. Choose your package and let us
            handle the rest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <div className="flex items-center text-white">
              <Shield className="w-5 h-5 text-green-400 mr-2" />
              <span>100% Eco-Friendly</span>
            </div>
            <div className="flex items-center text-white">
              <Clock className="w-5 h-5 text-blue-400 mr-2" />
              <span>Flexible Scheduling</span>
            </div>
            <div className="flex items-center text-white">
              <Car className="w-5 h-5 text-purple-400 mr-2" />
              <span>All Vehicle Types</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Choose Your Package</h2>
            <p className="text-xl text-gray-300">Monthly subscriptions with no hidden fees</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/15 ${
                  selectedPackage === pkg.id ? 'ring-4 ring-cyan-400 scale-105' : ''
                }`}>
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${pkg.gradient} mb-4`}>
                    <Car className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{pkg.ideal}</p>

                  <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-4xl font-bold text-white">${pkg.price}</span>
                    <div className="text-left">
                      <div className="text-gray-400 line-through text-lg">${pkg.originalPrice}</div>
                      <div className="text-sm text-gray-300">per month</div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-200">
                      <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePackageSelect(pkg.id)}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center group ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                  }`}>
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 text-sm">✨ Cancel anytime • 📱 Easy scheduling • 🚗 Professional service</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-12">Why Choose AquaClean?</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">100% Satisfaction</h4>
              <p className="text-gray-300">Quality guaranteed or your money back</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Flexible Timing</h4>
              <p className="text-gray-300">Schedule at your convenience</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Eco-Friendly</h4>
              <p className="text-gray-300">Environmentally safe products</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
