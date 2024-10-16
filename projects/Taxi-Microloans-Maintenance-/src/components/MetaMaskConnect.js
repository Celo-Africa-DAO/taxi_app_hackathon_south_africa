import React from 'react';

const MetaMaskConnect = ({ connect }) => {
    return (
        <button 
            onClick={connect} 
            style={{
                padding: '10px 20px',
                backgroundColor: '#f6851b',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#FFFF00')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f6851b')}
        >
            Connect MetaMask
        </button>
    );
};

export default MetaMaskConnect;