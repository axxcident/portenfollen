import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import GitHubContributionsChart from "../functions/GitHubContributionsChart";
import GitHubContributionsLines from "../functions/GithubContributionsLines";
import LanguagePieChart from "../functions/LanguagePieChart";

const HomePage = (contentfulPage) => {

  return (
    <>
    <section className="section intro">
      <div className="gradient-background-1"></div>
      <img className="intro-pic" src="https://axels-portfolio.vercel.app/_next/image?url=%2Fme.jpg&w=256&q=95" alt="profile" />
       {/* <h2>{contentfulPage.titel}</h2> */}
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
    </section>
    <section className="section GHCL">
      <GitHubContributionsLines />
      <div className="gradient-background-3"></div>
    </section>
    <section className="section">
      <LanguagePieChart />
    </section>
    <section className="section bars">
      <GitHubContributionsChart />
    </section>
    <section className="section outro">
      <article>
        <h3>Tack för allt ITHS</h3>
      </article>
      <GatsbyImage className="homepage-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />
    </section>
    </>
  );
}
export default HomePage;
