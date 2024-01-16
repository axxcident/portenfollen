import React, { useState, useEffect } from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { Index } from "elasticlunr";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null); // New state for searchIndex

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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {results.map((page) => (
          <li key={page.id}>
            <Link to={`/${page.slug}`}>{page.titel}</Link>
            {/* <p>Category: {page.categories.categoryName}</p> */}
          </li>
        ))}
      </ul>

      {query && <p>Search query: {query}</p>}
    </div>
  );
};

export default Search;
