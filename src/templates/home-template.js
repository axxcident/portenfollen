import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import GitHubContributionsChart from "../functions/GitHubContributionsChart";
import GitHubContributionsLines from "../functions/GithubContributionsLines";
import LanguagePieChart from "../functions/LanguagePieChart";

const HomePage = (contentfulPage) => {

  return (
    <>
      <section className="section">
      {/* <h2>{contentfulPage.titel}</h2> */}
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
      </section>
      <section className="section">
      <LanguagePieChart />
    </section>
    <section className="section">
      <GitHubContributionsLines />
    </section>
    <section className="section">
      <GitHubContributionsChart />
    </section>
    <section className="section">
      <GatsbyImage className="homepage-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />
    </section>
    </>
  );
}
export default HomePage;
