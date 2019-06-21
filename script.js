//var preloadUrl = "https://media.w3.org/2010/05/sintel/trailer.mp4"
var preloadUrl = "./videos/business.mp4"
var wrapper = document.querySelector(".wrapper")
var btn = document.querySelector(".switch")
var playing = document.querySelector(".playing")
var preloadVideo;

playing.addEventListener("loadstart",()=>{
  let bufferInterval;
  log("preload video start to create")
  
  preloadVideo = createPreloadVideo(wrapper,preloadUrl);
  
  log("preload video created!")
  
  preloadVideo.addEventListener("loadstart",()=>{
    log("preload video loadstart")
  })
  
  preloadVideo.addEventListener('loadedmetadata', function() {
    if (preloadVideo.buffered.length === 0) return;
    
    clearInterval(bufferInterval)
    bufferInterval = setInterval(showBuffered,100)
  });

  preloadVideo.addEventListener("loadeddata",()=>{
    log("preload video loadeddata")
  })
  preloadVideo.addEventListener("play",()=>{
    log("preload video start to play")
  })
  preloadVideo.addEventListener('timeupdate', function() {
    if (preloadVideo.buffered.length === 0) return;
    
    clearInterval(bufferInterval)
    bufferInterval = setInterval(showBuffered,100)
  });
})
btn.addEventListener("click",()=>{
  var play = document.querySelector(".playing")
  $(play).removeClass("playing")
  preloadVideo.classList.add("playing")
  preloadVideo.play();
})

 var showBuffered = (()=>{
  let lastBufferedSeconds = 0
  return function(){
    let bufferedSeconds = preloadVideo.buffered.end(0) - preloadVideo.buffered.start(0);
    if(bufferedSeconds === lastBufferedSeconds) return
    lastBufferedSeconds = bufferedSeconds;
    log("preload video buffered "+ bufferedSeconds + ' seconds of video to play!');
  }
})()
function createPreloadVideo(el,url){
  var video = document.createElement("video");
  video.preload="auto";
  video.controls = "true";
  video.src = url;
  video.setAttribute("playsinline","true")
  video.setAttribute("x5-video-player-type","h5")
  video.setAttribute("x5-video-player-fullscreen","true")
  video.setAttribute("x5-video-orientation","portraint")
  video.setAttribute("x-webkit-airplay","allow")
  el.appendChild(video);
  return video;
}
function log(str){
  var csl = document.querySelector(".console")
  csl.innerHTML+="<div>"+str+"</div>";
}
