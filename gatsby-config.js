/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Gatsby ITHS SkolPortfolio`,
    description: `Based on a true story`,
    author: `Axel Olivecrona`,
    siteUrl: `http://dummy-site.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/ITHS_Logga.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GITHUB_PERSONAL_TOKEN,
        variables: {},
        graphQLQuery: `
        query {
          user(login: "axxcident") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays{
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
        `,
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`titel`, `Slug`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ContentfulPosts: {
            titel: node => node.titel,
            Slug: node => node.slug,
          },
        },
      },
    },
    // {
    //   resolve: 'gatsby-plugin-netlify',
    //   options: {
    //     functionsSrc: `${__dirname}/functions`,
    //     functionsOutput: `${__dirname}/functions/build`,
    //   },
    // },
  ],
}
