import * as React from "react"
// import { Link } from "gatsby"
// import { GatsbyImage  } from "gatsby-plugin-image"
import { Helmet } from "react-helmet";
import { graphql } from "gatsby"
import Layout from "../components/layout"
import AboutTemplate from "../templates/about-template"
import ContactTemplate from "../templates/contact-template"
import HomeTemplate from "../templates/home-template"
import PortTemplate from "../templates/portfolio-template"
import SearchTemplate from "../templates/search-template"

const Page = ( props ) => {

  const { data } = props;
  const { contentfulPage } = data;
  const getTemplate = (contentfulPage) => {
    switch (contentfulPage.template) {
      case "about-template":
        return <AboutTemplate {...contentfulPage} />
      case "contact-template":
        return <ContactTemplate {...contentfulPage} />
      case "portfolio-template":
        return <PortTemplate {...contentfulPage} />
        case "search-template":
          return <SearchTemplate {...contentfulPage} />
      default:
        return <HomeTemplate {...contentfulPage} />
    }
  }

  return (
    <>
      <Helmet>
        <title>{`${contentfulPage.titel}`}</title>
      </Helmet>
      <Layout>{getTemplate(contentfulPage)}</Layout>
    </>
  );
  // return <Layout>{getTemplate(contentfulPage)}</Layout>
}

export const data = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      template
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
