import * as React from 'react';
import Svg, {G, Defs, Path, Rect} from 'react-native-svg';

export const Password = ({size = 24}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      stroke="#000"
      strokeWidth={3}
      fill="none">
      <G id="SVGRepo_iconCarrier">
        <Defs></Defs>
        <Path d="M24 25.28a3.26 3.26 0 00-1.64 6.07V36h3.32v-4.65a3.28 3.28 0 001.61-2.8v0A3.27 3.27 0 0024 25.28z" />
        <Rect x={7.38} y={17.77} width={33.23} height={25.73} rx={4.32} />
        <Path d="M13.35 17.77v-2.61a10.66 10.66 0 0121.32 0v2.61" />
      </G>
    </Svg>
  );
};
