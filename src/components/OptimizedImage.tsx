'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LoadingSpinner } from './ui/loading';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  style = {},
  placeholder,
  lazy = true,
  onLoad,
  onError,
  priority = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  // Generate responsive image URLs if using a CDN
  const generateSrcSet = (originalSrc: string) => {
    // For now, return the original src
    // In production, you'd generate multiple sizes from your CDN
    return originalSrc;
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    overflow: 'hidden',
    display: 'inline-block',
    width: width || '100%',
    height: height || 'auto',
    background: placeholder || 'rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    ...style
  };

  return (
    <div ref={containerRef} style={containerStyle} className={className}>
      {/* Loading state */}
      {isLoading && isInView && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}>
          <LoadingSpinner size={24} />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#666',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          zIndex: 2
        }}>
          <div style={{
            background: '#f0f0f0',
            borderRadius: '4px',
            padding: '8px 12px',
            border: '1px solid #ddd'
          }}>
            Failed to load image
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          srcSet={generateSrcSet(src)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            opacity: isLoading ? 0 : 1
          }}
        />
      )}

      {/* Placeholder for lazy loading */}
      {!isInView && lazy && !priority && (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif'
        }}>
          Loading...
        </div>
      )}
    </div>
  );
}

// Background image component with lazy loading
export function OptimizedBackgroundImage({
  src,
  children,
  className = '',
  style = {},
  lazy = true,
  placeholder = 'rgba(15, 44, 85, 0.8)'
}: {
  src: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  lazy?: boolean;
  placeholder?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, isInView]);

  // Preload image
  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    img.onload = () => setIsLoaded(true);
    img.src = src;
  }, [src, isInView]);

  const backgroundStyle: React.CSSProperties = {
    backgroundImage: isLoaded ? `url(${src})` : 'none',
    backgroundColor: placeholder,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    transition: 'background-image 0.3s ease',
    ...style
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={backgroundStyle}
    >
      {children}
    </div>
  );
}

// Gallery component with optimized images
export function ImageGallery({ 
  images, 
  columns = 3 
}: { 
  images: Array<{ src: string; alt: string; caption?: string }>; 
  columns?: number;
}) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(${100 / columns}%, 1fr))`,
      gap: '16px',
      padding: '20px 0'
    }}>
      {images.map((image, index) => (
        <div key={index} style={{
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover'
            }}
            lazy={true}
            priority={index < 3} // Prioritize first 3 images
          />
          {image.caption && (
            <div style={{
              padding: '12px',
              color: '#FFFFFF',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif'
            }}>
              {image.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
