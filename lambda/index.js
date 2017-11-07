const Alexa = require('alexa-sdk');
const APP_ID ='amzn1.ask.skill.940fbbcb-1ed1-4f11-87a3-28abce671a3f';
const TOOL_STATES = {
  ROOT: '_ROOTMODE',
  ROOT_HELP: '_ROOTHELPMODE',
  PASSIVE_VALUE: '_PASSIVEVALUEMODE',
};

const languageString = {
  'en': {
    'translation': {
      'SKILL_NAME': 'Electrical Engineering Tools',
      'START_UNHANDLED': 'Welcome, pick a tool from the electrical engineering toolbox',
      'ROOT_HELP': 'Say the name of a tool or ask an electrical engineering question directly' +
        ', for example, what is the value of a resistor with brown black orange gold?',
      'ROOT_HELP_REPROMPT': 'Some of the tools you can choose from include passive value ' +
        'calculator and filter calculator. Say \'list all tools\' to hear about all available ' +
        'features'
    }
  }
};

const newSessionHandlers = {
  'AMAZON.HelpIntent': function () {
    this.handler.state = TOOL_STATES.ROOT_HELP;
    this.emitWithState('rootHelp');
  },
  'Unhandled': function() {
    const speechOutput = this.t('START_UNHANDLED');
    this.response.speak(speechOutput).listen(speechOutput);
    this.emit(':responseReady');
  },
};

const rootHelpStateHandlers = Alexa.CreateStateHandler(TOOL_STATES.ROOT_HELP, {
  'rootHelp': function () {
    const speechOutput = this.t('ROOT_HELP');
    const speechReprompt = this.t('ROOT_HELP_REPROMPT');
    this.response.speak(speechOutput).listen(speechReprompt);
    this.emit(':responseReady');
  },
});

exports.handler = function (event, context) {
  try {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandlers, rootHelpStateHandlers);
    alexa.execute();
  } catch (e) {
    context.fail("Exception: " + e);
  }


};
