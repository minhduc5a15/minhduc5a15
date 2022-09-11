const disable = () => {
     document.onkeydown = (e) => {
          if (e.keyCode === 123) {
               return false;
          }  else if (
               (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
               (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
               (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
               (e.ctrlKey && e.keyCode === 80) ||
               (e.ctrlKey && e.keyCode === 83) ||
               (e.ctrlKey && e.keyCode === 85)
          ) {
               return false;
          }
     };
     document.addEventListener("contextmenu", (event) => event.preventDefault());
};
export default disable;
