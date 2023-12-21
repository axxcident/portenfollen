import * as React from "react"
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import usePortfolioItems from "../hooks/usePortfolioItems";

const PortfolioPage = (contentfulPage) => {
  const allPosts = usePortfolioItems();
  return (
    <>
      <h2>Portfolio</h2>
      {allPosts.edges.map((edge) => (
        <div key={edge.node.id}>
          <h3>{edge.node.titel}</h3>
          <p>{edge.node.bloggDatum}</p>
          {/* Additional fields can be displayed as needed */}
          {/* Use GatsbyImage component to render the image */}
          {/* Replace with your actual GatsbyImage implementation */}
          {/* <GatsbyImage image={edge.node.bild.gatsbyImageData} alt={edge.node.titel} /> */}
          {/* Render the excerpt or content as needed */}
          <p>{edge.node.excerpt.childMarkdownRemark.excerpt}</p>
        </div>
      ))}
    </>
  );
}

export default PortfolioPage;
