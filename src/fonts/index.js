import { createGlobalStyle } from "styled-components";

import RobotoRegularWoff from "./roboto-v20-latin-regular.woff";
import RobotoRegularWoff2 from "./roboto-v20-latin-regular.woff2";

import RobotoBoldWoff from "./roboto-v20-latin-700.woff";
import RobotoBoldWoff2 from "./roboto-v20-latin-700.woff2";

import RobotoBoldItalicWoff from "./roboto-v20-latin-700italic.woff";
import RobotoBoldItalicWoff2 from "./roboto-v20-latin-700italic.woff2";

const Fonts = createGlobalStyle`
/* roboto-regular - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url(${RobotoRegularWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${RobotoRegularWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700 - latin */
@font-face {
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  src: local(''),
       url(${RobotoBoldWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${RobotoBoldWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* roboto-700italic - latin */
@font-face {
  font-family: 'Roboto';
  font-style: italic;
  font-weight: 700;
  src: local(''),
       url(${RobotoBoldItalicWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${RobotoBoldItalicWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
`;

export default Fonts;
