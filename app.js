var AWS = require('aws-sdk');
require('./awsauth.js');
// Import the built-in Node.js filesystem module
var fs = require('fs');
// Create a new AWS Polly object
var polly = new AWS.Polly();

// polly.describeVoices(function (err, data) {
//  if (err) console.log(err, err.stack); // an error occurred
//  else console.log(data); // successful response
// })

var params = {
 OutputFormat: 'mp3',               // You can also specify pcm or ogg_vorbis formats.
 Text: 'Good morning, Trevor.',     // This is where you'll specify whatever text you want to render.
 VoiceId: 'Carla'                   // Specify the voice ID / name from the previous step.
};

var synthCallback = function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response

fs.writeFile('testing.mp3', data.AudioStream, function (err) {
  if (err) {
  console.log('An error occurred while writing the file.');
  console.log(err);
  }
  console.log('Finished writing the file to the filesystem')
  });
};

// Call the synthesizeSpeech() API, with the user-defined parameters, and write the result to a file
polly.synthesizeSpeech(params, synthCallback);
