import React, { ErrorInfo } from 'react'

class ErrorBoundary extends React.Component<
  React.ComponentProps<any>,
  { hasError: boolean }
> {
  constructor(props: {} | Readonly<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    const { hasError } = this.state
    if (hasError) {
      return
    }

    return this.props.children
  }
}

export default ErrorBoundary
