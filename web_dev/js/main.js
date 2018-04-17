var menu = document.querySelectorAll("#menu a");
var know = document.getElementById("did_you_know");

Array.prototype.forEach.call(menu, function (item, i) {
	if (item.getAttribute("href") == location.pathname) item.firstChild.classList.add("active_page_button");
});

// Парсинг JSON для блока "Знаете ли вы?"

var facts = "";

xhr = new XMLHttpRequest();
xhr.open('GET', '/facts.json', false);
xhr.send();

if (xhr.status != 200) {
	console.warn(xhr.status + ':' + xhr.statusText);
} else {
	facts = JSON.parse(xhr.responseText);
}

if (facts == "") {
	know.style.display = "none";
	document.getElementById("content_container").style.margin = "0";
} else {
	know.querySelector("div").innerText = facts[getRandInt(0, facts.length)];
}

function getRandInt(min, max) {
	return Math.floor(Math.random()*(max - min)) + min;
}

// Функция для быстрого добавления нескольких обработчиков событий на HTML Collection

function addEventHandler(object, events, func) {

	if (object.length == undefined) object = [object];

	events.split(" ").forEach(function (event) {
		for (var i = 0; i < object.length; i++) {
			object[i].addEventListener(event, func);
		}
	})
}
