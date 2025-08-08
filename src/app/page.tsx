'use client';

import { useEffect } from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';

export default function Home() {
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
              <span className="block">Black Excellence in</span>
              <span className="block text-blue-600">Digital Creation</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-on-scroll">
              DOJMARK is a Black-centered digital content creation agency specializing in custom website design, 
              product development, brand content creation, and full business launch kits for underrepresented businesses.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-on-scroll">
              <Button className="btn-primary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-secondary">
                View Our Work
              </Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Services
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We provide comprehensive digital solutions tailored to Black-owned businesses and diverse entrepreneurs.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Custom Website Design",
                description: "Stunning, responsive websites that capture your brand essence and convert visitors.",
                icon: "🌐"
              },
              {
                title: "Product Development",
                description: "eCommerce and dropshipping solutions that drive sales and streamline operations.",
                icon: "🧠"
              },
              {
                title: "Brand Content Creation",
                description: "Professional photo, video, graphics, and copy that tell your unique story.",
                icon: "📷"
              },
              {
                title: "Social Media Integration",
                description: "Seamless social media strategies that amplify your brand's reach and engagement.",
                icon: "📲"
              },
              {
                title: "Business Launch Kits",
                description: "Complete startup packages including logo, website, CRM setup, and AI automation.",
                icon: "🧩"
              },
              {
                title: "Digital Strategy",
                description: "Data-driven approaches to grow your online presence and maximize ROI.",
                icon: "📊"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-600 transition-all animate-on-scroll">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Client Testimonials
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Hear from businesses we've helped transform.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Jamal Williams",
                role: "CEO, Urban Threads",
                content: "DOJMARK transformed our online presence completely. Our sales increased by 150% in just three months after launching our new site.",
                rating: 5
              },
              {
                name: "Aisha Johnson",
                role: "Founder, Bloom Wellness",
                content: "The team at DOJMARK understood our vision perfectly. They delivered a brand identity that truly represents our values and mission.",
                rating: 5
              },
              {
                name: "Marcus Thompson",
                role: "Owner, TechForward Solutions",
                content: "Working with DOJMARK was the best business decision I made this year. Their expertise in digital strategy is unmatched.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg animate-on-scroll">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-blue-600 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Photography Gallery Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Photography Gallery
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Capturing moments that tell your story through professional photography services.
            </p>
          </div>
          <div className="mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Portrait Photography",
                  description: "Professional headshots and portrait sessions",
                  image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Portrait"
                },
                {
                  title: "Event Photography",
                  description: "Corporate events, weddings, and special occasions",
                  image: "https://via.placeholder.com/400x300/2563eb/ffffff?text=Events",
                  featuredImages: [
                    {
                      title: "IDEA Institute Event",
                      description: "Professional speaking engagement at IDEA Institute for Dual Degree Engineering Advancement",
                      image: "/images/event-photography/idea-institute-event.jpg"
                    },
                    {
                      title: "Social Gathering",
                      description: "Indoor networking event with attendees enjoying refreshments",
                      image: "/images/event-photography/social-gathering.jpg"
                    },
                    {
                      title: "MOREHOUSE Event",
                      description: "Formal group photography at MOREHOUSE institution",
                      image: "/images/event-photography/morehouse-event.jpg"
                    },
                    {
                      title: "Library Gathering",
                      description: "Community event in academic library setting",
                      image: "/images/event-photography/library-gathering.jpg"
                    }
                  ]
                },
                {
                  title: "Product Photography",
                  description: "High-quality product shots for eCommerce",
                  image: "https://via.placeholder.com/400x300/1d4ed8/ffffff?text=Products"
                },
                {
                  title: "Real Estate Photography",
                  description: "Property and architectural photography",
                  image: "https://via.placeholder.com/400x300/1e40af/ffffff?text=Real+Estate"
                },
                {
                  title: "Brand Photography",
                  description: "Custom brand imagery and content creation",
                  image: "https://via.placeholder.com/400x300/1e3a8a/ffffff?text=Brand"
                },
                {
                  title: "Lifestyle Photography",
                  description: "Candid and lifestyle photography sessions",
                  image: "https://via.placeholder.com/400x300/172554/ffffff?text=Lifestyle"
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all animate-on-scroll">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    {/* Featured Images for Event Photography */}
                    {item.featuredImages && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Featured Event Photos:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {item.featuredImages.map((featuredImage, featuredIndex) => (
                            <div key={featuredIndex} className="relative group cursor-pointer">
                              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                                  <div className="text-center p-2">
                                    <div className="text-xs font-medium text-blue-800">{featuredImage.title}</div>
                                    <div className="text-xs text-blue-600 mt-1">Event Photo</div>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center">
                                <div className="text-white text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2">
                                  <div className="font-medium">{featuredImage.title}</div>
                                  <div className="text-xs mt-1">{featuredImage.description}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Covers Section */}
      <div className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Explore our latest work and client success stories.
            </p>
          </div>
          <div className="mx-auto mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "The Morris Team",
                  description: "Real Estate Website",
                  image: "https://via.placeholder.com/400x300/2563eb/ffffff?text=The+Morris+Team",
                  link: "https://the-morris-team.netlify.app"
                },
                {
                  title: "Secret Touch Spa",
                  description: "Luxury Spa Website",
                  image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Secret+Touch+Spa",
                  link: "https://secrettouchspa.netlify.app"
                },
                {
                  title: "Carib Life ATL",
                  description: "Caribbean Community Platform",
                  image: "https://via.placeholder.com/400x300/1d4ed8/ffffff?text=Carib+Life+ATL",
                  link: "https://cariblifeatl.netlify.app"
                }
              ].map((project, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all animate-on-scroll">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm mb-4">{project.description}</p>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                      >
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Elevate Your Brand?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join the growing list of Black-owned businesses that have transformed their digital presence with DOJMARK.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Case Studies
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center animate-on-scroll">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Our Impact
              </h2>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-3">
              {[
                { name: 'Black-Owned Businesses Served', value: '150+' },
                { name: 'Projects Completed', value: '300+' },
                { name: 'Average ROI Increase', value: '125%' },
              ].map((stat, index) => (
                <div key={index} className="bg-white px-8 py-10 sm:px-10 animate-on-scroll">
                  <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                  <dd className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Layout>
  );
}