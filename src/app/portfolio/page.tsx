'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  image: string;
  category: string;
  featured: boolean;
}

const clientProjects: Project[] = [
  {
    id: '1',
    title: 'The Morris Team',
    description: 'Professional real estate website with modern design and lead generation features. Built to showcase property listings and agent profiles with a focus on user experience and conversion optimization.',
    url: 'https://the-morris-team.netlify.app',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
    image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=The+Morris+Team',
    category: 'Real Estate',
    featured: true
  },
  {
    id: '2',
    title: 'Secret Touch Spa',
    description: 'Luxury spa and wellness website with booking system and service showcase. Designed to create a serene, premium online experience that reflects the brand\'s high-end spa services.',
    url: 'https://secrettouchspa.netlify.app',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
    image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Secret+Touch+Spa',
    category: 'Wellness & Beauty',
    featured: true
  },
  {
    id: '3',
    title: 'Carib Life ATL',
    description: 'Caribbean culture and lifestyle website for Atlanta community. Features event listings, business directory, and cultural content to connect and celebrate Caribbean heritage in the Atlanta area.',
    url: 'https://cariblifeatl.netlify.app',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Netlify'],
    image: 'https://via.placeholder.com/600x400/1a1a1a/ffffff?text=Carib+Life+ATL',
    category: 'Community & Culture',
    featured: true
  }
];

export default function Portfolio() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(clientProjects);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...new Set(clientProjects.map(project => project.category))];

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(clientProjects);
    } else {
      setFilteredProjects(clientProjects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory]);

  const featuredProjects = clientProjects.filter(project => project.featured);

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white pt-24 pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-on-scroll">
              Our <span className="text-blue-600">Portfolio</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 animate-on-scroll">
              Showcasing our work with diverse clients across various industries. 
              Each project represents our commitment to excellence, innovation, and cultural fluency.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Highlighting some of our most impactful work for clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-lg overflow-hidden border-2 border-blue-600 animate-on-scroll"
              >
                {/* Project Image */}
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <Button
                    onClick={() => window.open(project.url, '_blank')}
                    className="w-full btn-primary text-sm"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="py-8 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All Projects Grid */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-600 transition-all animate-on-scroll"
              >
                {/* Project Image */}
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                  {project.featured && (
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Project Button */}
                  <Button
                    onClick={() => window.open(project.url, '_blank')}
                    className="w-full btn-primary text-sm"
                  >
                    View Live Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center animate-on-scroll">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Let's create something amazing together. Your project could be the next one in our portfolio.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button className="bg-white text-blue-600 hover:bg-gray-100">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                View Our Process
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
                Project Impact
              </h2>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-4">
              {[
                { name: 'Projects Completed', value: '50+' },
                { name: 'Happy Clients', value: '40+' },
                { name: 'Industries Served', value: '12+' },
                { name: 'Awards Won', value: '5+' },
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