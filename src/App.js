//import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as fp from 'fingerpose';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { useRef, useState, useEffect } from 'react';
import { drawHand } from './utilities';
import rockDescription from './rockGesture';
import paperDesciption from './paperGesture';
//import scissorsDescription from './scissorsDescription';

function App() {
  const [playerGesture, setPlayerGesture] = useState('');
  const [computerMove, setComputerMove] = useState('');

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //function to pick computers gesture randomly
  const generateComputerMove = () => {
    const moveChoices = ['rock', 'paper', 'scissors'];
    const move = moveChoices[Math.floor(Math.random() * moveChoices.length)];
    return setComputerMove(move);
  };

  //function to run handpose model
  const runHandpose = async () => {
    const net = await handpose.load();
    console.log('Handpose model loaded');
    setInterval(() => {
      detect(net);
    }, 100);
  };
  //function to detect hand, gesture and draw mesh
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
      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          // fp.Gestures.VictoryGesture,
          // fp.Gestures.ThumbsUpGesture,
          rockDescription,
          paperDesciption,
          //scissorsDescription,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          console.log('this is gesture', gesture);
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          console.log('confidence', confidence);
          console.log('maxConfidence', maxConfidence);
          console.log('gesture before set state', gesture.gestures);
          console.log(
            'gesture with highest confidence',
            gesture.gestures[maxConfidence]
          );
          console.log('name', gesture.gestures[maxConfidence].name);
          setPlayerGesture(gesture.gestures[maxConfidence].name);
        }
      }

      //draw mesh
      const ctx = canvasRef.current.getContext('2d');
      drawHand(hand, ctx);
    }
  };
  useEffect(() => {
    runHandpose();
    console.log(playerGesture);
  }, [playerGesture]);

  // runHandpose();

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
