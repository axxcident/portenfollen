import * as React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutPage = (contentfulPage) => {
  return (
    <>
      {/* <h3>{contentfulPage.titel}</h3> */}
      <div className="gradient-background-1"></div>
      <div className="about-container">
       {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
      </div>
      <div className="gradient-background-3"></div>
    </>
  );
}

export default AboutPage;
