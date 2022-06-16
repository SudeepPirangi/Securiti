// plnkr.co/edit/NQlhhTf1VsH6jwkd?open=lib%2Fscript.js&preview
// 1. apply search on some delay
// 2. try fetching all pages at once

https: window.addEventListener("load", function () {
  document.querySelector("#input").addEventListener("keyup", search);
  document.querySelector("#getAll").addEventListener("keyup", getAll);
});

const TIME_OUT = 1000;
const search = debounce((ev) => onInput(ev), TIME_OUT);

function debounce(fn, timeout) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
}

async function onInput(event) {
  const LIST_ID = "#list";
  var val = event.target.value.trim();
  console.log(val);
  if (val) {
    event.target.disabled = true;
    const res = await getPeople(val);
    printList(res.results, LIST_ID);
    event.target.disabled = false;
    event.target.focus();
  } else {
    printList([], LIST_ID);
  }
}

function getPeople(search = "", page = 1) {
  return fetch("https://swapi.dev/api/people/?search=" + search + "&page=" + page).then((res) => res.json());
}
function getAllPeople(search = "") {
  return fetch("https://swapi.dev/api/people/?search=" + search).then((res) => res.json());
}

function printList(arr, id) {
  document.querySelector(id).innerHTML = "";
  for (var i = 0; i < arr.length; i++) {
    var el = document.createElement("li");
    el.textContent = arr[i].name;
    document.querySelector(id).appendChild(el);
  }
  if (!arr.length) {
    document.querySelector(id).innerHTML = "<h1>No Data</h1>";
  }
}

async function getAll(ev) {
  const LIST_ID = "#list-all";
  document.querySelector(LIST_ID).innerHTML = "";
  let searchKey = ev.target.value.trim();
  if (!searchKey.length) {
    printList([], LIST_ID);
  } else {
    let thisPage = await getAllPeople(searchKey);
    let ppl = [...thisPage.results];
    // let pages = Math.ceil(thisPage.count / 10);
    if (!ppl.length) {
      printList([], LIST_ID);
      return;
    }
    let eachPage = fetchPeople(thisPage);
    while (thisPage.next) {
      thisPage = await eachPage();
      ppl = [...ppl, ...thisPage.results];
    }
    printList(ppl, LIST_ID);
  }
}

function fetchPeople(rawObj) {
  let result = rawObj;
  return async function () {
    let newResult = await fetch(result.next);
    let resultsJSON = await newResult.json();
    result = resultsJSON;
    return resultsJSON;
  };
}
