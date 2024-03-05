import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';

const scissorsDescription = new GestureDescription('scissors');

//thumb, ring and pinky set FullCurl
for (let finger of [Finger.Ring, Finger.Pinky]) {
  scissorsDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  scissorsDescription.addCurl(finger, FingerCurl.FullCurl, 1.0);
  scissorsDescription.addCurl(finger, FingerCurl.HalfCurl, 1.0);
}

//index and middle set to horizontal
for (let finger of [Finger.Index, Finger.Middle]) {
  scissorsDescription.addCurl(finger, FingerCurl.NoCurl, 1.0);
  scissorsDescription.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  scissorsDescription.addDirection(
    finger,
    FingerDirection.HorizontalRight,
    1.0
  );
}

// //Index set to diagonal up
// scissorsDescription.addDirection(
//   Finger.Index,
//   FingerDirection.DiagonalUpLeft,
//   0.7
// );
// scissorsDescription.addDirection(
//   Finger.Index,
//   FingerDirection.DiagonalUpRight,
//   0.7
// );

// //Middle set to diagonal down
// scissorsDescription.addDirection(
//   Finger.Middle,
//   FingerDirection.DiagonalDownLeft,
//   0.7
// );
// scissorsDescription.addDirection(
//   Finger.Middle,
//   FingerDirection.DiagonalDownRight,
//   0.7
// );

//Set pinky

export default scissorsDescription;
