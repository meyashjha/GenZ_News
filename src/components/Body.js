import React, { useState, useEffect } from 'react';
import Shimmer from './Shimmer';

const Body = ({ newsCategory }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        let apiUrl;

        if (newsCategory === 'crypto-news') {
          apiUrl = process.env.REACT_APP_CRYPTO_NEWS_API;
        } else if (newsCategory === 'startup-news') {
          apiUrl = process.env.REACT_APP_STARTUP_NEWS_API;
        }else if(newsCategory==='popculture-news') {
          apiUrl = process.env.REACT_APP_POPCULTURE_NEWS_API;
        }
        else {
          // Default to movies/entertainment news from NewsData.io
          apiUrl = process.env.REACT_APP_DEFAULT_NEWS_API ;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let results;

        // Normalize based on API response type
        if (data.response?.results) {
          // Guardian API
          results = data.response.results.filter(item => item.fields?.thumbnail);
        } else if (data.results) {
          // NewsData.io
          results = data.results.filter(item => item.image_url);
          results = results.map((item) => ({
            fields: {
              thumbnail: item.image_url,
              trailText: item.description || item.title,
            },
            webTitle: item.title,
            webPublicationDate: item.pubDate,
            webUrl: item.link,
          }));
        } else {
          results = [];
        }

        setNews(results);
        setCurrentNewsIndex(0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsCategory]);

  const truncateText = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleNextNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % news.length);
  };

  const handlePreviousNews = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex - 1 + news.length) % news.length);
  };

  const currentNewsItem = news[currentNewsIndex];

  return loading ? (
    <Shimmer />
  ) : (
    <div className="body">
      {currentNewsItem && currentNewsItem.fields.thumbnail ? (
        <div className="single-news-container">
          <div key={currentNewsIndex} className="news-card">
            <img
              src={currentNewsItem.fields.thumbnail}
              alt={currentNewsItem.webTitle}
              className="news-image"
            />
            <div className="news-card-content">
              <h2>{currentNewsItem.webTitle}</h2>
              <p className="news-description">{truncateText(currentNewsItem.fields.trailText, 200)}</p>
              {currentNewsItem.webPublicationDate && (
                <p className="news-date">
                  Published: {new Date(currentNewsItem.webPublicationDate).toLocaleDateString()}
                </p>
              )}
              <a
                href={currentNewsItem.webUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-button"
              >
                Read More
              </a>
            </div>
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePreviousNews} className="prev-news-button">Previous News</button>
            <button onClick={handleNextNews} className="next-news-button">Next News</button>
          </div>
        </div>
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
};

export default Body;
