import { graphql, useStaticQuery } from "gatsby";

const usePortfolioItems = () => {
  const data = useStaticQuery(graphql`
  query {
    allContentfulPosts(sort: {bloggDatum: DESC}) {
      edges {
        node {
          titel
          id
          excerpt {
            childMarkdownRemark {
              excerpt(pruneLength: 150)
            }
          }
          bild {
            gatsbyImageData(width: 700, quality: 100)
          }
          bloggDatum(formatString: "Do of MMMM YYYY")
          slug
          spaceId
          categories {
            categoryName
          }
        }
      }
    }
  }
`)
  return data.allContentfulPosts;
};

export default usePortfolioItems;
