function defaultJoke() {
  const errorMessages = [`The brower has determined that you are not funny enough to appreciate this joke`, `Operation completed, but that doesn't mean it's error free. Better luck next time.`, `Something happened.`, `You did something. Press the button below to undo what you did`,`Opps! Looks like there was an error. Here's a joke for you: 'My partner accused me of being immature. I told them to get out of my fort.'`, `WHAT DID YOU DO??? Just kidding. Press the button below to get a real joke.`, `Which country’s capital has the fastest-growing population? Ireland. Every day it’s Dublin.`, `How did the hipster burn their tongue? They drank their coffee before it was cool.`, `Why did the developer go broke? Because he used up all his cache.`, `"Knock, knock. Who's there?" very long pause..."Java."`];

  let n = Math.floor(Math.random() * 10);

  return errorMessages[n];
};


module.exports = { defaultJoke }