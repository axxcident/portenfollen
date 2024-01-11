import React, { useState } from "react";
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from "gatsby"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import usePortfolioItems from "../hooks/usePortfolioItems";
import { Helmet } from "react-helmet";

const PortfolioPage = (contentfulPage) => {
  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const allPosts = usePortfolioItems();

  const categories = ["Alla", ...new Set(allPosts.edges.map((edge) => edge.node.kategori),)];

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Studie-Portfolio</title>
      <meta name="description" content="ITHS kurser jag förvärvat som Frontend utvecklare" />
    </Helmet>
    <h2 className="portfolioh2">ITHS kurser jag förvärvat som Frontend utvecklare</h2>
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
    <div className="gradient-background-1"></div>
    <ul className="kurslistan">
      {allPosts.edges
        .filter((edge) =>
        selectedCategory === "Alla"
          ? true
          : edge.node.kategori === selectedCategory
      )
      .map((edge) => (
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
    <div className="gradient-background-3"></div>
    </>
  );
}
export default PortfolioPage;
