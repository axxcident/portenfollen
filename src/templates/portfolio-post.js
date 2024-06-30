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
      betyg
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
      <Link className='return-btn' to="/portfolio/">Tillbaka till portolio sidan</Link>
      <div className="single-post-container">
        <h2 className='single-post-title'>{contentfulPosts.titel}<span className="single-post-betyg">- Betyg: <span className="single-post-betyg-text">{contentfulPosts.betyg}</span></span></h2>
        <div className="single-post-bild">
          {contentfulPosts.bild && contentfulPosts.bild.gatsbyImage && (
            <GatsbyImage className="featured" image={getImage(contentfulPosts.bild.gatsbyImage)} alt={contentfulPosts.titel} />
          )}
        </div>
        <div className="single-post-text-container">
          <div className="single-post-meta">
            <p className="single-post-date">{contentfulPosts.bloggDatum}</p>
            <div className="single-post-categories">
              <p>Teknologier:</p>
              {contentfulPosts.categories.map((category) => (
                <p key={category.categoryName} className="single-post-category">
                  {category.categoryName}
                </p>
              ))}
            </div>
          </div>
              <div className="single-post-text">
                {documentToReactComponents(JSON.parse(contentfulPosts.body.raw))}
              </div>
        </div>
      </div>
        <div className="gradient-background-3"></div>
    </Layout>
  );
};

export default PortfolioPost;
