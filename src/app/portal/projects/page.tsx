'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  MessageSquare,
  MoreVertical
} from 'lucide-react';

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Mock project data - will be replaced with Supabase queries
  const projects = {
    discovery: [
      {
        id: 1,
        title: 'E-commerce Redesign',
        client: 'TechCorp Inc.',
        deadline: '2024-01-20',
        priority: 'high',
        team: ['Sarah', 'Mike'],
        description: 'Complete website redesign with modern UX',
        tasks: ['Research competitors', 'User interviews', 'Define requirements']
      }
    ],
    design: [
      {
        id: 2,
        title: 'Brand Identity System',
        client: 'StartupXYZ',
        deadline: '2024-01-15',
        priority: 'medium',
        team: ['Anna', 'David'],
        description: 'Logo design and brand guidelines',
        tasks: ['Logo concepts', 'Color palette', 'Typography system']
      },
      {
        id: 3,
        title: 'Mobile App UI',
        client: 'FinTech Solutions',
        deadline: '2024-02-01',
        priority: 'high',
        team: ['Lisa', 'John'],
        description: 'iOS and Android app interface design',
        tasks: ['Wireframes', 'UI designs', 'Prototyping']
      }
    ],
    build: [
      {
        id: 4,
        title: 'Corporate Website',
        client: 'Law Firm LLC',
        deadline: '2024-01-25',
        priority: 'medium',
        team: ['Tom', 'Emily'],
        description: 'Professional website with CMS',
        tasks: ['Frontend development', 'CMS integration', 'Content migration']
      }
    ],
    review: [
      {
        id: 5,
        title: 'Marketing Campaign',
        client: 'Fashion Brand',
        deadline: '2024-01-12',
        priority: 'high',
        team: ['Rachel', 'Chris'],
        description: 'Digital marketing materials',
        tasks: ['Client feedback', 'Revisions', 'Final approval']
      }
    ],
    deliver: [
      {
        id: 6,
        title: 'Annual Report Design',
        client: 'Non-Profit Org',
        deadline: '2024-01-10',
        priority: 'low',
        team: ['Kevin', 'Sophie'],
        description: 'Annual report layout and design',
        tasks: ['Final delivery', 'Training session', 'Handover']
      }
    ]
  };

  const stages = [
    { key: 'discovery', title: 'Discovery', color: '#22C4FF' },
    { key: 'design', title: 'Design', color: '#F46A25' },
    { key: 'build', title: 'Build', color: '#0F2C55' },
    { key: 'review', title: 'Review', color: '#E6E9F0' },
    { key: 'deliver', title: 'Deliver', color: '#1E2026' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F46A25';
      case 'medium': return '#22C4FF';
      case 'low': return '#1E2026';
      default: return '#E6E9F0';
    }
  };

  const openProjectSidecar = (project: any) => {
    setSelectedProject(project);
  };

  const closeProjectSidecar = () => {
    setSelectedProject(null);
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
          maxWidth: '1400px',
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
              Projects
            </h1>
          </div>

          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <span style={{
              fontSize: '14px',
              color: '#666666',
              fontFamily: 'Inter, sans-serif'
            }}>
              {Object.values(projects).flat().length} Total Projects
            </span>
          </div>
        </div>
      </header>

      {/* Kanban Board */}
      <main style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '20px',
          minHeight: '80vh'
        }}>
          {stages.map((stage) => (
            <div key={stage.key} style={{
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(15, 44, 85, 0.1)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Stage Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: `2px solid ${stage.color}`
              }}>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0
                }}>
                  {stage.title}
                </h3>
                <span style={{
                  background: stage.color,
                  color: stage.key === 'review' ? '#1E2026' : '#ffffff',
                  borderRadius: '12px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {projects[stage.key as keyof typeof projects].length}
                </span>
              </div>

              {/* Project Cards */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                flex: 1
              }}>
                {projects[stage.key as keyof typeof projects].map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => openProjectSidecar(project)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid rgba(15, 44, 85, 0.1)',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(15, 44, 85, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 44, 85, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(15, 44, 85, 0.1)';
                    }}
                  >
                    {/* Priority Indicator */}
                    <div style={{
                      width: '100%',
                      height: '3px',
                      background: getPriorityColor(project.priority),
                      borderRadius: '2px',
                      marginBottom: '12px'
                    }} />

                    {/* Project Title */}
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif',
                      margin: 0,
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>
                      {project.title}
                    </h4>

                    {/* Client */}
                    <p style={{
                      fontSize: '12px',
                      color: '#666666',
                      fontFamily: 'Inter, sans-serif',
                      margin: 0,
                      marginBottom: '12px'
                    }}>
                      {project.client}
                    </p>

                    {/* Deadline */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '12px'
                    }}>
                      <Calendar className="w-3 h-3" style={{color: '#666666'}} />
                      <span style={{
                        fontSize: '12px',
                        color: '#666666',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {project.deadline}
                      </span>
                    </div>

                    {/* Team */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginBottom: '12px'
                    }}>
                      <User className="w-3 h-3" style={{color: '#666666'}} />
                      <span style={{
                        fontSize: '12px',
                        color: '#666666',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {project.team.join(', ')}
                      </span>
                    </div>

                    {/* Tasks Progress */}
                    <div style={{
                      background: 'rgba(15, 44, 85, 0.05)',
                      borderRadius: '8px',
                      padding: '8px',
                      marginTop: '12px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '4px'
                      }}>
                        <span style={{
                          fontSize: '11px',
                          color: '#666666',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          Tasks
                        </span>
                        <span style={{
                          fontSize: '11px',
                          color: '#666666',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {Math.floor(Math.random() * project.tasks.length)}/{project.tasks.length}
                        </span>
                      </div>
                      <div style={{
                        background: 'rgba(15, 44, 85, 0.1)',
                        borderRadius: '4px',
                        height: '4px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          background: stage.color,
                          height: '100%',
                          width: `${(Math.floor(Math.random() * project.tasks.length) / project.tasks.length) * 100}%`,
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Project Sidecar */}
      {selectedProject && (
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
          onClick={closeProjectSidecar}
        >
          {/* Sidecar Panel */}
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
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#1E2026',
                  fontFamily: 'Poppins, sans-serif',
                  margin: 0,
                  marginBottom: '8px'
                }}>
                  {selectedProject.title}
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#666666',
                  fontFamily: 'Inter, sans-serif',
                  margin: 0
                }}>
                  {selectedProject.client}
                </p>
              </div>
              <button
                onClick={closeProjectSidecar}
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

            {/* Project Details */}
            <div style={{marginBottom: '30px'}}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '15px'
              }}>
                Project Brief
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#666666',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6',
                marginBottom: '20px'
              }}>
                {selectedProject.description}
              </p>

              {/* Project Meta */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  background: 'rgba(15, 44, 85, 0.05)',
                  borderRadius: '12px',
                  padding: '15px'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <Calendar className="w-4 h-4" style={{color: '#F46A25'}} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Deadline
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#666666',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0
                  }}>
                    {selectedProject.deadline}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(244, 106, 37, 0.05)',
                  borderRadius: '12px',
                  padding: '15px'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}>
                    <AlertCircle className="w-4 h-4" style={{color: getPriorityColor(selectedProject.priority)}} />
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Priority
                    </span>
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#666666',
                    fontFamily: 'Inter, sans-serif',
                    margin: 0,
                    textTransform: 'capitalize'
                  }}>
                    {selectedProject.priority}
                  </p>
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div style={{marginBottom: '30px'}}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '15px'
              }}>
                Tasks
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {selectedProject.tasks.map((task: string, index: number) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(15, 44, 85, 0.1)',
                    borderRadius: '8px',
                    padding: '12px'
                  }}>
                    <CheckCircle 
                      className="w-4 h-4" 
                      style={{
                        color: Math.random() > 0.5 ? '#22C4FF' : '#E6E9F0'
                      }} 
                    />
                    <span style={{
                      fontSize: '14px',
                      color: '#1E2026',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {task}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team */}
            <div style={{marginBottom: '30px'}}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#1E2026',
                fontFamily: 'Poppins, sans-serif',
                marginBottom: '15px'
              }}>
                Team Members
              </h3>
              <div style={{display: 'flex', gap: '10px'}}>
                {selectedProject.team.map((member: string, index: number) => (
                  <div key={index} style={{
                    background: 'rgba(34, 196, 255, 0.1)',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    fontSize: '14px',
                    color: '#0F2C55',
                    fontWeight: '500',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {member}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '15px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(15, 44, 85, 0.1)'
            }}>
              <button style={{
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
                transition: 'all 0.3s ease'
              }}>
                Message Team
              </button>
              <button style={{
                flex: 1,
                background: 'rgba(15, 44, 85, 0.1)',
                color: '#0F2C55',
                border: 'none',
                borderRadius: '12px',
                padding: '12px',
                fontSize: '14px',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                View Files
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          main > div {
            grid-template-columns: 1fr !important;
            gap: 15px !important;
          }
          
          div[style*="width: 600px"] {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
