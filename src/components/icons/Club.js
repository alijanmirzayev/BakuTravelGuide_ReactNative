import * as React from 'react';
import Svg, {Path, Defs, Pattern, Use, Image} from 'react-native-svg';
const SvgClub = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 37 37"
    {...props}>
    <Path fill="url(#Club_svg__a)" d="M.5 36.52h36v-36H.5v36Z" />
    <Defs>
      <Pattern
        id="Club_svg__a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox">
        <Use xlinkHref="#Club_svg__b" transform="scale(.01563)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="Club_svg__b"
        width={64}
        height={64}
      />
    </Defs>
  </Svg>
);
export default SvgClub;
