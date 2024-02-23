import * as fp from 'fingerpose';

//import {Finger, FingerCurl, FingerDirection}

const rockGesture = new fp.GestureDescription('rock');

//thumb
rockGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
rockGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 1.0);
``;

for (let finger of [
  fp.Finger.Index,
  fp.Finger.Middle,
  fp.Finger.Ring,
  fp.Finger.Pinky,
]) {
  rockGesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
  rockGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.9);
}

//index
rockGesture.addDirection(fp.Finger.Index, fp.FingerCurl.DiagonalUpLeft, 1.0);
rockGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
);
rockGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
);
rockGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpRight,
  1.0
);

// //middle
// rockGesture.addDescription(fp.Finger.Middle, fp.FingerCurl.FullCurl, 1.0);

// //ring
// rockGesture.addDescription(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0);

// //pinky
// rockGesture.addDescription(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0);

export default rockGesture;
