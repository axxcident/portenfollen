import * as React from "react"
import '../css/style.css';
// import {Link} from "gatsby";
import useNavigation from "../hooks/useNavigation";

const Layout = ({ children }) => (
    <>
      <header>
        {useNavigation()}
        {/* <Link className="headerlink" to="/portfolio">Portfolio</Link> */}
        {/* <Link className="headerlink" to="/">Hemsida</Link>
        <Link className="headerlink" to="/about">about</Link>
        <Link className="headerlink" to="/contact">Kontakt</Link> */}
      </header>
      <main>{children}</main>
      <footer>Footer</footer>
    </>
  )


export default Layout
