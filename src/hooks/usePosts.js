import { useState, useEffect } from 'react';
import { getPostsPage } from '../api/axios';

const usePosts = (pageNumber = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNumber, { signal })
      .then(data => {
        setResults(prev => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: error.message });
      });

    return () => controller.abort();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};
export default usePosts;
