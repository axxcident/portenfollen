import * as React from "react"
// import { Link } from "gatsby"
// import { GatsbyImage  } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import AboutTemplate from "../templates/about-template"
import ContactTemplate from "../templates/contact-template"
import HomeTemplate from "../templates/home-template"

const Page = ( props ) => {

  const { data } = props;
  const { contentfulPage } = data;
  const getTemplate = (contentfulPage) => {
    switch (contentfulPage.template) {
      case "about-template":
        return <AboutTemplate {...contentfulPage} />
      case "contact-template":
        return <ContactTemplate {...contentfulPage} />
      case "home-template":
        return <HomeTemplate {...contentfulPage} />
      default:
        return <HomeTemplate {...contentfulPage} />
    }
  }

  return <Layout>{getTemplate(contentfulPage)}</Layout>
}

export const data = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      url
      titel
      bilden {
        gatsbyImage(width: 700)
      }
      content {
        raw
      }
    }
  }
`

export default Page;
