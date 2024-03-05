//
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

//drawing function
export const drawHand = (predictions, ctx) => {
  //check if prediction exists
  if (predictions.length > 0) {
    //loop through predictions
    predictions.forEach((prediction) => {
      //grab landmarks
      const landmarks = prediction.landmarks;

      //loop through fingers
      for (let j = 0; j < Object.keys(fingerJoints).length; j++) {
        let finger = Object.keys(fingerJoints)[j];
        for (let k = 0; k < fingerJoints[finger].length - 1; k++) {
          //grab adj joint pairs
          const firstJointIndex = fingerJoints[finger][k];
          const secondJointIndex = fingerJoints[finger][k + 1];

          //draw path
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1]
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1]
          );
          ctx.strokeStyle = 'red';
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      //loop through landmarks and draw
      for (let i = 0; i < landmarks.length; i++) {
        const x = landmarks[i][0];
        const y = landmarks[i][1];

        //begin drawing
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 3 * Math.PI);

        //line color
        ctx.fillStyle = 'indigo';
        ctx.fill();
      }
    });
  }
};

export const gameLogic = (playerMove, computerMove) => {
  //check for tie
  if (playerMove === computerMove) {
    return 'tie';
  }

  //check for rock
  if (playerMove === 'rock') {
    if (computerMove === 'paper') {
      return 'computer wins, paper beats rock';
    } else {
      return 'player wins rock beats scissors';
    }
  }

  //check for paper
  if (playerMove === 'paper') {
    if (computerMove === 'scissors') {
      return 'computer wins, scissors beats paper';
    } else {
      return 'player wins, scissors beats paper';
    }
  }

  //check for scissors
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      return 'computer wins, rock beats scissors';
    } else {
      return 'player wins, scissors beats paper';
    }
  }
};
