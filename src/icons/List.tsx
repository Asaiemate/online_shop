import React from 'react';
import Svg, {Path} from 'react-native-svg';

export const List = ({size = 24, color = 'black'}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 6l13 .001m-13 6h13m-13 6h13M3.5 6h.01m-.01 6h.01m-.01 6h.01M4 6a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0zm0 6a.5.5 0 11-1 0 .5.5 0 011 0z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
