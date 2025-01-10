import React, { useState, useEffect } from "react"; 
import { Link } from "react-router-dom"; 
import Logo from "./Logo"; 

const NavBar = (props) => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState(null);  
  const [isSearching, setIsSearching] = useState(false);  // Track if search is active

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        handleSearchSubmit();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearching(true);  // Show loading when user types
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);
    setIsSearching(false);  // Hide the search indicator

    const apiKey = 'cd3a420ff4964cb8a755a67c87e8665e';
    const url = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === "ok" && data.articles.length > 0) {
        setSearchResults(data.articles);
      } else {
        setSearchResults([]);
        setError("No results found");
      }
    } catch (error) {
      setError("Error fetching news data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Logo />
          <Link className="navbar-brand" to="/">SnapNews</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            </ul>
            {/* <form className="d-flex border" onSubmit={(e) => e.preventDefault()}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="btn btn-outline-success" type="button" onClick={handleSearchSubmit}>
                {isSearching ? "Searching..." : "Search"}
              </button>
              {searchQuery && (
                <button className="btn btn-outline-danger ms-2" type="button" onClick={handleClearSearch}>
                  Clear
                </button>
              )}
            </form> */}
          </div>
        </div>
      </nav>

      {/* <div className="container mt-5">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : (
          <div>
            {searchResults.length > 0 ? (
              <div className="row">
                {searchResults.map((article, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="card">
                      <img src={article.urlToImage} alt={article.title} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{article.title}</h5>
                        <p className="card-text">{article.description?.slice(0, 100)}...</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                          Read more
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default NavBar;
