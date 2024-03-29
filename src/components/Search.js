import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null);

  const data = useStaticQuery(graphql`
    query {
      allSiteSearchIndex {
        edges {
          node {
            index
          }
        }
      }
      allContentfulPosts {
        edges {
          node {
            slug
            titel
          }
        }
      }
    }
  `);

  useEffect(() => {
    // Load searchIndex only once when component mounts
    setSearchIndex(Index.load(data.allSiteSearchIndex.edges[0].node.index));
  }, [data.allSiteSearchIndex.edges]);

  useEffect(() => {
    const search = () => {
      if (searchIndex) {
        // Query the index with the search string to get an array of IDs
        const searchResults = searchIndex
          .search(query, {})
          // Map over each ID and return the full document
          .map(({ ref }) => searchIndex.documentStore.getDoc(ref));

        setResults(searchResults);
      }
    };

    // Run the search effect only when the query changes
    if (query.trim() !== "") {
      search();
    }
  }, [query, searchIndex]);

  return (
    <>
      <input
        className="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {results.length > 0 ? (
        <ul className="search-list">
          {results.map((page) => (
            <li key={page.id}>
              <Link to={`/portfolio-post/${page.Slug}`}>{page.titel}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="search-list">
          <p className="no-results-p">No results found</p>
        </div>
      )}

      {/* <ul className="search-list">
        {results.map((page) => (
          <li key={page.id}>
            <Link to={`/portfolio-post/${page.Slug}`}>{page.titel}</Link>
          </li>
        ))}
      </ul> */}

      {/* {query && <p>Search query: {query}</p>} */}
    </>
  );
};

export default Search;
