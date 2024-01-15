import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { useLocation } from "@reach/router";
import { FaSearch } from "react-icons/fa";

const useNavigation = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPage(sort: {url: ASC}) {
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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const handleSearch = () => {
    setIsSearchActive(!isSearchActive);
  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
            onKeyPress={handleKeyPress}
            role="button"
            tabIndex="0"
            >
          <FaSearch />
        </li>
        {isSearchActive && (
        <div className="search-input-container">
          <input type="text" className="search-bar" />
        </div>
          )}
      </ul>
    </nav>
    </>
  );
};

export default useNavigation;
