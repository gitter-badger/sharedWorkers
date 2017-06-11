/* global  colors*/
let count = 0, bh = 0;

$('#buttons').append('<button id="start" class="btn btn-success">Start  <i class="fa fa-play"></i></button>');
$('#buttons').append('<button id="stop" class="btn btn-danger">Stop  <i class="fa fa-stop"></i></button>');
$('#buttons').append('<button id="open" class="btn btn-info">Open another window  <i class="fa fa-external-link"></i></button>');
bh = $('#buttons').outerHeight();
$('#info').css('max-height', bh);

function openViewer() {
     window.open('index.html');
   }

var myWorker = new SharedWorker("js/worker.js");
//very fucking important
myWorker.port.start();


myWorker.port.onmessage = function (e) {
   out = e.data.mess1[1];
   if (out != undefined) {
      console.info(e.data.mess1.join(' ')+' '+e.data.mess2.join(' '));
      count++;
      $('#info').prepend('<li class="list-group-item" style="background-color:'+ colors[count % colors.length]+';"><strong class="list-group-item-heading">'+e.data.mess1[0] +' <span class="badge">'+e.data.mess1[1]+'</span></strong><p class="list-group-item-text">'+e.data.mess2[0] + ' <span class="badge">'+e.data.mess2[1]+'</span></p><p class="list-group-item-text">'+e.data.mess3+'</p></li>');
   }   
   
   
};

myWorker.port.onerror = function (e) {
   console.error(e.data);
};

$('#start').click(function () {
   myWorker.port.postMessage('start');
   console.warn('started');
});

$('#stop').click(function () {
   myWorker.port.postMessage('stop');
   console.warn('stoped');
});

$('#open').click(function () {
   openViewer();
   console.warn('window opened');
});


