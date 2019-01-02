const path = require('path');
const yaml = require('js-yaml');
const fs   = require('fs');

const { createFilePath } = require(`gatsby-source-filesystem`);

const config = require("./gatsby-config");

exports.onCreateNode = ({ node, getNode, actions }) => {
  //console.log("Node ", node)
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions;
    const slug = createFilePath({
      node,
      getNode,
      basePath: `content`,
    });
    console.log("SLUG IS ", slug, node.internal.type);
    createNodeField({ node, name: `slug`, value: slug });
  }
};

function stripOrderingNumbers(str) {
  return str.replace(/(\d+){3}\./g, '');
}

exports.createPages = ({ graphql, actions }) => {
  console.log("CREATE PAGES")
  const { createPage } = actions;

  return new Promise(resolve => {
    graphql(`
      {
        allMarkdownRemark (
          sort: { order:ASC, fields: fileAbsolutePath },
          filter: { fileAbsolutePath: { regex: "/\/content\//" } }
        )
        {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        //console.log("NODE ", node);
        //console.log("PATH ", node.fields.slug);

        //console.log("STRIP ", stripOrderingNumbers(node.fields.slug))
        let frontmatter = node.frontmatter

        let stripSlug = stripOrderingNumbers(node.fields.slug)

        let tokens = stripSlug
        .split('/')
        .filter(word => !!word)
      
        //console.log("Tokens ", tokens)
        let [courseName, sectionName, topicName] = tokens

        let stripPaths = node.fields.slug.split('/').filter(word => !!word)

        let [courseDirectoryName, sectionDirectoryName, topicDirectoryName] = stripPaths;
        console.log("PATH****", stripPaths);

          

        if (tokens.length >= 2) {
          // let courseName = tokens[0]
          // let sectionName = tokens[1]
          // let topicName = tokens[2]
          
          // console.log("course name ", courseName)
          // console.log("section name ", sectionName)
          // console.log("topic name ", topicName)

          let courses = config.siteMetadata.courses
          let course = courses.find(course => course.name == courseName);
          if (!course) {
           
              course = yaml.safeLoad(fs.readFileSync(`./content/${courseName}/course.yml`, 'utf8'));
              console.log("**", course);
             
             
              course.sections = course.sections || []
              course.topics = course.topics || []
              courses.push(course)
          }
 
          

          let section = course.sections.find( section => section.name == sectionName)

          if (!section) {
         
            try{
              const sectionInfoPath = `./content/${courseDirectoryName}/${sectionDirectoryName}/section.yml`;
              console.log('section info path ', sectionInfoPath);
              section = yaml.safeLoad(fs.readFileSync(sectionInfoPath, 'utf8'));

              section.topics = section.topics || [];
            console.log("**", section);
            }catch(ex) {
              console.error(ex);
            }
 
            console.log('---- section is ', section);

            course.sections.push(section)
          }

          let topic = {
            name: topicName,
            path: stripSlug,
            slug: node.fields.slug,
            title: frontmatter.title,
            description: frontmatter.description
          }
          section.topics.push(topic)
          course.topics.push(topic)
        }

        createPage({
          path: stripSlug,
          component: path.resolve(`./src/templates/chapter.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug,
            name: "Hello",
            courseName
          },
        });
      });
 
      resolve();
    });
  });
};
