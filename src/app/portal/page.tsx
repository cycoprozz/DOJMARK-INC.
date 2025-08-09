'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  FolderOpen, 
  CreditCard, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ArrowRight
} from 'lucide-react';

export default function PortalDashboard() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dojmark-session');
      window.location.href = '/portal/login';
    }
  };

  // Mock data - will be replaced with Supabase queries
  const dashboardData = {
    projects: [
      { id: 1, name: 'Brand Redesign', stage: 'Design', progress: 65, dueDate: '2024-01-15' },
      { id: 2, name: 'Website Development', stage: 'Build', progress: 40, dueDate: '2024-02-01' }
    ],
    invoices: [
      { id: 1, amount: 2500, status: 'pending', dueDate: '2024-01-10' },
      { id: 2, amount: 1800, status: 'paid', dueDate: '2024-01-05' }
    ],
    files: [
      { id: 1, name: 'Logo_Final_v3.svg', type: 'design', uploadDate: '2024-01-08' },
      { id: 2, name: 'Brand_Guidelines.pdf', type: 'document', uploadDate: '2024-01-07' }
    ],
    messages: [
      { id: 1, from: 'Sarah Johnson', message: 'Logo looks great! Small revision needed...', time: '2 hours ago' },
      { id: 2, from: 'DOJMARK Team', message: 'Project milestone completed', time: '1 day ago' }
    ]
  };

  const openSidecar = (cardType: string) => {
    setSelectedCard(cardType);
  };

  const closeSidecar = () => {
    setSelectedCard(null);
  };

  return (
    <div className="portal-container portal-gradient" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e6e9f0 100%)',
      position: 'relative',
      width: '100%',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        borderBottom: '1px solid rgba(15, 44, 85, 0.15)',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 20px rgba(15, 44, 85, 0.1)'
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
            <img 
              src="/dojmark-main-logo.png" 
              alt="DOJMARK" 
              style={{
                height: '40px',
                width: 'auto'
              }}
            />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#0F2C55',
              fontFamily: 'Poppins, sans-serif',
              margin: 0
            }}>
              Client Portal
            </h1>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#0F2C55',
              cursor: 'pointer',
              padding: '8px'
            }}>
              <Bell className="w-5 h-5" />
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#0F2C55',
              cursor: 'pointer',
              padding: '8px'
            }}>
              <Settings className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              style={{
                background: 'none',
                border: 'none',
                color: '#0F2C55',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* Welcome Section */}
        <div style={{marginBottom: '40px'}}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1E2026',
            fontFamily: 'Poppins, sans-serif',
            marginBottom: '8px'
          }}>
            Welcome back, John!
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#666666',
            fontFamily: 'Inter, sans-serif'
          }}>
            Here's what's happening with your projects.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="container-mobile" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '12px'
        }}>
          {/* Project Status Card */}
          <div 
            onClick={() => openSidecar('projects')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(15, 44, 85, 0.15)',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 40px rgba(15, 44, 85, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
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
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <div style={{
                background: 'linear-gradient(135deg, #0F2C55 0%, #22C4FF 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FolderOpen className="w-6 h-6" style={{color: '#ffffff'}} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Active Projects
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {dashboardData.projects.length} in progress
                </p>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {dashboardData.projects.map((project) => (
                <div key={project.id} style={{
                  background: 'rgba(15, 44, 85, 0.05)',
                  borderRadius: '12px',
                  padding: '15px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {project.name}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#F46A25',
                      fontWeight: '500',
                      background: 'rgba(244, 106, 37, 0.1)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {project.stage}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(15, 44, 85, 0.1)',
                    borderRadius: '8px',
                    height: '6px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #F46A25 0%, #22C4FF 100%)',
                      height: '100%',
                      width: `${project.progress}%`,
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoices Card */}
          <div 
            onClick={() => openSidecar('invoices')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(244, 106, 37, 0.25)',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 40px rgba(244, 106, 37, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(244, 106, 37, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.1)';
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <div style={{
                background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CreditCard className="w-6 h-6" style={{color: '#ffffff'}} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Invoices
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {dashboardData.invoices.filter(i => i.status === 'pending').length} pending
                </p>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {dashboardData.invoices.slice(0, 2).map((invoice) => (
                <div key={invoice.id} style={{
                  background: 'rgba(244, 106, 37, 0.05)',
                  borderRadius: '12px',
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      ${invoice.amount.toLocaleString()}
                    </span>
                    <p style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontFamily: 'Inter, sans-serif',
                      margin: 0
                    }}>
                      Due {invoice.dueDate}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: invoice.status === 'paid' ? '#22C4FF' : '#F46A25',
                    fontWeight: '500',
                    background: invoice.status === 'paid' ? 'rgba(34, 196, 255, 0.1)' : 'rgba(244, 106, 37, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {invoice.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Files Card */}
          <div 
            onClick={() => openSidecar('files')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(34, 196, 255, 0.25)',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 40px rgba(34, 196, 255, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(34, 196, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 196, 255, 0.1)';
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <div style={{
                background: 'linear-gradient(135deg, #22C4FF 0%, #0F2C55 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText className="w-6 h-6" style={{color: '#ffffff'}} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Latest Files
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {dashboardData.files.length} new uploads
                </p>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {dashboardData.files.map((file) => (
                <div key={file.id} style={{
                  background: 'rgba(34, 196, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {file.name}
                    </span>
                    <p style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontFamily: 'Inter, sans-serif',
                      margin: 0
                    }}>
                      {file.uploadDate}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: '#22C4FF',
                    fontWeight: '500',
                    background: 'rgba(34, 196, 255, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {file.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Card */}
          <div 
            onClick={() => openSidecar('messages')}
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(30, 32, 38, 0.15)',
              borderRadius: '20px',
              padding: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 15px 40px rgba(30, 32, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(30, 32, 38, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(30, 32, 38, 0.1)';
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'}}>
              <div style={{
                background: 'linear-gradient(135deg, #1E2026 0%, #0F2C55 100%)',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare className="w-6 h-6" style={{color: '#ffffff'}} />
              </div>
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '4px'
                }}>
                  Messages
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {dashboardData.messages.length} new messages
                </p>
              </div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {dashboardData.messages.map((message) => (
                <div key={message.id} style={{
                  background: 'rgba(30, 32, 38, 0.05)',
                  borderRadius: '12px',
                  padding: '15px'
                }}>
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {message.from}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {message.time}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '13px',
                    color: '#666666',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Sidecar/Modal Overlay */}
      {selectedCard && (
        <div 
          className="z-modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 1200,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={closeSidecar}
        >
          {/* Sidecar Panel - Full Screen on Mobile */}
          <div 
            style={{
              width: window.innerWidth <= 640 ? '100vw' : '600px',
              maxWidth: window.innerWidth <= 640 ? '100vw' : '90vw',
              height: '100%',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              boxShadow: window.innerWidth <= 640 
                ? '0 -10px 40px rgba(0, 0, 0, 0.3)' 
                : '-15px 0 40px rgba(0, 0, 0, 0.3), inset 1px 0 0 rgba(255, 255, 255, 0.2)',
              padding: window.innerWidth <= 640 ? '20px' : '40px',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderLeft: window.innerWidth <= 640 ? 'none' : '1px solid rgba(15, 44, 85, 0.1)',
              borderRadius: window.innerWidth <= 640 ? '0' : '0',
              transform: window.innerWidth <= 640 ? 'translateY(0)' : 'translateX(0)',
              animation: window.innerWidth <= 640 ? 'slideUpIn 0.3s ease-out' : 'slideLeftIn 0.3s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                margin: 0
              }}>
                {selectedCard === 'projects' && 'Project Details'}
                {selectedCard === 'invoices' && 'Invoice Management'}
                {selectedCard === 'files' && 'File Browser'}
                {selectedCard === 'messages' && 'Message Center'}
              </h2>
              <button
                onClick={closeSidecar}
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

            {/* Sidecar Content */}
            <div>
              <p style={{
                fontSize: '16px',
                color: '#666666',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6'
              }}>
                Detailed {selectedCard} information will be displayed here. This sidecar provides 
                comprehensive management tools for your {selectedCard}.
              </p>
              
              <div style={{marginTop: '30px'}}>
                <Link 
                  href={`/portal/${selectedCard}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'linear-gradient(135deg, #F46A25 0%, #E55A1F 100%)',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(244, 106, 37, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Open Full {selectedCard}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          /* Mobile header */
          header > div {
            padding: 0 15px !important;
          }
          
          h1 {
            font-size: 20px !important;
          }
          
          h2 {
            font-size: 24px !important;
          }
          
          /* Mobile dashboard grid */
          main > div:last-of-type {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          
          /* Mobile cards */
          div[style*="padding:30px"] {
            padding: 20px !important;
          }
          
          /* Mobile sidecar */
          div[style*="width:600px"] {
            width: 100% !important;
            padding: 30px 20px !important;
          }
          
          /* Mobile buttons */
          div[style*="gap:15px"] > button {
            font-size: 12px !important;
            padding: 10px 16px !important;
          }
          
          /* Mobile typography adjustments */
          h3 {
            font-size: 16px !important;
          }
          
          div[style*="fontSize:18px"] {
            font-size: 16px !important;
          }
          
          div[style*="fontSize:16px"] {
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
}
