import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Get search query from URL params
    const query = new URLSearchParams(location.search).get("q");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [location]);

  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    const apiKey = 'cd3a420ff4964cb8a755a67c87e8665e';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

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

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : (
        <div>
          {searchResults.length > 0 ? (
            <div className="row g-4">
              {searchResults.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card shadow-sm">
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
            <p className="text-center">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
