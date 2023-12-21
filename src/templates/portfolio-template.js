import * as React from "react"
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from "gatsby"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import usePortfolioItems from "../hooks/usePortfolioItems";

const PortfolioPage = (contentfulPage) => {
  const allPosts = usePortfolioItems();
  return (
    <>
    <h2 className="portfolioh2">ITHS kurser jag förvärvat som Frontend utvecklare</h2>
    <ul className="kurslistan">
      {allPosts.edges.map((edge) => (
        <li key={edge.node.id} className="kursamne">
          <Link to={`/portfolio-post/${edge.node.slug}/`} className="ph2text_container">
            <h3 className="kurstitel">
              {edge.node.titel}
              </h3>
            <p className="kurstext">{edge.node.excerpt.childMarkdownRemark.excerpt}</p>
            <span className="datum">Publicerat: {edge.node.bloggDatum}</span>
          </Link>
            <GatsbyImage className="kursbild" image={getImage(edge.node.bild.gatsbyImageData)} alt={edge.node.titel} />
        </li>
      ))}
    </ul>
    </>
  );
}
export default PortfolioPage;
