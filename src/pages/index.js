import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import Helmet from 'react-helmet';

import { graphql } from 'gatsby'; <link
        rel="shortcut icon"
        type="image/png"
        href="/icon-learnstorybook.png"
        sizes="16x16 32x32 64x64"
      />

import {
  color,
  typography,
  spacing,
  pageMargins,
  pageMargin,
  breakpoint,
} from '../components/shared/styles';

import Hero from '../components/Hero';
import Link from '../components/Link';
import Button from '../components/Button';
import CTA from '../components/CTA';

import {Title,
        Desc, 
        Actions, 
        Pitch,
        Content,
        FigureWrapper,
        Wrapper,
        Question,
        Answer,
        FAQLayout,
        ClickIntercept,
        ChapterTitle,
        ChapterDesc,
        ChapterMeta,
        Chapter,
        Chapters,
        Sections,
        AllChapters
      } from "../components/Segments"


export default ({ data, location }) => {
  console.log("Location ", location)
  console.log(data)

  let {title} = data.site.siteMetadata


let routes = location.pathname
                      .split('/')
                      .filter(word => !!word)

  console.log("route is ", routes)
  let [courseName] = routes

  //let course = data.site.siteMetadata.courses.find(course => course.name == courseName);
  let course = data.site.siteMetadata.courses[0];
  const siteMetadata = data.site.siteMetadata;
  let firstTopic = course.topics[0]; 
 
  return (
    <div>
      <Wrapper>
      <Helmet
      title={`${course.title} | ${title}`}
      meta={[
        {
          name: 'description',
          content: course.description,
        },
      ]}
    >

      <link
        rel="shortcut icon"
        type="image/png"
        href="/icons8-logo.png"
        sizes="16x16 32x32 64x64"
      />

      </Helmet>

        <Content>
          <Pitch>
          
            <Title>{siteMetadata.title}</Title>
            <Desc>
            {siteMetadata.description}
            </Desc>
          </Pitch>

          <FigureWrapper>
            <Hero />
          </FigureWrapper>
        </Content>
      </Wrapper>
      <FAQLayout>
        <Question>Courses</Question>
        <Answer>
          <p>
           {siteMetadata.introduction}
          </p>
        </Answer>
 

        <Sections course={course} data={data} />
   
      </FAQLayout>
    </div>
  );
};

export const query = graphql`
  query CourseQuery {
    site {
      siteMetadata {
        description
        introduction
        title
        siteUrl
        courses {
            name
            title
            description
            sections {
              name
              title
              description
              topics {
                name
                path
                slug
              }
            }
            topics {
              name
              path
              slug
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
