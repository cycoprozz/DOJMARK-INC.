'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  LogOut, 
  User, 
  FolderOpen, 
  MessageSquare, 
  FileText, 
  Settings,
  Plus,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  service_type: string;
  status: string;
  budget_range: string;
  timeline: string;
  created_at: string;
  updated_at: string;
  deliverables: Deliverable[];
}

interface Deliverable {
  id: string;
  title: string;
  status: string;
  due_date: string;
}

interface UserProfile {
  id: string;
  email: string;
  company_name?: string;
  phone?: string;
}

export default function PortalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'messages' | 'profile'>('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Configuration error');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);

      // Get current user
      const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !currentUser) {
        throw new Error('User not found');
      }

      setUser({
        id: currentUser.id,
        email: currentUser.email || '',
        company_name: currentUser.user_metadata?.company_name,
        phone: currentUser.user_metadata?.phone
      });

      // Get user's projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('projects')
        .select(`
          id,
          title,
          description,
          service_type,
          status,
          budget_range,
          timeline,
          created_at,
          updated_at,
          deliverables (
            id,
            title,
            status,
            due_date
          )
        `)
        .eq('user_id', currentUser.id)
        .order('updated_at', { ascending: false });

      if (projectsError) {
        console.error('Projects fetch error:', projectsError);
      } else {
        setProjects(projectsData || []);
      }

    } catch (error) {
      console.error('Dashboard load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Configuration error');
      }

      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.auth.signOut();
      
      router.push('/portal/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in_progress': return 'text-blue-500';
      case 'review': return 'text-yellow-500';
      case 'pending': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'review': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid #F46A25',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ color: '#ffffff', fontSize: '16px' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F2C55 0%, #1E2026 50%, #0a1f3d 100%)',
      color: '#ffffff'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '20px 0'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img 
              src="/dojmark-logo.svg" 
              alt="DOJMARK" 
              style={{
                height: '40px',
                width: 'auto',
                filter: 'brightness(0) invert(1)'
              }}
            />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '600',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Client Portal
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '14px', opacity: 0.8 }}>
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <LogOut className="w-4 h-4" />
              Sign Out
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
        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '40px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '20px'
        }}>
          {[
            { id: 'overview', label: 'Overview', icon: <FolderOpen className="w-4 h-4" /> },
            { id: 'projects', label: 'Projects', icon: <FileText className="w-4 h-4" /> },
            { id: 'messages', label: 'Messages', icon: <MessageSquare className="w-4 h-4" /> },
            { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                background: activeTab === tab.id ? '#F46A25' : 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: '12px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Tab Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '40px'
        }}>
          {activeTab === 'overview' && (
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '30px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Welcome back, {user?.company_name || user?.email?.split('@')[0]}!
              </h2>
              
              {/* Stats Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <FolderOpen className="w-8 h-8" style={{ margin: '0 auto 12px', opacity: 0.8 }} />
                  <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                    {projects.length}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Total Projects</div>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <Clock className="w-8 h-8" style={{ margin: '0 auto 12px', opacity: 0.8 }} />
                  <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                    {projects.filter(p => p.status === 'in_progress').length}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Active Projects</div>
                </div>
                
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <CheckCircle className="w-8 h-8" style={{ margin: '0 auto 12px', opacity: 0.8 }} />
                  <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                    {projects.filter(p => p.status === 'completed').length}
                  </div>
                  <div style={{ fontSize: '14px', opacity: 0.8 }}>Completed</div>
                </div>
              </div>

              {/* Recent Projects */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Recent Projects
              </h3>
              
              {projects.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  opacity: 0.7
                }}>
                  <FolderOpen className="w-16 h-16" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No projects yet</p>
                  <p style={{ fontSize: '14px', opacity: 0.8 }}>
                    Your projects will appear here once they're created.
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '16px'
                }}>
                  {projects.slice(0, 3).map(project => (
                    <div
                      key={project.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '20px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '12px'
                      }}>
                        <h4 style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          marginBottom: '4px'
                        }}>
                          {project.title}
                        </h4>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '12px',
                          opacity: 0.8
                        }}>
                          {getStatusIcon(project.status)}
                          <span className={getStatusColor(project.status)}>
                            {project.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <p style={{
                        fontSize: '14px',
                        opacity: 0.8,
                        marginBottom: '12px'
                      }}>
                        {project.description}
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        gap: '16px',
                        fontSize: '12px',
                        opacity: 0.7
                      }}>
                        <span>Service: {project.service_type.replace('_', ' ')}</span>
                        <span>Budget: {project.budget_range}</span>
                        <span>Timeline: {project.timeline}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
              }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif'
                }}>
                  All Projects
                </h2>
                <button
                  style={{
                    background: '#F46A25',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E55A1F';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#F46A25';
                  }}
                >
                  <Plus className="w-4 h-4" />
                  New Project
                </button>
              </div>

              {projects.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  opacity: 0.7
                }}>
                  <FolderOpen className="w-16 h-16" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                  <p style={{ fontSize: '18px', marginBottom: '12px' }}>No projects yet</p>
                  <p style={{ fontSize: '14px', opacity: 0.8 }}>
                    Get started by creating your first project.
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gap: '16px'
                }}>
                  {projects.map(project => (
                    <div
                      key={project.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        padding: '24px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '16px'
                      }}>
                        <div>
                          <h4 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            marginBottom: '8px'
                          }}>
                            {project.title}
                          </h4>
                          <p style={{
                            fontSize: '14px',
                            opacity: 0.8,
                            marginBottom: '12px'
                          }}>
                            {project.description}
                          </p>
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '14px',
                          opacity: 0.8
                        }}>
                          {getStatusIcon(project.status)}
                          <span className={getStatusColor(project.status)}>
                            {project.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '12px',
                        fontSize: '13px',
                        opacity: 0.7
                      }}>
                        <div>
                          <strong>Service:</strong> {project.service_type.replace('_', ' ')}
                        </div>
                        <div>
                          <strong>Budget:</strong> {project.budget_range}
                        </div>
                        <div>
                          <strong>Timeline:</strong> {project.timeline}
                        </div>
                        <div>
                          <strong>Created:</strong> {new Date(project.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {project.deliverables && project.deliverables.length > 0 && (
                        <div style={{
                          marginTop: '16px',
                          paddingTop: '16px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <h5 style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            marginBottom: '8px',
                            opacity: 0.8
                          }}>
                            Deliverables ({project.deliverables.length})
                          </h5>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px'
                          }}>
                            {project.deliverables.map(deliverable => (
                              <span
                                key={deliverable.id}
                                style={{
                                  background: 'rgba(255, 255, 255, 0.1)',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '12px',
                                  opacity: 0.8
                                }}
                              >
                                {deliverable.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '30px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Messages
              </h2>
              
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                opacity: 0.7
              }}>
                <MessageSquare className="w-16 h-16" style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                <p style={{ fontSize: '18px', marginBottom: '12px' }}>No messages yet</p>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>
                  Messages from your project team will appear here.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 style={{
                fontSize: '28px',
                fontWeight: '600',
                marginBottom: '30px',
                fontFamily: 'Poppins, sans-serif'
              }}>
                Profile Settings
              </h2>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  Account Information
                </h3>
                
                <div style={{
                  display: 'grid',
                  gap: '16px'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      opacity: 0.8
                    }}>
                      Email Address
                    </label>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '14px'
                    }}>
                      {user?.email}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      opacity: 0.8
                    }}>
                      Company Name
                    </label>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '14px'
                    }}>
                      {user?.company_name || 'Not specified'}
                    </div>
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: '500',
                      marginBottom: '8px',
                      opacity: 0.8
                    }}>
                      Phone Number
                    </label>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      fontSize: '14px'
                    }}>
                      {user?.phone || 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
