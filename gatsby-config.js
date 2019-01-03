const path = require('path');
const yaml = require('js-yaml');
const fs   = require('fs');

let site = {
  title: 'training.sh',
  description: 'Learning technology',
  permalink: 'http://training.sh',
  siteUrl: 'http://training.sh',
}

try {
  site = yaml.safeLoad(fs.readFileSync(`./content/site.yml`, 'utf8'));
console.log("**OUTLINE", siteOutline);
}catch(e) {

}

module.exports = {
  siteMetadata: {
    title: site.title,
    description: site.description,
    introduction: site.introduction,
    permalink: site.permalink, 
    courses: [],
    siteUrl: site.siteUrl,
    site: site,
    githubUrl: 'https://github.com/nodesense',
    codeGithubUrl: 'https://github.com/nodesense',
  },

  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
           {
            resolve: 'gatsby-remark-graph',
            options: {
              // this is the language in your code-block that triggers mermaid parsing
              language: 'mermaid', // default
              theme: 'default' // could also be dark, forest, or neutral
            }
          },
 
          
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    // FIXME: gatsby-plugin-feed failing due to date is not part of front matter
   // `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
       // icon: `content/assets/gatsby-icon.png`,
        icon: `static/icons8-logo.png`,
      },
    },
   // `gatsby-transformer-remark`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`, 
    {
      resolve: 'gatsby-plugin-segment',
      options: {
        writeKey: 'JXEYLKE1T9ptsDlNqeNIMdoOy1Ept8CB',
      },
    },
  ],
};
