'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Home, 
  Briefcase, 
  FolderOpen, 
  Users, 
  FileText, 
  Mail,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Services', href: '/services', icon: Briefcase },
  { name: 'Portfolio', href: '/portfolio', icon: FolderOpen },
  { name: 'About Us', href: '/about', icon: Users },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Contact', href: '/contact', icon: Mail },
];

interface ModernLayoutProps {
  children: React.ReactNode;
}

export default function ModernLayout({ children }: ModernLayoutProps) {
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="flex items-center justify-between p-4 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <img
                src="/dojmark-main-logo.png"
                alt="DOJMARK"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-gray-900">DOJMARK</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    pathname === item.href 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setSideMenuOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-gray-100 text-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </nav>
      </header>

      {/* Side Menu for Mobile */}
      <Dialog open={sideMenuOpen} onOpenChange={setSideMenuOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <img
                src="/dojmark-main-logo.png"
                alt="DOJMARK"
                className="h-8 w-auto"
              />
              <span>DOJMARK</span>
            </DialogTitle>
            <DialogDescription>Navigate to different sections</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSideMenuOpen(false)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                    pathname === item.href 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                  <ChevronRight className="h-4 w-4 ml-auto" />
                </Link>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>



      {/* Footer */}
      <footer className="mt-20 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <img
                src="/dojmark-main-logo.png"
                alt="DOJMARK"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold">DOJMARK</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering Black-owned businesses through digital excellence
            </p>
            <p className="text-sm text-gray-500">
              &copy; 2024 DOJMARK. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
