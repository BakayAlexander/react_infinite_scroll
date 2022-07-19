import { useState, useRef, useCallback } from 'react';
import usePosts from './hooks/usePosts';
import Post from './Post';

const FristExample = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNumber);
  const lastPostRef = useRef();

  if (isError) return <p className="center">Error: {error.message}</p>;

  const content = results.map((post, index) => {
    if (results.link === index + 1) {
      <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <>
      <h1 id="top">
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 1 - React only
      </h1>
      {content}
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};
export default FristExample;
