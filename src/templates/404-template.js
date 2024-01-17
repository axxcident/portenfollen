import * as React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { Helmet } from "react-helmet";

const NotFOundPage = (contentfulPage) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>404: sida finns ej</title>
        <meta name="description" content="404: sida finns ej" />
      </Helmet>
      <div className="gradient-background-1"></div>
      <div className="notfound-container">
        <div className="notfound">
          {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
        </div>
        <div className="notfound-img">
        {contentfulPage.bilden && contentfulPage.bilden.gatsbyImage && (
            <GatsbyImage
              className="notfound-bild"
              image={getImage(contentfulPage.bilden.gatsbyImage)}
              alt={contentfulPage.titel}
            />
          )}
          {/* <GatsbyImage className="notfound-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} /> */}
        </div>
      </div>
      <div className="gradient-background-3"></div>
    </>
  );
}

export default NotFOundPage;
