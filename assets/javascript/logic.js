  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCiPJZmYSw2y-W3w1cNBeqN7AbhQSe6Sfg",
    authDomain: "train-schedule-activity.firebaseapp.com",
    databaseURL: "https://train-schedule-activity.firebaseio.com",
    projectId: "train-schedule-activity",
    storageBucket: "",
    messagingSenderId: "1099022891347"
  };

  firebase .initializeApp ( config ) ;
  var database = firebase .database ();

  //Add Train schedule to database
  $ ( "#add-train-btn" ) .on ( "click" , function ( event ) {

      event .preventDefault () ;

      var trainInput = $ ( "#train-input" ) .val() .trim() ;
      var destinationInput = $ ( "#destination-input" ) .val() .trim() ;
      var firstInput = $ ( "#first-input" ) .val() .trim() ;
      var frequencyInput = $ ( "#frequency-input" ) .val() .trim() ;

      var newTrain = {
          train : trainInput ,
          destination : destinationInput ,
          first : firstInput ,
          frequency : frequencyInput
      } ;

      database .ref() .push ( newTrain ) ;

      alert ("Train added to schedule.") ;

      $ ( "#train-input" ) .val( "" ) ;
      $ ( "#destination-input" ) .val( "" ) ;
      $ ( "#first-input" ) .val( "" ) ;
      $ ( "#frequency-input" ) .val( "" ) ;

  } ) ;

  //Log Train schedule on page
  database .ref () .on ("child_added" , function ( childSnapshot ) {

    var trainInput = childSnapshot .val() .train ;
    var destinationInput = childSnapshot .val() .destination ;
    var firstInput = childSnapshot .val() .first ;
    var frequencyInput = childSnapshot .val() .frequency ;

    var firstTimeConverted = moment ( firstInput , "HH:mm" ) .subtract ( 1 , "years" ) ;
    var diffTime = moment() .diff ( moment ( firstTimeConverted ) , "minutes" ) ;
    var tRemainder = diffTime % frequencyInput ;
    var tMinutesTillTrain = frequencyInput - tRemainder ;
    var nextTrain = moment() .add ( tMinutesTillTrain , "minutes" ) ;

    var newRow = $ ( "<tr>" ) .append (
        $ ( "<td>" ) .text ( trainInput ) ,
        $ ( "<td>" ) .text ( destinationInput ) ,
        $ ( "<td>" ) .text ( frequencyInput ) ,
        $ ( "<td>" ) .text ( moment ( nextTrain ) .format ( "hh:mm" ) ) ,
        $ ( "<td>" ) .text ( tMinutesTillTrain ) ,
    ) ;
        
    $ ( "#train-table" ) .prepend ( newRow ) ;

  } ) ;  