/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
// gatsby-browser.js

exports.shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (location.action === 'PUSH') {
    // Scroll to the top when pushing a new page
    window.scrollTo(0, 0);
  }
  return false;
};
