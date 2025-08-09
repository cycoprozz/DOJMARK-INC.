'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Upload,
  Download,
  Eye,
  FileText,
  Image,
  Video,
  CheckCircle,
  XCircle,
  RotateCcw,
  MessageSquare,
  Calendar,
  User
} from 'lucide-react';

export default function FilesPage() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  // Mock file data
  const files = [
    {
      id: 1,
      name: 'Logo_Final_v3.svg',
      type: 'design',
      size: '245 KB',
      uploadDate: '2024-01-08',
      status: 'approved',
      version: 3,
      project: 'Brand Redesign',
      preview: '/images/portfolio/dojmark-logo-preview.jpg',
      comments: [
        { author: 'Sarah Johnson', message: 'Perfect! This version captures our vision.', date: '2024-01-08' }
      ]
    },
    {
      id: 2,
      name: 'Brand_Guidelines.pdf',
      type: 'document',
      size: '2.1 MB',
      uploadDate: '2024-01-07',
      status: 'pending',
      version: 1,
      project: 'Brand Redesign',
      preview: '/images/portfolio/brand-guidelines-preview.jpg',
      comments: [
        { author: 'DOJMARK Team', message: 'Brand guidelines ready for review', date: '2024-01-07' }
      ]
    },
    {
      id: 3,
      name: 'Website_Mockup_Desktop.jpg',
      type: 'design',
      size: '1.8 MB',
      uploadDate: '2024-01-06',
      status: 'revision',
      version: 2,
      project: 'Website Development',
      preview: '/images/portfolio/website-mockup-preview.jpg',
      comments: [
        { author: 'John Doe', message: 'Can we adjust the header spacing?', date: '2024-01-06' },
        { author: 'DOJMARK Team', message: 'Working on the revision now', date: '2024-01-06' }
      ]
    },
    {
      id: 4,
      name: 'Product_Video_Final.mp4',
      type: 'video',
      size: '15.2 MB',
      uploadDate: '2024-01-05',
      status: 'approved',
      version: 1,
      project: 'Marketing Campaign',
      preview: '/images/portfolio/video-thumbnail.jpg',
      comments: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return '#22C4FF';
      case 'pending': return '#F46A25';
      case 'revision': return '#E55A1F';
      default: return '#E6E9F0';
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'design': return <Image className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const filteredFiles = filter === 'all' ? files : files.filter(file => file.status === filter);

  const openFileDetails = (file: any) => {
    setSelectedFile(file);
  };

  const closeFileDetails = () => {
    setSelectedFile(null);
  };

  const handleFileAction = (action: string, fileId: number) => {
    // TODO: Implement file actions
    // File action will be processed
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e6e9f0 100%)'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(15, 44, 85, 0.1)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <Link 
              href="/portal"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#0F2C55',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0F2C55',
              fontFamily: 'Poppins, sans-serif',
              margin: 0
            }}>
              Files
            </h1>
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <Upload className="w-4 h-4" />
            Upload Files
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          {[
            { key: 'all', label: 'All Files', count: files.length },
            { key: 'pending', label: 'Pending Review', count: files.filter(f => f.status === 'pending').length },
            { key: 'approved', label: 'Approved', count: files.filter(f => f.status === 'approved').length },
            { key: 'revision', label: 'Needs Revision', count: files.filter(f => f.status === 'revision').length }
          ].map((filterOption) => (
            <button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              style={{
                background: filter === filterOption.key 
                  ? 'linear-gradient(135deg, #0F2C55 0%, #22C4FF 100%)' 
                  : 'rgba(255, 255, 255, 0.8)',
                color: filter === filterOption.key ? '#ffffff' : '#1E2026',
                border: '1px solid rgba(15, 44, 85, 0.1)',
                borderRadius: '25px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '500',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {filterOption.label}
              <span style={{
                background: filter === filterOption.key 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : 'rgba(15, 44, 85, 0.1)',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {filterOption.count}
              </span>
            </button>
          ))}
        </div>

        {/* Files Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          {filteredFiles.map((file) => (
            <div 
              key={file.id}
              onClick={() => openFileDetails(file)}
              style={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(15, 44, 85, 0.1)',
                borderRadius: '20px',
                padding: '0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 30px rgba(15, 44, 85, 0.1)',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(15, 44, 85, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(15, 44, 85, 0.1)';
              }}
            >
              {/* File Preview */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #e6e9f0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                {file.preview ? (
                  <img 
                    src={file.preview} 
                    alt={file.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                ) : (
                  <div style={{
                    color: '#666666',
                    fontSize: '48px'
                  }}>
                    {getFileIcon(file.type)}
                  </div>
                )}
                
                {/* Status Badge */}
                <div style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: getStatusColor(file.status),
                  color: '#ffffff',
                  borderRadius: '20px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  textTransform: 'capitalize'
                }}>
                  {file.status}
                </div>
              </div>

              {/* File Info */}
              <div style={{padding: '20px'}}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {file.name}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0,
                  marginBottom: '12px'
                }}>
                  {file.project}
                </p>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Calendar className="w-3 h-3" style={{color: '#666666'}} />
                    <span style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {file.uploadDate}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: '#666666',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    v{file.version} • {file.size}
                  </span>
                </div>

                {/* Quick Actions */}
                <div style={{
                  display: 'flex',
                  gap: '10px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileAction('download', file.id);
                    }}
                    style={{
                      flex: 1,
                      background: 'rgba(15, 44, 85, 0.1)',
                      color: '#0F2C55',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openFileDetails(file);
                    }}
                    style={{
                      flex: 1,
                      background: 'rgba(244, 106, 37, 0.1)',
                      color: '#F46A25',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px',
                      fontSize: '12px',
                      fontWeight: '500',
                      fontFamily: 'Inter, sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px'
                    }}
                  >
                    <Eye className="w-3 h-3" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* File Details Sidecar */}
      {selectedFile && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={closeFileDetails}
        >
          <div 
            style={{
              width: '600px',
              maxWidth: '90vw',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
              padding: '40px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidecar Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '30px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '8px'
                }}>
                  {selectedFile.name}
                </h2>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {selectedFile.project} • Version {selectedFile.version}
                </p>
              </div>
              <button
                onClick={closeFileDetails}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  color: '#666666',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>

            {/* File Preview */}
            <div style={{
              background: '#f8f9fa',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              {selectedFile.preview ? (
                <img 
                  src={selectedFile.preview} 
                  alt={selectedFile.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px'
                  }}
                />
              ) : (
                <div style={{
                  color: '#666666',
                  fontSize: '64px',
                  padding: '40px'
                }}>
                  {getFileIcon(selectedFile.type)}
                </div>
              )}
            </div>

            {/* Approval Actions */}
            <div style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '30px'
            }}>
              <button 
                onClick={() => handleFileAction('approve', selectedFile.id)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #22C4FF 0%, #0F2C55 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <CheckCircle className="w-4 h-4" />
                Approve
              </button>
              <button 
                onClick={() => handleFileAction('request-changes', selectedFile.id)}
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Request Changes
              </button>
            </div>

            {/* Comments */}
            <div style={{marginBottom: '30px'}}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '20px'
              }}>
                Comments
              </h3>
              
              {selectedFile.comments.length > 0 ? (
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                  {selectedFile.comments.map((comment: any, index: number) => (
                    <div key={index} style={{
                      background: 'rgba(15, 44, 85, 0.05)',
                      borderRadius: '12px',
                      padding: '15px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '14px',
                          fontWeight: '600',
                          color: '#1E2026',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {comment.author}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: '#666666',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {comment.date}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#666666',
                        fontFamily: 'Inter, sans-serif',
                        margin: 0,
                        lineHeight: '1.4'
                      }}>
                        {comment.message}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  fontStyle: 'italic'
                }}>
                  No comments yet
                </p>
              )}

              {/* Add Comment */}
              <div style={{marginTop: '20px'}}>
                <textarea
                  placeholder="Add a comment..."
                  style={{
                    width: '100%',
                    minHeight: '80px',
                    padding: '12px',
                    border: '1px solid rgba(15, 44, 85, 0.2)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical',
                    outline: 'none'
                  }}
                />
                <button style={{
                  background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 20px',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}>
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Mobile grid */
          main > div:last-of-type {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          /* Mobile filters */
          main > div:first-of-type {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          /* Mobile sidecar */
          div[style*="width:600px"] {
            width: 100% !important;
            padding: 30px 20px !important;
          }
          
          /* Mobile buttons */
          button {
            font-size: 12px !important;
            padding: 10px 16px !important;
          }
          
          /* Mobile file cards */
          div[style*="padding:20px"] {
            padding: 15px !important;
          }
          
          h3 {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
