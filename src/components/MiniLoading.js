import React from 'react';

const styles = {
    outer: {
        textAlign: 'center',
        height: '32px',
        paddingRight: '10px',
        display: 'inline-block'
    },
    loading: {
        backgroundColor: '#88cbf0',
        height: '100%',
        width: '6px',
        animation: 'stretchdelay 1.2s infinite ease-in-out',
        display: 'inline-block'
    }
};

const MiniLoading = () => (
    <div style={styles.outer}>
        <div style={{ ...styles.loading }} />{' '}
        <div style={{ ...styles.loading, animationDelay: '-1.0s' }} />{' '}
        <div style={{ ...styles.loading, animationDelay: '-0.9s' }} />{' '}
    </div>
);

export default MiniLoading;
