import * as React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ContactPage = (contentfulPage) => {
  return (
    <>
      {/* <h3>{contentfulPage.titel}</h3> */}
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
    </>
  );
}

export default ContactPage;
