import * as React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import Layout from "../components/layout"

const SecondPage = () => {
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
        }
      }
    }
  }
`)

  return (
  <Layout>
    <h2 className="portfolioh2">ITHS kurser jag förvärvat som Frontend utvecklare</h2>
    <ul className="kurslistan">
      {data.allContentfulPosts.edges.map((edge) => (
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
  </Layout>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default SecondPage
