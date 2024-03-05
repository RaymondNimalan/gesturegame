import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from 'fingerpose';

const paperDesciption = new GestureDescription('paper');

//all fingers are not curled
for (let finger of [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
]) {
  paperDesciption.addCurl(finger, FingerCurl.NoCurl, 1.0);
  paperDesciption.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  paperDesciption.addDirection(finger, FingerDirection.DiagonalUpLeft, 1.0);
  paperDesciption.addDirection(finger, FingerDirection.DiagonalUpRight, 1.0);
  paperDesciption.addDirection(finger, FingerDirection.HorizontalLeft, 1.0);
  paperDesciption.addDirection(finger, FingerDirection.HorizontalRight, 1.0);
}
