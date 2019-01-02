import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';

import Header from './Header';
import Footer from './Footer';


import { injectGlobalStyles } from './shared/global';

injectGlobalStyles();

const HeaderWrapper = styled(Header)`
  ${props =>
    props.home &&
    css`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
    `};
`;

const TemplateWrapper = ({ data, children, location }) => (
  <div>
    <Helmet
      title={data? data.site.siteMetadata.title: 'not there'}
      meta={[
        {
          name: 'description',
          content: data?data.site.siteMetadata.description:'description',
        },
      ]}
    >
      <link
        rel="shortcut icon"
        type="image/png"
        href="/icon-learnstorybook.png"
        sizes="16x16 32x32 64x64"
      />

      <link src="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css" rel="stylesheet" />
      <meta property="og:image" content="/opengraph-cover.jpg" />
      <meta name="twitter:image" content="/opengraph-cover.jpg" />
      <meta property="og:url" content={data?data.site.siteMetadata.permalink: ''} />
      <meta property="og:title" content={data?data.site.siteMetadata.title: ''} />
      <meta property="og:description" content={data?data.site.siteMetadata.description:''} />
      <meta name="twitter:title" content={data?data.site.siteMetadata.title:''} />
      <meta name="twitter:description" content={data?data.site.siteMetadata.description:''} />

  
    </Helmet>

    <HeaderWrapper
      title={data?data.site.siteMetadata.title: ''}
      githubUrl={data?data.site.siteMetadata.githubUrl: 'https://github.com/nodesense/react-workshop'}
      inverse={location && location.pathname === '/'}
      home={location && location.pathname === '/'}
    /> 
      
    <div>{children}</div>


    <Footer />
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
