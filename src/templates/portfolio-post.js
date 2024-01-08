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
        gatsbyImage(width: 700)
      }
      body {
        raw
      }
    }
  }
`;

const PortfolioPost = (props) => {
  const { contentfulPosts } = props.data;

  return (
    <Layout>
      <h3>{contentfulPosts.titel}</h3>
      <div className="gradient-background-1"></div>
      <Link to="/portfolio/">Tillbaka till portolio sidan</Link>
      <div className="content">
        {contentfulPosts.bild.gatsbyImage && (
          <GatsbyImage className="featured" image={getImage(contentfulPosts.bild.gatsbyImage)} alt={contentfulPosts.titel} />
        )}
        {documentToReactComponents(JSON.parse(contentfulPosts.body.raw))}
        <div className="gradient-background-3"></div>
      </div>
    </Layout>
  );
};

export default PortfolioPost;
