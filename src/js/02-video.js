import Player from '../../node_modules/@vimeo/player/dist/player';
const videoRef = document.querySelector('#vimeo-player');
import throttle from 'lodash.throttle';

const KEY_STORAGE = 'videoplayer-current-time';

const player = new Player('vimeo-player');
const previousTime = JSON.parse(localStorage.getItem(KEY_STORAGE))
  ? JSON.parse(localStorage.getItem(KEY_STORAGE)).seconds
  : 0;

player.setCurrentTime(previousTime);
function getCurrentTime(data) {
  const currentTime = data.seconds;
  console.log(`${currentTime}`);
  localStorage.setItem(KEY_STORAGE, JSON.stringify({ seconds: currentTime }));
}

player.on('timeupdate', throttle(getCurrentTime, 1000));
