import { useState, useRef, useCallback } from 'react';
import usePosts from './hooks/usePosts';
import Post from './Post';

const FristExample = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNumber);

  const intObserver = useRef();
  const lastPostRef = useCallback(
    post => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near last post, and there is a time to load more');
          setPageNumber(prev => prev + 1);
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage],
  );

  if (isError) return <p className="center">Error: {error.message}</p>;
  const content = results.map((post, index) => {
    if (results.length === index + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
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
