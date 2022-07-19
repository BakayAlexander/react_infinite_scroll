import { useRef, useCallback } from 'react';
import Post from '../Post';
import { useInfiniteQuery } from 'react-query';
import { getPostsPage } from '../../api/axios';

const SecondExample = () => {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, data, status, error } = useInfiniteQuery(
    '/posts',
    ({ pageParam = 1 }) => getPostsPage(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const intObserver = useRef();
  const lastPostRef = useCallback(
    post => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(posts => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('We are near last post, and there is a time to load more');
          fetchNextPage();
        }
      });
      if (post) intObserver.current.observe(post);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (status === 'error') return <p className="center">Error: {error.message}</p>;
  //It won't work correct without optional chaining
  const content = data?.pages.map(page => {
    return page.map((post, index) => {
      if (page.length === index + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />;
      }
      return <Post key={post.id} post={post} />;
    });
  });

  return (
    <>
      <h2 id="top">&infin; Ex. 2 - React Query</h2>
      {content}
      {isFetchingNextPage && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};
export default SecondExample;
