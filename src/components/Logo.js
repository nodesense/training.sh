import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color } from './shared/styles';

const Svg = styled.svg`
  display: inline-block;
  vertical-align: middle;

  .learnstorybook-text {
    fill: ${props => (props.inverse ? color.lightest : color.darker)};
  }

  .learnstorybook-logo {
    fill: ${props => (props.inverse ? color.lightest : color.primary)};
  }
`;

function Logo({ inverse, ...props }) {
  return (
    <div>
     <img src="/icons8-logo.png" />
     <h2>Training.SH</h2>
     </div>
  );
}

Logo.propTypes = {
  inverse: PropTypes.bool,
};

Logo.defaultProps = {
  inverse: false,
};

export default Logo;
