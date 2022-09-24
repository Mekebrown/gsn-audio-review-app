import React from "react";
import SendAxiosMsg from "./SendAxiosMsg";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null
        };
    }

    // Use this method to render out a specifically-designed error-related UI
    static getDerivedStateFromError(error) {
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        // Eventually this method will be where logging takes place. For now, sending to B/E

        SendAxiosMsg("post", "/error", { error: error, errorInfo: JSON.stringify(errorInfo) })
            .then(data => console.log(data))
            .catch(error => console.error(error));

        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    }

    render() {
        if (this.state.error) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
