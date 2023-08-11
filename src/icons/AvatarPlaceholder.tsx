import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const AvatarPlaceholder = ({size = 24}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 31 31" strokeWidth={1}>
      <Path
        d="M572.138 221.245a15.738 15.738 0 00-21.065-.253l-1.322-1.5a17.738 17.738 0 0123.741.28z"
        transform="translate(-546.269 -195.397)"
      />
      <Path
        d="M561.464 204.152a4.96 4.96 0 11-4.96 4.96 4.966 4.966 0 014.96-4.96m0-2a6.96 6.96 0 106.96 6.96 6.96 6.96 0 00-6.96-6.96z"
        transform="translate(-546.269 -195.397)"
      />
      <Path
        d="M561.562 197.4a13.293 13.293 0 11-13.293 13.293 13.308 13.308 0 0113.293-13.293m0-2a15.293 15.293 0 1015.293 15.293 15.293 15.293 0 00-15.293-15.293z"
        transform="translate(-546.269 -195.397)"
      />
    </Svg>
  );
};
