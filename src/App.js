//import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as fp from 'fingerpose';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { useRef, useState, useEffect } from 'react';
import { drawHand } from './utilities';

function App() {
  const [emoji, setEmoji] = useState(null);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //function to run handpose model

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded');
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //makes detections
      const hand = await net.estimateHands(video);
      console.log('detected hand', hand);

      //detect gestures
      // if (hand.length > 0) {
      //   const GE = new fp.GestureEstimator([fp.Gestures.VictoryGesture]);
      //   const gesture = await GE.estimate(hand[0].landmarks, 8);
      //   console.log(gesture);
      //   if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
      //     const confidence = gesture.gestures.map(
      //       (prediction) => prediction.confidence
      //     );
      //     const maxConfidence = confidence.indexOf(
      //       Math.max.apply(null, confidence)
      //     );
      //     fp.setEmoji(gesture.gestures[maxConfidence].name);
      //     console.log(fp.emoji);
      //   }
      // }

      //draw mesh
      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  };
  // useEffect(() => {
  //   runHandpose();
  // }, []);

  runHandpose();

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam
          ref={webcamRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        {/* <img src={logo} className='App-logo' alt='logo' /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
