import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

//sidans namn blir portfolio efter namnet på javascript-filen
const SecondPage = () => (
  <Layout>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const Head = () => <title>Portfolio Page</title>

export default SecondPage
