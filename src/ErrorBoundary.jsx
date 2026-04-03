import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', background: '#0B1026', color: '#00D2A0', height: '100vh', fontFamily: 'monospace' }}>
                    <h1 style={{ fontSize: '2rem' }}>Something went wrong.</h1>
                    <h3 style={{ color: '#ff4444' }}>{this.state.error && this.state.error.toString()}</h3>
                    <pre style={{ color: '#fff', opacity: 0.7, overflow: 'auto' }}>
                        {this.state.errorInfo && this.state.errorInfo.componentStack}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
