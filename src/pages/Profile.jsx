import React, { useState, useEffect } from 'react';
import { User, BookOpen, GraduationCap, AlignLeft } from 'lucide-react';

const PROFILE_KEY = 'prof_profile';
const PROFESSOR_NAME_KEY = 'overview_professor_name';

const defaultProfile = {
  name: 'Professor',
  department: 'Computer Science',
  education: 'Ph.D. in Computer Science',
  bio: 'Passionate about teaching and building decentralized systems.'
};

const Profile = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load profile from local storage
    const storedProfile = localStorage.getItem(PROFILE_KEY);
    const storedName = localStorage.getItem(PROFESSOR_NAME_KEY);
    
    if (storedProfile) {
      try {
        const parsed = JSON.parse(storedProfile);
        // Ensure the name in profile matches the global overview name if it exists
        if (storedName && storedName !== parsed.name) {
          parsed.name = storedName;
        }
        setProfile((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load profile', error);
      }
    } else if (storedName) {
      setProfile((prev) => ({ ...prev, name: storedName }));
    }
  }, []);

  const handleChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    // Save to profile key
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    
    // Also update the global overview name so it reflects everywhere
    if (profile.name.trim()) {
      localStorage.setItem(PROFESSOR_NAME_KEY, profile.name.trim());
      // Trigger a custom event so Header can update immediately
      window.dispatchEvent(new Event('profile_updated'));
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ padding: 'var(--spacing-lg)', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-soft)' }}>
      <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '2.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Professor Profile</h2>
          <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '1.1rem' }}>
            Manage your personal details, educational background, and subject expertise.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-primary"
          style={{
            padding: '0.85rem 1.5rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            fontSize: '1rem'
          }}
        >
          Save Profile
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '2rem', 
        maxWidth: '800px' 
      }}>
        {/* Name Field */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <User size={20} color="var(--accent-primary)" /> Full Name
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="e.g., Dr. Jane Smith"
            style={{ 
              width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', fontSize: '1rem' 
            }}
          />
        </div>

        {/* Department / Subject Field */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <BookOpen size={20} color="var(--accent-primary)" /> Department / Subject Taught
          </label>
          <input
            type="text"
            value={profile.department}
            onChange={(e) => handleChange('department', e.target.value)}
            placeholder="e.g., Computer Science, Mathematics"
            style={{ 
              width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', fontSize: '1rem' 
            }}
          />
        </div>

        {/* Education Field */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <GraduationCap size={20} color="var(--accent-primary)" /> Educational Background
          </label>
          <input
            type="text"
            value={profile.education}
            onChange={(e) => handleChange('education', e.target.value)}
            placeholder="e.g., Ph.D. in Artificial Intelligence, Stanford University"
            style={{ 
              width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', fontSize: '1rem' 
            }}
          />
        </div>

        {/* Bio Field */}
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            <AlignLeft size={20} color="var(--accent-primary)" /> Brief Bio / Research Interests
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="A short description about yourself and your academic focus..."
            rows={5}
            style={{ 
              width: '100%', padding: '1rem', borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', 
              color: 'var(--text-primary)', fontSize: '1rem', resize: 'vertical'
            }}
          />
        </div>

        {saved && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(74, 222, 128, 0.1)', 
            border: '1px solid rgba(74, 222, 128, 0.2)',
            borderRadius: 'var(--radius-md)',
            color: '#4ade80', 
            fontWeight: '700',
            textAlign: 'center'
          }}>
            Profile saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
