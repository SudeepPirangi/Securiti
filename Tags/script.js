// https://plnkr.co/edit/zjVviI4ZxnFAzFMS?open=lib%2Fscript.js&preview
// Add new tag on 'Space'/'Enter'

https: window.addEventListener("load", function () {
  const parent = document.getElementsByClassName("plunker-tags-input")[0];
  const tagInput = document.getElementsByClassName("plunker-tag-input")[0];
  tagInput.addEventListener("keyup", function (ev) {
    if (ev.code === "Enter" || ev.code === "Space") {
      let tag = generateTag(this.value);
      this.value = "";
      parent.insertBefore(tag, this);
    }
  });
});

function generateTag(title) {
  let div = document.createElement("div");
  div.setAttribute("class", "plunker-tag-item");
  let span = document.createElement("span");
  span.setAttribute("class", "plunker-tag-name");
  span.innerText = title;
  let button = document.createElement("button");
  button.type = "button";
  button.className = "plunker-tag-remove";
  button.innerText = "x";
  div.append(span, button);
  return div;
}
