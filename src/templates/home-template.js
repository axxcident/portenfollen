import * as React from "react"
import { GatsbyImage, getImage  } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import GitHubContributionsChart from "../functions/GitHubContributionsChart";
import GitHubContributionsLines from "../functions/GithubContributionsLines";
import LanguagePieChart from "../functions/LanguagePieChart";
import { Helmet } from "react-helmet";

const HomePage = (contentfulPage) => {

  return (
    <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Studie-Portfolio</title>
      <meta name="description" content="Min digitala aktivitet på ITHS som aspirerande frontend utvecklare" />
    </Helmet>
    <section className="section intro">
      <div className="gradient-background-1"></div>
      <img className="intro-pic" src="https://axels-portfolio.vercel.app/_next/image?url=%2Fme.jpg&w=256&q=95" alt="profile" />
       {/* <h2>{contentfulPage.titel}</h2> */}
      {documentToReactComponents(JSON.parse(contentfulPage.content.raw))}
    </section>
    <section className="section GHCL" id="GH-activity">
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
        <p> ITHS har varit en fantastisk möjlighet för mig att omforma min karriär mot något mer kreativt och givande. Jag önskar skolan och alla lärare, mina kamrater och kollegor all lycka framöver! Allt gott, Axel</p>
      </article>
      <GatsbyImage className="homepage-bild" image={getImage(contentfulPage.bilden.gatsbyImage)} alt={contentfulPage.titel} />
        <h3>Tack för allt ITHS</h3>
    </section>
    </>
  );
}
export default HomePage;
