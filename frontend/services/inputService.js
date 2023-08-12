export function onLostFocus(e) {
  if (e.target.value) {
    e.target.classList.add("lostFocus");
  } else {
    e.target.classList.remove("lostFocus");
  }
}
