import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { useLocation } from "@reach/router";

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

  return (
    <>
    <nav>
      <ul className="headerlink-navigation">
      {data.allContentfulPage.edges.map((edge, index) => (
        <li key={edge.node.id}>
          {/* <Link className="headerlink" to={`${edge.node.url}`}>{edge.node.titel}</Link> edge.node.url+"/" */}
          <Link
              className={`headerlink${location.pathname === urls[index] || (location.pathname.includes("/portfolio-post/") && edge.node.url === "/portfolio") ? " active" : ""}`}
              to={`${edge.node.url}`}
              data-filter={edge.node.titel}
            >
              {edge.node.titel}
          </Link>
        </li>
      ))}
      </ul>
    </nav>
    </>
  );

  // return data.allContentfulPage.edges.map((edge) => ({
  //   id: edge.node.id,
  //   titel: edge.node.titel,
  //   url: edge.node.url,
  // }));

};

export default useNavigation;
