import React, { useEffect, useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROFESSOR_NAME_KEY = 'overview_professor_name';
const PROFILE_KEY = 'prof_profile';

const Header = () => {
  const [professorName, setProfessorName] = useState('Prof. Anderson');
  const [department, setDepartment] = useState('Computer Science');
  const navigate = useNavigate();

  const loadProfileData = () => {
    const savedName = localStorage.getItem(PROFESSOR_NAME_KEY);
    if (savedName) {
      const cleanName = savedName.trim();
      setProfessorName(cleanName ? cleanName : 'Prof. Anderson');
    }

    const storedProfile = localStorage.getItem(PROFILE_KEY);
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        if (parsed.department) {
          setDepartment(parsed.department);
        }
      } catch (e) {
        // Ignore
      }
    }
  };

  useEffect(() => {
    loadProfileData();

    // Listen for the custom event we fire in Profile.jsx
    window.addEventListener('profile_updated', loadProfileData);
    
    return () => {
      window.removeEventListener('profile_updated', loadProfileData);
    };
  }, []);

  const displayInitial = professorName.charAt(0).toUpperCase();

  return (
    <header className="glass-panel" style={{
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--spacing-lg)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      borderBottom: '1px solid var(--border-color)',
      borderRadius: 0,
      borderTop: 'none', borderLeft: 'none', borderRight: 'none'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '300px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(0,0,0,0.2)',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-round)',
          border: '1px solid var(--border-color)',
          width: '100%'
        }}>
          <Search size={18} color="var(--text-secondary)" />
          <input 
            type="text" 
            placeholder="Search students..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <button style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', position: 'relative' }}>
          <Bell size={20} />
          <span style={{
            position: 'absolute',
            top: '-2px', right: '-2px',
            width: '8px', height: '8px',
            backgroundColor: '#ef4444',
            borderRadius: '50%'
          }}></span>
        </button>
        
        <div 
          onClick={() => navigate('/dashboard/profile')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem', 
            cursor: 'pointer',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          title="View Professor Profile"
        >
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-primary)' }}>{professorName}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{department}</div>
          </div>
          <div style={{
            width: '40px', height: '40px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '600', color: '#fff',
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
          }}>
            {displayInitial}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
