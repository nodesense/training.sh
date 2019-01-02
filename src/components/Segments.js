import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import {
  color,
  typography,
  spacing,
  pageMargins,
  pageMargin,
  breakpoint,
} from './shared/styles';

import Hero from './Hero';
import Link from './Link';
import Button from './Button';
import CTA from './CTA';

export const Title = styled.h1`
  color: ${color.lightest};
  font-weight: ${typography.weight.extrabold};
  font-size: ${typography.size.l2}px;
  line-height: 1;
  margin-bottom: 0.2em;
  text-shadow: rgba(0, 135, 220, 0.3) 0 1px 5px;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: 56px;
  }

  @media (min-width: ${breakpoint * 2}px) {
    font-size: 88px;
  }
`;

export const Desc = styled.div`
  color: ${color.lightest};
  font-size: ${typography.size.m1}px;
  line-height: 1.4;
  margin-bottom: 1em;
  text-shadow: rgba(0, 135, 220, 0.3) 0 1px 5px;

  @media (min-width: ${breakpoint * 1}px) {
    font-size: ${typography.size.m2}px;
  }

  @media (min-width: ${breakpoint * 2}px) {
    font-size: ${typography.size.m3}px;
  }
`;

export const Actions = styled.div`
  > * {
    margin-right: 20px;
    margin-bottom: 12px;
  }
`;

export const Pitch = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;

  @media (min-width: ${breakpoint}px) {
    flex: 0 1 55%;
    padding-right: 3rem;
  }
`;

export const Content = styled.div`
  ${pageMargins};
  display: flex;
  flex: 1;
  text-align: center;
  flex-direction: column-reverse;

  padding-top: 5rem;
  padding-bottom: 5rem;

  @media (min-width: ${breakpoint}px) {
    padding-top: 10rem;
    padding-bottom: 8rem;
    flex-direction: row;
    text-align: left;
    display: flex;
    align-items: center;
    flex: 1;
  }
`;

export const FigureWrapper = styled.div`
  flex: 1;

  svg {
    display: block;
    height: auto;
    margin: 0 auto;
    width: 80%;
    @media (min-width: ${breakpoint}px) {
      width: 100%;
    }
  }
`;

export const Wrapper = styled.div`
  background-color: #26c6da;
  background-image: linear-gradient(14deg, #26c6db 0%, #2694db 100%);

  @media (min-width: ${breakpoint}px) {
    min-height: 75vh;
    display: flex;
    align-items: center;
  }
`;

export const Question = styled.h3`
  font-size: ${typography.size.m3}px;
  font-weight: ${typography.weight.extrabold};
`;

export const Answer = styled.div`
  margin-bottom: 3rem;
  font-size: 18px;
  line-height: 1.65;

  p:first-child {
    margin-top: 0.5em;
  }

  p {
    margin: 1em 0;
  }

  img {
    margin: 1em 0;
    max-width: 100%;
    display: block;
  }
`;

export const FAQLayout = styled.div`
  padding: 4rem ${spacing.padding.medium}px 1rem;
  @media (min-width: ${breakpoint * 1}px) {
    margin: 0 ${pageMargin * 3}%;
  }
  @media (min-width: ${breakpoint * 2}px) {
    margin: 0 ${pageMargin * 4}%;
  }
`;

export const ClickIntercept = styled(Link)`
  position: absolute;
  cursor: pointer;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export const ChapterTitle = styled.div`
  font-size: ${typography.size.m1}px;
  font-weight: ${typography.weight.extrabold};
  line-height: 1;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
`;

export const ChapterDesc = styled.div`
  line-height: 1.5;
  color: ${color.dark};
`;

export const ChapterMeta = styled.div`
  display: block;
  overflow: hidden;
`;

export const Chapter = styled.li`
  background: ${color.app};
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 20px 30px;
  position: relative;

  &:hover {
    background: ${darken(0.02, color.app)};
  }

  &:before {
    float: left;
    vertical-align: top;
    content: counter(counter);
    counter-increment: counter;
    font-size: ${typography.size.m3}px;
    line-height: 40px;
    font-weight: ${typography.weight.bold};
    color: ${color.mediumdark};
    margin-right: 30px;
    margin-top: 8px;
  }
`;

export const Chapters = styled.ol`
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  counter-reset: counter;
`;


export function AllChapters({section, data}) {

  const tocEntries = section.topics.map(topic => {
    const node = data.allMarkdownRemark.edges
      .map(e => e.node)
      .find(({ fields }) => fields.slug === topic.slug);

    if (!node) {
      throw new Error(
        `Didn't find chapter for slug:"${topic.slug}" -- is the config's TOC in sync with the chapters?`
      );
    }
    const { tocTitle, title, description } = node.frontmatter;

    return {topic, slug: topic.slug, title: tocTitle || title, description };
  });

  return (
    <Chapters>
      {tocEntries.map(({topic,  slug, title, description }) => (
      <Chapter key={slug}>
                <ClickIntercept isGatsby className="primary" to={topic.path} />
                <ChapterMeta>
                  <ChapterTitle>{title}</ChapterTitle>
                  <ChapterDesc>{description}</ChapterDesc>
                </ChapterMeta>
      </Chapter>
       ))}
    </Chapters>
  )

} 

export function Sections( {course, data}) {
  return (
    <div>
       {course.sections.map(section => (
             <div>
       <Question>{section.title}</Question>
       <p>{section.description}</p>
        <Answer>
           <AllChapters section={section} data={data} />
        </Answer>
         </div>
          ))}
    </div>

  )
}