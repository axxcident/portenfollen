import * as React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const AboutPage = (contentfulPage) => {
  return (
    <>
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
      <h1>{contentfulPage.titel}</h1>
    </>
  );
}

export default AboutPage;
