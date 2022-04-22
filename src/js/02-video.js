import Player from '../../node_modules/@vimeo/player/dist/player';

import throttle from 'lodash.throttle';

const KEY_STORAGE = 'videoplayer-current-time';

const player = new Player('vimeo-player');
const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
const previousTime = parsedData ? parsedData.seconds : 0;

player.setCurrentTime(previousTime);
function getCurrentTime(data) {
  const currentTime = data.seconds;
  console.log(`${currentTime}`);
  localStorage.setItem(KEY_STORAGE, JSON.stringify({ seconds: currentTime }));
}

player.on('timeupdate', throttle(getCurrentTime, 1000));
