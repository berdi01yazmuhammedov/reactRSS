import ErrorBoundary from "./components/ErrorBoundary"
import Header from "./components/Header"
import FetchRender from "./FetchRender"

function App() {


  return (
    <ErrorBoundary>

      <Header />
      <FetchRender />

    </ErrorBoundary>
  )
}

export default App
