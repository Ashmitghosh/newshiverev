import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";


const NewsBoard = ({ category }) => { // Destructuring category from props
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setArticles(data.articles);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchNews();
    }, [category]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>What's <span className="badge text-bg-danger">New</span></h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {articles.map((news, index) => (
                <NewsItem
                    key={index}
                    title={news.title}
                    description={news.description}
                    src={news.urlToImage}
                    url={news.url}
                />
            ))}
        </div>
    );
}

export default NewsBoard;
