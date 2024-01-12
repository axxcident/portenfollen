import React from 'react';
import { graphql, Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../components/layout';
import { GatsbyImage, getImage  } from "gatsby-plugin-image"

export const query = graphql`
  query($slug: String!) {
    contentfulPosts(slug: { eq: $slug }) {
      bloggDatum(formatString: "Do of MMMM YYYY")
      titel
      bild {
        gatsbyImage(width: 1000)
      }
      body {
        raw
      }
      categories {
        categoryName
      }
    }
  }
`;

const PortfolioPost = (props) => {
  const { contentfulPosts } = props.data;

  return (
    <Layout>
      <div className="gradient-background-1"></div>
      <div className="single-post-container">
        <h3>{contentfulPosts.titel}</h3>
        <Link to="/portfolio/">Tillbaka till portolio sidan</Link>
        <div className="single-post-bild">
          {contentfulPosts.bild.gatsbyImage && (
            <GatsbyImage className="featured" image={getImage(contentfulPosts.bild.gatsbyImage)} alt={contentfulPosts.titel} />
          )}
        </div>
          {documentToReactComponents(JSON.parse(contentfulPosts.body.raw))}
      </div>
        <div className="gradient-background-3"></div>
    </Layout>
  );
};

export default PortfolioPost;
