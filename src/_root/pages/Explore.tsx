import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";
import Loading from "@/components/Loading";
import GridPostList from "@/components/GridPostList";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loading />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts = !shouldShowSearchResults &&
    posts.pages.every((item) => item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full dark:bg-gradient-to-r dark:from-white dark:to-primary-600 dark:text-transparent dark:bg-clip-text">Search Posts</h2>
        <div className="flex gap-1 w-full rounded-lg bg-light-2 dark:bg-dark-4">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
            className="ml-2"
          />
          <input
            type="text"
            placeholder="Search"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center gap-3 bg-primary-500 rounded-xl px-4 py-2 cursor-pointer">
          <p className="small-medium md:base-medium text-dark-2">All</p>
          <img
            src="/assets/icons/filter.svg"
            width={20}
            height={20}
            alt="filter"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
          posts.pages.map((item, index) => (
            <GridPostList key={`page-${index}`} posts={item?.documents} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Explore;
