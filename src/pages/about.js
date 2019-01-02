import React from 'react';
import { graphql } from 'gatsby';

export default ({ data }) => {
  console.log("angular ", data);
  return (
    <div>
      <h1>About</h1>
    </div>
    )
  }

  export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }`