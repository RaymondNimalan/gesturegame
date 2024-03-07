//import logo from './logo.svg';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as fp from 'fingerpose';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { useRef, useState, useEffect } from 'react';
import { drawHand } from './utilities';
import rockDescription from './rockGesture';
import paperDescription from './paperGesture';
import scissorsDescription from './scissorsGesture';

function App() {
  const [playerGesture, setPlayerGesture] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [gameOutcome, setGameOutcome] = useState('');

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //function to handle choose gesture button
  const handleChooseGesture = async () => {
    await generateComputerMove();
    await runHandpose();
  };

  //function to run game logic
  const handleStartGame = () => {
    console.log('game started in handler');
    console.log('copmuter move', computerMove);
    console.log('player move', playerGesture);
    const outcome = gameLogic(playerGesture, computerMove);
    console.log('outcome to the game:', outcome[1]);
    setGameOutcome(outcome[1]);
    if (outcome[0] === 1) {
      setPlayerScore(playerScore + 1);
    }
    if (outcome[0] === 2) {
      setComputerScore(computerScore + 1);
    }
  };

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

    const detectInterval = setInterval(() => {
      detect(net);
    }, 500);

    setTimeout(() => {
      clearInterval(detectInterval);
      console.log('detect function stopped after 10 sec');
    }, 20000);
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
          paperDescription,
          scissorsDescription,
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
    // runHandpose();
    console.log(playerGesture);
  }, [playerGesture]);

  // runHandpose();

  return (
    <div className='App'>
      <div className='nav-container'>
        <div className='nav'>
          <img alt='' />
          <div className='nav-title'>Rock, Papers, Sissors, TensorFlow!</div>
        </div>
      </div>
      <div
        className='start-button'
        onClick={() => {
          handleChooseGesture();
        }}
      >
        Choose Gesture
      </div>
      <div
        className='start-button'
        onClick={() => {
          handleStartGame();
        }}
      >
        Start Game
      </div>
      <div className='timer-container'>
        <div className='timer'>
          <div className='hours-column'>
            <div className='column'>
              <div className='hours-timer'>00</div>
              <div className='hours-title'>Seconds</div>
            </div>
          </div>
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
        </div>
        <div className='instructions'>
          Choose and hold your gesture for 30 seconds
        </div>
        <div className='webcam-container'>
          <Webcam ref={webcamRef} className='webcam' />
          <canvas ref={canvasRef} className='hand-map' />
        </div>
        <div className='score-container'>
          <div className='computer-score'>
            <div className='score-title'>Computer</div>
            <div className='score-counter'>0</div>
          </div>
          <div className='score-progress-container'>
            <div className='score-progress'></div>
          </div>
          <div className='computer-score'>
            <div className='score-title'>Computer</div>
            <div className='score-counter'>0</div>
          </div>
          <div className='score-progress-container'>
            <div className='score-progress'></div>
          </div>
          <div className='score-counter-2'>0</div>
        </div>
      </div>
    </div>
  );
}

export default App;
