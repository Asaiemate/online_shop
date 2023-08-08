import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const User = ({size = 100}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        stroke="#000"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </G>
    </Svg>
  );
};
