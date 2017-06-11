/*variables*/
let count = 0, id, id2;
/*constatnts*/
const cache = new Set(), CO = 'Count', CON = 'Established cpnnections';
  
  function start() {
     id = setInterval(function() {
     count++;
     for (port of cache) {
      port.postMessage({mess1: [CO,  count], mess2: [CON,cache.size], mess3: new Date().toLocaleString()});
     }
     }, 500);
  } 
  
  start ();

onconnect = function(e) {
  let port = e.ports[0];
  cache.add(port);
  port.start();  

  port.onmessage = function (event) {
      clearInterval(id);
      count = 0;
     
   if (event.data == 'stop') {
   }
   if (event.data == 'start') {
      start();
   }
  };
}