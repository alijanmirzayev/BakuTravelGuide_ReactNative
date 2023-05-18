import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const SvgHome = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="none"
    viewBox="0 0 23 25"
    {...props}>
    <Path
      // stroke="#E0783E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 11.326c0-.67 0-1.005.086-1.314.077-.273.203-.53.371-.758.19-.258.455-.464.984-.875l7.913-6.154c.41-.32.615-.479.841-.54.2-.054.41-.054.61 0 .226.061.431.22.841.54l7.913 6.154c.529.411.793.617.984.875.168.228.294.485.37.758.087.309.087.644.087 1.314v8.44c0 1.307 0 1.96-.254 2.46-.224.439-.581.796-1.02 1.02-.5.254-1.152.254-2.46.254H4.734c-1.306 0-1.96 0-2.459-.254a2.334 2.334 0 0 1-1.02-1.02C1 21.726 1 21.073 1 19.766v-8.44Z"
    />
  </Svg>
);
export default SvgHome;
