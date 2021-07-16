const init = (screenChange: Function) => {
  // 取值17是为了处理页面内容出现滚动条的情况
  let isFull = window.screen.height - window.document.documentElement.clientHeight <= 17;

  // 阻止F11键默认事件，用HTML5全屏API代替
  window.addEventListener('keydown', (e) => {
    e = e || window.event;
    if (e.key === 'F11' && !isFull) {
      e.preventDefault();
      enterFullScreen();
    } else if (e.key === 'F11' && isFull) {
      exitFullScreen();
    }
  });
  window.onresize = function () {
    isFull = window.screen.height - window.document.documentElement.clientHeight <= 17;
    screenChange(isFull);
  };
};

//进入全屏
const enterFullScreen = () => {
  document.documentElement.requestFullscreen();
};

// 退出全屏
const exitFullScreen = () => {
  document.exitFullscreen();
};

export default {
  init,
  enterFullScreen,
  exitFullScreen,
};
