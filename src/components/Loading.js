import React from 'react';

export const styles = {
    outer: {
        textAlign: 'center',
        margin: '20px',
        height: '40px'
    },
    loading: {
        backgroundColor: '#88cbf0',
        height: '100%',
        width: '6px',
        animation: 'stretchdelay 1.2s infinite ease-in-out',
        display: 'inline-block'
    }
};

const Loading = () => {
    const styleSheet = document.styleSheets[0];
    const keyframes = `@keyframes stretchdelay {
            0%, 40%, 100% {
                transform: scaleY(0.2);
                -webkit-transform: scaleY(0.2);
            }
        
            20% {
                transform: scaleY(1.0);
                -webkit-transform: scaleY(1.0);
            }
        }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

    return (
        <div style={styles.outer}>
            <div style={{ ...styles.loading }} />{' '}
            <div style={{ ...styles.loading, animationDelay: '-1.0s' }} />{' '}
            <div style={{ ...styles.loading, animationDelay: '-0.9s' }} />{' '}
            <div style={{ ...styles.loading, animationDelay: '-0.8s' }} />{' '}
            <div style={{ ...styles.loading, animationDelay: '-0.7s' }} />{' '}
            <div style={{ ...styles.loading, animationDelay: '-0.6s' }} />
        </div>
    );
};

export default Loading;
