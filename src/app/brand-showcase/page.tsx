'use client';

import DojmarkLayout from '@/components/DojmarkLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BrandShowcase() {
  // Simple test to debug image loading
  const testImage = '/dojmark-main-logo.png';
  
  const brandAssets = [
    { name: 'Primary Logo', file: '/dojmark-main-logo.png', description: 'Main brand logo' },
    { name: 'Primary Brand Logo', file: '/dojmark-primary-logo.png', description: 'Primary brand mark' },
    { name: 'Vertical Logo', file: '/dojmark-vertical-logo.png', description: 'Vertical orientation' },
    { name: 'Letter Mark', file: '/dojmark-letter-logo.png', description: 'Letter mark version' },
    { name: 'Color System', file: '/dojmark-color-system.png', description: 'Brand color palette' },
  ];

  const brandKitAssets = [
    { name: 'Brand Guidelines', file: '/brand-assets/brand-guidelines.png', description: 'Complete brand guide' },
    { name: 'Visual Style Guide', file: '/brand-assets/visual-style-guide.png', description: 'Visual style guide' },
    { name: 'Typography System', file: '/brand-assets/typography-system.png', description: 'Typography system' },
    { name: 'Color System', file: '/brand-assets/color-system.png', description: 'Brand color palette' },
    { name: 'Website Preview', file: '/brand-assets/website-preview.png', description: 'Website design concepts' },
    { name: 'Social Media Templates', file: '/brand-assets/social-media-templates.png', description: 'Social media assets' },
    { name: 'Business Cards', file: '/brand-assets/business-cards.png', description: 'Business card design' },
    { name: 'Apparel Collection', file: '/brand-assets/apparel-collection.png', description: 'Brand apparel designs' },
    { name: 'Accessories Collection', file: '/brand-assets/accessories-collection.png', description: 'Brand accessories' },
    { name: 'Mobile App Screens', file: '/brand-assets/mobile-app-screens.png', description: 'Mobile app designs' },
  ];

  return (
    <DojmarkLayout>
      {/* Debug Section */}
      <section style={{
        background: '#ffffff',
        padding: '40px 0',
        borderBottom: '2px solid #ff0000'
      }}>
        <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto', padding: '0 20px'}}>
          <h2 style={{fontSize: '24px', color: '#000000', marginBottom: '20px'}}>
            🧪 DEBUG: Image Loading Test
          </h2>
          <p style={{color: '#666666', marginBottom: '30px'}}>
            If you can see this logo below, images are working:
          </p>
          <div style={{
            border: '2px dashed #ccc',
            padding: '20px',
            marginBottom: '20px',
            background: '#f9f9f9'
          }}>
            <img 
              src={testImage}
              alt="Test Logo"
              style={{
                maxWidth: '200px',
                height: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
              onLoad={() => {/* Image loaded successfully */}}
              onError={() => {/* Image failed to load */}}
            />
          </div>
          <p style={{fontSize: '14px', color: '#999999'}}>
            Path: {testImage}
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        padding: '120px 0 80px'
      }}>
        <div className="auto-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
          
          {/* Header */}
          <div style={{marginBottom: '60px'}}>
            <h1 style={{
              fontSize: 'clamp(60px, 10vw, 140px)',
              fontWeight: '700',
              fontFamily: 'DM Sans, sans-serif',
              lineHeight: '1.1em',
              marginBottom: '30px',
              background: 'linear-gradient(135deg, #ffffff 0%, #F46A25 50%, #22C4FF 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Brand Identity
            </h1>
            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'DM Sans, sans-serif',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6em'
            }}>
              Explore our complete brand identity and visual assets
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        background: '#ffffff',
        padding: '120px 0',
        minHeight: '100vh'
      }}>
        <div className="auto-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '80px'}}>

            {/* Logo Variations */}
            <div>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#1E2026',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                Logo Variations
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px'
              }}>
                {brandAssets.map((asset, index) => (
                  <div key={index} style={{
                    background: '#ffffff',
                    borderRadius: '0',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                  >
                    <div style={{
                      aspectRatio: '1',
                      background: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '40px',
                      border: '1px solid #ddd'
                    }}>
                      <img 
                        src={asset.file} 
                        alt={asset.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        onLoad={() => {/* Asset loaded */}}
                        onError={(e) => {
                          // Asset failed to load
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML = `<div style="color: #red; text-align: center; font-size: 14px;">❌ Image not found:<br/>${asset.file}</div>`;
                          }
                        }}
                      />
                    </div>
                    <div style={{padding: '30px'}}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1E2026',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '10px'
                      }}>
                        {asset.name}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666666',
                        fontFamily: 'DM Sans, sans-serif',
                        lineHeight: '1.5em'
                      }}>
                        {asset.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Kit Assets */}
            <div>
              <h2 style={{
                fontSize: '48px',
                fontWeight: '700',
                color: '#1E2026',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                Brand Kit Assets
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '30px'
              }}>
                {brandKitAssets.map((asset, index) => (
                  <div key={index} style={{
                    background: '#ffffff',
                    borderRadius: '0',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                  onClick={() => window.open(asset.file, '_blank')}
                  >
                    <div style={{
                      aspectRatio: '16/9',
                      background: '#f8f9fa',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '20px',
                      border: '1px solid #ddd'
                    }}>
                      <img 
                        src={asset.file} 
                        alt={asset.name}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain'
                        }}
                        onLoad={() => {/* Asset loaded */}}
                        onError={(e) => {
                          // Asset failed to load
                          e.currentTarget.style.display = 'none';
                          if (e.currentTarget.parentElement) {
                            e.currentTarget.parentElement.innerHTML = `<div style="color: #red; text-align: center; font-size: 14px;">❌ Image not found:<br/>${asset.file}</div>`;
                          }
                        }}
                      />
                    </div>
                    <div style={{padding: '30px'}}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1E2026',
                        fontFamily: 'DM Sans, sans-serif',
                        marginBottom: '10px'
                      }}>
                        {asset.name}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#666666',
                        fontFamily: 'DM Sans, sans-serif',
                        lineHeight: '1.5em'
                      }}>
                        {asset.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Color Palette Preview */}
            <div style={{
              background: '#ffffff',
              borderRadius: '0',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              padding: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{
                fontSize: '28px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '15px'
              }}>
                Brand Color System
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'DM Sans, sans-serif',
                marginBottom: '30px'
              }}>
                Click to view full color system
              </p>
              <div style={{cursor: 'pointer'}} onClick={() => window.open('/dojmark-color-system.png', '_blank')}>
                <img 
                  src="/dojmark-color-system.png" 
                  alt="DOJMARK Color System"
                  style={{
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    borderRadius: '0',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mobile CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Mobile Hero Section */
          section:first-of-type {
            padding: 120px 0 80px !important;
            min-height: 80vh !important;
          }
          
          /* Mobile Typography */
          h1 {
            font-size: clamp(40px, 10vw, 80px) !important;
            text-align: center !important;
            line-height: 1.2em !important;
          }
          
          h2 {
            font-size: clamp(28px, 6vw, 48px) !important;
            text-align: center !important;
          }
          
          p {
            font-size: 16px !important;
            text-align: center !important;
            line-height: 1.6em !important;
          }
          
          /* Mobile Containers */
          .auto-container {
            padding: 0 20px !important;
            max-width: 100% !important;
          }
          
          /* Mobile Grid */
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          /* Mobile Cards */
          div[style*="padding:40px"] {
            padding: 20px !important;
          }
          
          div[style*="padding:30px"] {
            padding: 20px !important;
          }
          
          /* Mobile Images */
          img {
            max-width: 100% !important;
            height: auto !important;
          }
          
          /* Mobile Spacing */
          div[style*="gap:80px"] {
            gap: 40px !important;
          }
          
          div[style*="gap:30px"] {
            gap: 20px !important;
          }
          
          div[style*="margin-bottom:40px"] {
            margin-bottom: 25px !important;
          }
        }
      `}</style>
    </DojmarkLayout>
  );
}
