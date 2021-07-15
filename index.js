const speakBtn = document.getElementById("speakBtn");
const img = document.getElementById("robotImg");
// SpeechRecognition
speakBtn.addEventListener("click", speakOutLoud);
const alreadyAskedQuestionIndex = [];
const answers = [];

// SpeechRecognition

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

// AI

const SpeechSynthesisUtterance =
  window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

const utterance = new SpeechSynthesisUtterance();
const speechSynthesis = window.speechSynthesis || window.webkitspeechSynthesis;

// basicQuestions.map(question=> speakOutLoud(question));

// The action of saying or expressing something aloud..

function observer(responseFromBot, index, isQuestion) {
  const recognition = new SpeechRecognition();
  recognition.start();
  recognition.onstart = function () {
    console.log("Observing what you are speaking...");
    img.setAttribute("src", "./robot-observe.gif");
  };

  recognition.onresult = function (e) {
    const resultIndex = e.resultIndex;

    const { transcript } = e.results[resultIndex][0];
    console.log("what I told", transcript, 'FOR',responseFromBot, index);
    if (!checkingWhetherAskingQuestion(transcript)){
      if(isQuestion){
      answers.push({
        question: responseFromBot,
        answer: transcript,
      });
      duplicateQuestions.splice(index, 1);
      console.log('answer');
    }
    }else{
      console.log('not answer');
    }
    speakOutLoud(transcript);
  };

  recognition.onsoundend = function() {
    // speakOutLoud('bye');
  }
}

function retrivingPersonalInfo(responseFromUser) {
  let splitingUserQuestion = responseFromUser.toLowerCase().split(" ");
  let answer;
  let demoQuestionSet = basicQuestions.find((response) =>
    response.keyword.some((eachKeyword) =>
      splitingUserQuestion.find((split) => split.includes(eachKeyword))
    )
  );
  console.log(demoQuestionSet);
  if (demoQuestionSet && demoQuestionSet.question) {
    console.log("com0");
    answer = answers.find((a) => a.question.includes(demoQuestionSet.question));
  }

  if (demoQuestionSet === undefined)
    answer = {
      answer:
        "Wow, that's very interesting question. Let me add it to my dictionary",
    };
  else if (answer === undefined)
    answer = {
      answer: "I have this question in my dictionary. But, I have not asked it",
    };

  console.log(answer);
  return answer;
}
const getUnaksedQuestions = () => {
  let index = Math.floor(Math.random() * duplicateQuestions.length);
  if (!duplicateQuestions.length)
    return ["Okay. I am almost done with you. You may ask"];
  return [duplicateQuestions[index].question, index];
};

const checkingWhetherAskingQuestion = (responseFromUser) =>
  responseFromUser.length &&
  questionWords.find((questionWord) =>
    responseFromUser.toLowerCase().includes(questionWord)
  );

function speakOutLoud(responseFromUser = "") {
  img.setAttribute("src", "./robot-reply.gif");
  let whatToAsk;
  let index;
  let quit = false;
  let isQuestion;
  if (checkingWhetherAskingQuestion(responseFromUser)) {
    whatToAsk = retrivingPersonalInfo(responseFromUser);
    console.log(whatToAsk);
    whatToAsk = whatToAsk.answer;
    isQuestion = false;
  } else if (
    responseFromUser.length &&
    quitConversationWords.find((word) =>
      word.toLowerCase().includes(responseFromUser)
    )
  ) {
    whatToAsk = "Why baby are you not happy with talking with me";
    isQuestion = false;
    // quit = true;
  } else if (
    responseFromUser.length &&
    confrimationWords.find((word) =>
      word.toLowerCase().includes(responseFromUser)
    )
  ) {
    whatToAsk = "Okay bye. You will definitely miss me. Go and jerk off";
    quit = true;
    img.setAttribute("src", "./robot-start.gif");
    isQuestion = false;
  } else {
    [whatToAsk, index] = getUnaksedQuestions();
    isQuestion = true;
  }
  /* else {
    whatToAsk = "Why baby are you not happy with talking with me";
  } */
  console.log("Asking", whatToAsk, index);
  utterance.volume = 1; // 100%
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.text = whatToAsk;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);

  utterance.onend = function (event) {
    if (!quit) observer(whatToAsk, index, isQuestion);
  };
}

/* const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

document.body.onclick = function () {
  recognition.start();
  // console.log('Ready to receive a color command.');
};
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

recognition.onnomatch = function () {
  console.log("Speech not recognized");
};
recognition.onresult = function (event) {
  console.log(event.results);
  var color = event.results[0][0].transcript;
  console.log("Result received: " + color + ".");
};

recognition.onsoundstart = function () {
  console.log("Some sound is being received");
};
recognition.onsoundend = function () {
  console.log("Sound has stopped being received");
};

recognition.onspeechstart = function () {
  console.log("Speech has been detected");
};
recognition.onspeechend = function () {
  recognition.stop();
  console.log("Speech recognition has stopped.");
};

recognition.onstart = function () {
  console.log("Speech recognition service has started");
}; */
