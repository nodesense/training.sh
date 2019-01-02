import React from 'react';

import styled from 'styled-components';

import Link from './Link';
import LogoChroma from './LogoChroma';
import { color, typography, pageMargins } from './shared/styles';

const FooterWrapper = styled.footer`
  ${pageMargins};
  text-align: center;
  padding: 3rem 0;
  color: ${color.mediumdark};
`;

const FooterLink = styled(Link)`
  font-weight: ${typography.weight.bold};
`;

const Logo = styled(LogoChroma)`
  height: 26px;
  width: auto;
  margin-bottom: 1rem;
`;

const Footer = ({ ...props }) => (
  <FooterWrapper {...props}>
    <a href="http://nodesense.ai" target="_blank" rel="noopener noreferrer">
      <Logo />
    </a>
    <br />
    Made by{' '}
    <FooterLink className="secondary" href="http://nodesense.ai" target="_blank">
      NodeSense.AI
    </FooterLink>{' '}
    and <a href="https://in.linkedin.com/in/gopalakrishnansubramani">Gopalakrishnan Subramani</a>
  </FooterWrapper>
);

export default Footer;
