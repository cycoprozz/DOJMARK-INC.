'use client';

import { useEffect } from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function Services() {
  useEffect(() => {
    // Add fade-in animation to elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-on-scroll">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-on-scroll">
              Comprehensive digital solutions designed to elevate Black-owned businesses and diverse entrepreneurs.
            </p>
          </div>
        </div>
      </div>

      {/* Services Details */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="space-y-20">
              {/* Service 1 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div className="lg:order-2">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Custom Website Design & Development
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    We create stunning, responsive websites that capture your brand essence and convert visitors into customers. 
                    Our designs are culturally fluent and technically superior.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Mobile-first responsive design</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">SEO-optimized structure</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Fast load times and performance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Accessibility compliant</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="lg:order-1 flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#d4af37] to-[#c41e3a] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🌐</span>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Product Development
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Specializing in eCommerce and dropshipping solutions that drive sales and streamline operations. 
                    We help you bring your products to market with efficiency and style.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Shopify and custom eCommerce platforms</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Dropshipping automation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Inventory management systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Payment gateway integration</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#2e8b57] to-[#d4af37] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🧠</span>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div className="lg:order-2">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Brand Content Creation
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Professional photo, video, graphics, and copy that tell your unique story. 
                    Our content creation services are designed to showcase your brand in the best light.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Professional photography and videography</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Graphic design and branding</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Copywriting and content strategy</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Social media content creation</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="lg:order-1 flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#c41e3a] to-[#2e8b57] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">📷</span>
                  </div>
                </div>
              </div>

              {/* Service 4 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Social Media Integration
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Seamless social media strategies that amplify your brand's reach and engagement. 
                    We help you connect with your audience across all platforms.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Platform-specific strategy development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Content calendar creation</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Community management</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Analytics and performance tracking</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#d4af37] to-[#2e8b57] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">📲</span>
                  </div>
                </div>
              </div>

              {/* Service 5 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div className="lg:order-2">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Business Launch Kits
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Complete startup packages including logo, website, CRM setup, and AI automation. 
                    Everything you need to launch your business successfully.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Logo and brand identity design</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Professional website development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">CRM system setup and integration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">AI automation and workflow setup</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="lg:order-1 flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#2e8b57] to-[#c41e3a] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">🧩</span>
                  </div>
                </div>
              </div>

              {/* Service 6 */}
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-on-scroll">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Digital Strategy Consulting
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Data-driven approaches to grow your online presence and maximize ROI. 
                    We help you make informed decisions about your digital investments.
                  </p>
                  <ul className="mt-8 space-y-4 text-gray-600">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Digital audit and analysis</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Competitive research and insights</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Growth strategy development</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 flex-shrink-0 text-blue-600" />
                      <span className="ml-3">Performance optimization</span>
                    </li>
                  </ul>
                  <div className="mt-8">
                    <Button className="btn-primary">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-br from-[#d4af37] to-[#c41e3a] rounded-lg flex items-center justify-center">
                    <span className="text-4xl">📊</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Let's discuss how our services can help you achieve your business goals.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}