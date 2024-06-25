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
    console.log('in game logic', playerMove, computerMove);
    if (playerMove === computerMove) {
        return [0, 'Tie!'];
    }

    //check for rock
    if (playerMove === 'rock') {
        if (computerMove === 'paper') {
            return [2, 'Computer wins!', 'Paper beats Rock'];
        } else {
            return [1, 'Player wins!', 'Rock beats Scissors'];
        }
    }

    //check for paper
    if (playerMove === 'paper') {
        if (computerMove === 'scissors') {
            return [2, 'Computer wins!', 'Scissors beats Paper'];
        } else {
            return [1, 'Player wins!', 'Paper beats Rock'];
        }
    }

    //check for scissors
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            return [2, 'Computer wins!', 'Rock beats Scissors'];
        } else {
            return [1, 'Player wins!', 'Scissors beats Paper'];
        }
    }
    console.log('end of game');
};

export const instructions = [''];
