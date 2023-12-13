
import GridUsersList from '@/components/GridUserList';
import Loading from '@/components/Loading'
import useDebounce from '@/hooks/useDebounce';
import { useGetInfiniteUsers, useSearchUsers } from '@/lib/react-query/queriesAndMutations'
import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer';

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedUsers: any;
};

const SearchResults = ({ isSearchFetching, searchedUsers }: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loading />;
  } else if (searchedUsers && searchedUsers.documents.length > 0) {
    return <GridUsersList users={searchedUsers.documents} />;
  } else {
    return (
      <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    );
  }
};

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetInfiniteUsers();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedUsers, isFetching: isSearchFetching } = useSearchUsers(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);

  if(!users)
    return(
      <div className="flex-center w-full h-full">
        <Loading />
      </div>
    )

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowUsers = !shouldShowSearchResults &&
    users.pages.every((item) => item.documents.length === 0);

  return (
    <div className='explore-container'>
        <div className="w-full">
        <div className="flex gap-2 justify-center items-center pb-10">
        <img src='/assets/icons/people.svg' width={36} height={36} />
        <h2 className="h3-bold md:h2-bold md:w-full">Social Circle Users</h2>
        </div>
        <div className='w-full'>
            <hr className="line-break" />
        </div>
      </div>
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold w-full">Search Users</h2>
        <div className="flex gap-1 pl-2 mb-10 w-full rounded-lg bg-light-2">
          <img
            src="/assets/icons/search.svg"
            width={24}
            height={24}
            alt="search"
          />
          <input
            type="text"
            placeholder="Search"
            className="explore-search p-2"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>
        <div className='explore-inner_container'>


              {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedUsers={searchedUsers}
          />
        ) : shouldShowUsers ? (
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        ) : (
                users.pages.map((item, index) => (
                  <GridUsersList key={`page-${index}`} users={item.documents} />

        )))}

              {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loading />
        </div>
      )}
            </div>
        </div>

  )
}

export default AllUsers
