import * as React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/layout"

//sidans namn blir portfolio efter namnet på javascript-filen
const SecondPage = () => {



  const data = useStaticQuery(graphql`
  query {
    allContentfulPosts {
      edges {
        node {
          titel
          id
          description {
            childrenMarkdownRemark {
              excerpt
            }
          }
          bild {
            gatsbyImage(width: 300)
          }
        }
      }
    }
  }
  `
  )

  return (

  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
    <ul className="kurslistan">
      {data.allContentfulPosts.edges.map((edge) => (
        <li key={edge.node.id} className="kursamne">
          <div className="ph2text_container">
            <h2 className="kurstitel">{edge.node.titel}</h2>
            <p className="kurstext">{edge.node.description.childrenMarkdownRemark[0].excerpt}</p>
          </div>
            <GatsbyImage className="kursbild" image={edge.node.bild.gatsbyImage} alt={edge.node.titel} />
        </li>
      ))}
    </ul>
  </Layout>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default SecondPage
