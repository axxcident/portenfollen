import React, { useState } from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { useLocation } from "@reach/router";
import { FaSearch } from "react-icons/fa";
import Search from "../components/Search";

const useNavigation = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  // const [searchInput, setSearchInput] = useState("");

  const data = useStaticQuery(graphql`
  query {
    allContentfulPage(filter: {url: {ne: "/404"}}, sort: {url: ASC}) {
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

  // const handleInputChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  // const redirectToSearch = () => {
  //   // Pass the searchInput as a prop to SearchTemplate
  //   navigate(`/search?query=${searchInput}`);
  // };

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   redirectToSearch();
  // };


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
        <button className={`search-icon ${isSearchActive ? "active" : ""}`} onClick={handleSearch}>
          <FaSearch id="forstoringsglaset" />
        </button>
        {/* <li className={`search-icon ${isSearchActive ? "active" : ""}`} onClick={handleSearch}>
            <FaSearch />
          </li> */}
        {isSearchActive && (
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
