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
      } from "./Segments"


export default ({ data, courseName }) => {
  console.log(data)

  let course = data.site.siteMetadata.courses[courseName];


  const tocEntries = course.sections[0].topics.map(topic => {
    const node = data.allMarkdownRemark.edges
      .map(e => e.node)
      .find(({ fields }) => fields.slug === topic.slug);

    if (!node) {
      throw new Error(
        `Didn't find chapter for slug:"${topic.slug}" -- is the config's TOC in sync with the chapters?`
      );
    }
    const { tocTitle, title, description } = node.frontmatter;

    return { topic, slug: topic.slug, title: tocTitle || title, description };
  });
 
  return (
    <div>
      <Wrapper>
        <Content>
          <Pitch>
            <Title>Scala Tutorial</Title>
            <Desc>
              Learn to build Angular application from start to end
            </Desc>

            <Actions>
              <Link isGatsby to={data.site.siteMetadata.toc[0]}>
                <Button inverse>Get started</Button>
              </Link>
              <Link href="https://GitHub.com/hichroma/learnstorybook.com" target="_blank">
                <Button outline>View on GitHub</Button>
              </Link>
            </Actions>
          </Pitch>

          <FigureWrapper>
            <Hero />
          </FigureWrapper>
        </Content>
      </Wrapper>
      <FAQLayout>
        <Question>Why a Storybook tutorial?</Question>
        <Answer>
          <p>
            Learn Storybook aims to teach tried-and-true patterns for component development using
            Storybook. You&rsquo;ll walk through essential UI component techniques while building a
            UI from scratch in React (Vue and Angular coming soon).
          </p>
          <p>
            The info here is sourced from professional teams, core maintainers, and the awesome
            Storybook community. Rather than trying to cover every edge case –which can take
            forever!– this tutorial recommends best practices.{' '}
            <Link
              className="primary"
              href="https://blog.hichroma.com/introducing-learnstorybook-com-2a43cd33edf5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the announcement »
            </Link>
          </p>
        </Answer>

        <img
          src="/logo-storybook.svg"
          style={{ width: '50%', margin: '3rem auto', display: 'block' }}
          alt="Storybook logo"
        />
        <Question>What is Storybook?</Question>
        <Answer>
          <p>
            <Link
              className="primary"
              href="https://storybook.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Storybook
            </Link>{' '}
            is the most popular UI component development tool for React, Vue, and Angular. It helps
            you{' '}
            <strong>
              develop and design UI components outside your app in an isolated environment
            </strong>.
          </p>
          <p>
            Professional developers at Airbnb, Dropbox, and Lonely Planet use Storybook to build
            durable documented UIs faster.
          </p>
        </Answer>

         

        <Sections course={course} data={data} />
 
        <Question>Who&rsquo;s this for?</Question>
        <Answer>
          <p>
            This tutorial is for developers of all skill levels that are new to Storybook. If you
            follow along, you’ll be able to grasp the core concepts of isolated UI component
            development and build a full UI in Storybook without issue.
          </p>
          <p>
            We assume that you’re familiar with basic JavaScript, components, and web development.
            If you already use Storybook, checkout the{' '}
            <Link href="https://storybook.js.org/basics/introduction/">official docs</Link> for API
            documentation or visit{' '}
            <Link href="https://blog.hichroma.com/" target="_blank">
              Chroma on Medium
            </Link>{' '}
            for more resources like this.
          </p>
        </Answer>

        <Question>How long does it take?</Question>
        <Answer>
          <p>
            Developer time is precious. This tutorial covers the key parts of Storybook to get you
            started as quickly as possible. Finish it in less than two hours. If you&rsquo;re an
            experienced developer even shorter. Our aim is to be the most efficient way to onboard
            to Storybook.
          </p>
        </Answer>

        <CTA
          text={`Let's learn Storybook!`}
          action={
            <Link isGatsby to={data.site.siteMetadata.toc[0]}>
              <Button primary>Start tutorial</Button>
            </Link>
          }
        />
      </FAQLayout>
    </div>
  );
};
