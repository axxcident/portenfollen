import * as React from "react"
import '../css/style.css';
// import {Link} from "gatsby";
import useNavigation from "../hooks/useNavigation";

const Layout = ({ children }) => (
    <>
      <header>
        {useNavigation()}
      </header>
      <main>{children}</main>
      <footer className="footer">
        <small className="small">
          &copy; 2023 Axel Olivecrona. All rights reserved.
        </small>
        <p className="footer-paragraph">
          <span className="my-bold">About this website:</span> Byggd med Gatsby/React &
          Contentful (Headless CMS), javascript, Server Side Generation & uppladdad via Netlify.
        </p>
    </footer>
    </>
  )


export default Layout
