import React from 'react';

interface SideButtonsProps {
  onInfo?: () => void;
  onLanguage?: () => void;
  onHome?: () => void;
}

export default function SideButtons({
  onInfo,
  onLanguage,
  onHome
}: SideButtonsProps) {
  return (
    <div style={{
      position: 'fixed',
      right: 20,
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      zIndex: 1000
    }}>
      <button 
        onClick={onInfo}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#666',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#555';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
      >
        i
      </button>

      <button 
        onClick={onLanguage}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#666',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          fontWeight: 600,
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#555';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
      >
        RU
      </button>

      <button 
        onClick={onHome}
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#666',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#555';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#666';
        }}
      >
        ⌂
      </button>
    </div>
  );
} 