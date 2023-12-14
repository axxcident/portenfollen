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
          description {
            childrenMarkdownRemark {
              excerpt
            }
          }
          bild {
            gatsbyImage(width: 200)
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
    <pre>{JSON.stringify({data}, null, 2)}</pre>
  </Layout>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default SecondPage
