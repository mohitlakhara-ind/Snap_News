import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";

const News = lazy(() => import("./Components/News"));

function App() {
  const pageSize = 12;
  const country = "us";
  const apiKey = process.env.REACT_APP_SnapNews_API;

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar />
        </header>
        <div className="App-body">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<News key="general" pageSize={pageSize} country={country} category="general" apiKey={apiKey} />} />
              <Route path="/business" element={<News key="business" pageSize={pageSize} country={country} category="business" apiKey={apiKey} />} />
              <Route path="/entertainment" element={<News key="entertainment" pageSize={pageSize} country={country} category="entertainment" apiKey={apiKey} />} />
              <Route path="/health" element={<News key="health" pageSize={pageSize} country={country} category="health" apiKey={apiKey} />} />
              <Route path="/science" element={<News key="science" pageSize={pageSize} country={country} category="science" apiKey={apiKey} />} />
              <Route path="/sports" element={<News key="sports" pageSize={pageSize} country={country} category="sports" apiKey={apiKey} />} />
              <Route path="/technology" element={<News key="technology" pageSize={pageSize} country={country} category="technology" apiKey={apiKey} />} />
              <Route path="*" element={<h1>404 - Page Not Found</h1>} />
              
            </Routes>
          </Suspense>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
