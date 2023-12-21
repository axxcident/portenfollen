import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

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

  return (
    <>
    <nav>
      {/* Detta kommer inte funka med NEtlify http://localhost:8000 */}
      <ul className="headerlink-navigation">
      {data.allContentfulPage.edges.map((edge) => (
        <li key={edge.node.id}>
          <Link className="headerlink" to={`${edge.node.url}`}>{edge.node.titel}</Link>
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
