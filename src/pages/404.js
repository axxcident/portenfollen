import * as React from "react"

import Layout from "../components/layout"

//i dev mode overridas denna sida av en inbyggd 404-sida
const NotFoundPage = () => (
  <Layout>
    <h1>404: icke funnen</h1>
  </Layout>
)

export const Head = () => <title>404: ej hittad</title>

export default NotFoundPage
