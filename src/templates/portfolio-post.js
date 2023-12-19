import React from 'react';
import { graphql, Link } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Layout from '../components/layout';
import Img from 'gatsby-image';

export const query = graphql`
  query($slug: String!) {
    contentfulPosts(slug: { eq: $slug }) {
      bloggDatum(formatString: "Do of MMMM YYYY")
      titel
      bild {
        gatsbyImageData(width: 700)
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
      <Link to="/portfolio/">Tillbaka till portolio sidan</Link>
      <div className="content">
        {contentfulPosts.bild.gatsbyImageData && (
          <Img
            className="featured"
            fluid={contentfulPosts.bild.gatsbyImageData}
            alt={contentfulPosts.titel}
          />
        )}
        {documentToReactComponents(JSON.parse(contentfulPosts.body.json))}
      </div>
    </Layout>
  );
};

export default PortfolioPost;
