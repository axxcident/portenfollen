import * as React from "react"
import { useLocation } from "@reach/router";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Search from "../functions/Search";

const SearchPage = (contentfulPage) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");
  return (
    <>
      {/* <h3>{contentfulPage.titel}</h3> */}
      <div className="gradient-background-1"></div>
      <div className="search-container">
       {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
       {query && (
         <p>Search query: {query}</p>
         // Render your search results or perform other actions based on the query
       )}
        {/* sökfunktionen */}
        <Search />
      </div>
      <div className="gradient-background-3"></div>
    </>
  );
}

export default SearchPage;
