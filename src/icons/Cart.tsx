import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const Cart = ({size = 24}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.3 5H22l-2 7H8.377M21 16H9L7 3H4m0 5H2m3 3H2m4 3H2m8 6a1 1 0 11-2 0 1 1 0 012 0zm11 0a1 1 0 11-2 0 1 1 0 012 0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
