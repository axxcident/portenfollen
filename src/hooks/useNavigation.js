import React, { useState } from "react";
import { graphql, useStaticQuery, Link, navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { FaSearch } from "react-icons/fa";
import Search from "../functions/search";

const useNavigation = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const data = useStaticQuery(graphql`
  query {
    allContentfulPage(filter: {url: {ne: "/search"}}, sort: {url: ASC}) {
      edges {
        node {
          id
          titel
          url
        }
      }
    }
  }
  `);

  const location = useLocation();
  const urls = ["/", "/about/", "/contact/", "/portfolio/"]

  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
  }

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const redirectToSearch = () => {
    // Pass the searchInput as a prop to SearchTemplate
    navigate(`/search?query=${searchInput}`);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    redirectToSearch();
  };


  return (
    <>
    <nav>
      <ul className={`headerlink-navigation ${isSearchActive ? "widebar" : ""}`}>
      {data.allContentfulPage.edges.map((edge, index) => (
        <li key={edge.node.id}>
          <Link
              className={`headerlink${location.pathname === urls[index] || (location.pathname.includes("/portfolio-post/") && edge.node.url === "/portfolio") ? " active" : ""}`}
              to={`${edge.node.url}`}
              data-filter={edge.node.titel}
            >
              {edge.node.titel}
          </Link>
        </li>
      ))}
        <li className={`search-icon ${isSearchActive ? "active" : ""}`}
            onClick={handleSearch}
            // role="button"
            // tabIndex="0"
            >
          <FaSearch />
        </li>
        {isSearchActive && (
        // <form className="search-input-container" onSubmit={handleFormSubmit}>
        //   <input type="text"
        //     className="search-bar"
        //     value={searchInput}
        //     onChange={handleInputChange} />
        //   <button type="submit">Sök</button>
        // </form>
          <div className="search-input-container">
            <Search />
          </div>
          )}
      </ul>
    </nav>
    </>
  );
};

export default useNavigation;
