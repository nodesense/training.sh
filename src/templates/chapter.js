import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Helmet from 'react-helmet';

import Link from '../components/Link';
import CTA from '../components/CTA';
import Button from '../components/Button';
import Subheading from '../components/Subheading';
import LogoTwitter from '../components/LogoTwitter';
 
import {
  color,
  formatting,
  typography,
  pageMargins,
  breakpoint,
} from '../components/shared/styles';

const Heading = styled(Subheading)`
  display: block;
  font-size: ${typography.size.s1}px;
  line-height: 1rem;
  color: ${color.medium};

  margin-bottom: 0.5rem;
  @media (min-width: ${breakpoint * 1}px) {
    margin-bottom: 1rem;
  }
`;

const DocsItem = styled.li`
  a.selected {
    font-weight: ${typography.weight.extrabold};
  }
`;

const DocsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
`;

const Sidebar = styled.div`
  flex: 0 1 240px;
  padding-right: 20px;

  @media (max-width: ${breakpoint - 1}px) {
    flex: none;
    margin: 1rem 0 2rem;
    width: 100%;
    border-bottom: 1px solid ${color.mediumlight};
  }

  ${DocsList} {
    list-style: none;
    padding: 0;
    margin: 0 0 0 0;
    position: relative;

    @media screen and (min-width: ${breakpoint}px) {
      margin: 0 0 2rem 24px;
      &:after {
        position: absolute;
        top: 12px;
        right: auto;
        bottom: 12px;
        left: -20px;
        width: auto;
        height: auto;
        border-left: 1px solid ${color.light};
        content: '';
        z-index: 0;
      }
    }

    @media (max-width: ${breakpoint - 1}px) {
      margin-bottom: 1rem;

      li {
        display: inline-block;
        margin-right: 15px;
      }
    }

    a {
      line-height: 1rem;
      padding: 8px 0;
      line-height: 1.5;
      position: relative;
      z-index: 1;

      @media screen and (min-width: ${breakpoint}px) {
        &:after {
          position: absolute;
          top: 15px;
          right: auto;
          bottom: auto;
          left: -23px;
          width: auto;
          height: auto;
          background: ${color.mediumlight};
          box-shadow: white 0 0 0 4px;
          height: 8px;
          width: 8px;
          border-radius: 1em;
          text-decoration: none !important;
          content: '';
        }

        &.selected:after {
          background: ${color.primary};
        }
      }
    }
  }
`;

const Markdown = styled.div`
  margin-bottom: 3rem;
`;

const Content = styled.div`
  ${formatting};
  flex: 1;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  ${'' /* Allows Flexbox to overflow  */};
  min-width: 0;
`;

const DocsWrapper = styled.div`
  ${pageMargins};
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoint}px) {
    flex-direction: row;
    padding-top: 4rem;
    padding-bottom: 3rem;
  }
`;

const NextChapterSubtitle = styled.div`
  display: block;
  margin-top: 0.5rem;
  font-size: 18px;
  line-height: 1.65;
  font-weight: ${typography.weight.regular};
`;

const GithubLink = styled(Link)`
  font-weight: ${typography.weight.bold};
`;
const GithubLinkWrapper = styled.div`
  margin-top: 3rem;
  text-align: center;
`;

const CTAMessage = styled.div`
  overflow: hidden;
`;

const CTAWrapper = styled.a`
  font-weight: ${typography.weight.extrabold};
  font-size: ${typography.size.s3}px;
  @media screen and (min-width: ${breakpoint}px) {
    font-size: ${typography.size.m1}px;
  }
  line-height: 1.2;

  background: ${color.app};
  color: ${color.dark};
  border-radius: 4px;
  padding: 30px 20px;
  margin-bottom: 1rem;
  display: block;
  transition: all 150ms ease-out;
  text-decoration: none;
  overflow: hidden;

  display: flex;
  align-items: center;

  &:hover {
    background: ${darken(0.02, color.app)};
  }

  ${CTAMessage} {
    flex: 1;
  }

  svg {
    flex: 0 1 40px;
    height: 40px;
    margin-left: 10px;
    margin-right: 30px;
  }
`;

const Pagination = styled(CTA)`
  margin-top: 3rem;
`;

export default ({ data, location }) => {
  console.log("***Location ", location)
  console.log("***Data", data)

  let routes = location.pathname
                       .split('/')
                       .filter(word => !!word)

  console.log("route is ", routes)

  let [courseName, sectionName, topicName] = routes

  const post = data.markdownRemark;
  const { title, description } = post.frontmatter;
 

  const { slug } = post.fields;
  const { githubUrl, codeGithubUrl } = data.site.siteMetadata;
  const githubFileUrl = `${githubUrl}/blob/master/content/${slug.replace(/\//g, '')}.md`;

  let course = data.site.siteMetadata.courses.find(course => course.name == courseName)
   
  
  const topicIndex = course.topics.findIndex(topic => topic.slug == slug)
  const nextTopic = course.topics[topicIndex + 1]

  console.log("Next topic is ", topicIndex, nextTopic);

  return (
    <DocsWrapper>
      <Helmet
        title={`${title} | ${data.site.siteMetadata.title}`}
        meta={[{ name: 'description', content: description }]}
      />
      <Sidebar>
        <Heading>Table of Contents</Heading>
        <DocsList>
          
          {course.topics.map(({ slug, title, path }) => (
            <DocsItem key={slug}>
              <Link
                isGatsby
                strict
                className={location.pathname !== path ? 'tertiary' : 'selected'}
                to={path}
              >
                {title}
              </Link>
            </DocsItem>
          ))}
        </DocsList>
      </Sidebar>
      <Content>

        <div dangerouslySetInnerHTML={{ __html: post.html }} />
  
        {nextTopic && (
          <Pagination
            text={
              <div>
                {nextTopic.title}
                <NextChapterSubtitle>{nextTopic.description}</NextChapterSubtitle>
              </div>
            }
            action={
              <Link isGatsby to={nextTopic.path}>
                <Button small primary>
                  Next chapter
                </Button>
              </Link>
            }
          />
        )}


      </Content>
    </DocsWrapper>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        description
      }
      fields {
        slug
      }
    }
    site {
      siteMetadata {
        title
        githubUrl
        codeGithubUrl
        courses {
            name
            title
            description
            topics {
              name
              path
              slug
              title
              description
            }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            tocTitle
            title
            description
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
