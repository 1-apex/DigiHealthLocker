import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'
import { AuthProvider } from "../src/Store/AuthClient"



export function render(url) {
  // console.log(url);
  if (url !== "/") {
    url = "/" + url;
  }
  const html = ReactDOMServer.renderToString(

    < StaticRouter location={url} >
      <AuthProvider>
        <App />
      </AuthProvider>
    </StaticRouter >
  )
  return { html }
}
