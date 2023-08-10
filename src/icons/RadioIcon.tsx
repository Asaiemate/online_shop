import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';

export const RadioIcon = ({size = 24, checked = true}) => {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24" fill="none">
      <G fill="#080341">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19.5a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0 1.5a9 9 0 100-18 9 9 0 000 18z"
          fill="#080341"
        />
        {checked ? <Circle cx={12} cy={12} r={5.25} /> : null}
      </G>
    </Svg>
  );
};
