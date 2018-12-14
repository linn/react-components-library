import React, { Component } from 'react';

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
class MiniLoading extends Component {
    render() {
        return (
            <div style={styles.outer} >
                <div style={{ ...styles.loading }}></div>{' '}
                <div style={{ ...styles.loading, animationDelay: '-1.0s' }}></div>{' '}
                <div style={{ ...styles.loading, animationDelay: '-0.9s' }}></div>{' '}
            </div>
        );
    }
}

export default MiniLoading;