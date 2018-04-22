var modal = document.getElementById("modal_background");
var body = document.getElementsByTagName("body")[0];
var images = document.querySelectorAll(".gallery_container img");
var right_control = document.getElementById("right_control");
var left_control = document.getElementById("left_control");
var controls = [left_control, right_control, document];

var paging_events = ["click", "touchstart", "keypress"];

// Блок с изображением в модальном окне

var modal_image = document.getElementById("modal_image");

// Текущее изображение

var cur_image = {
	index: undefined,
	item: undefined,
	scale: 1
};

// Добавляем модалку для просмотра изображения

Array.prototype.forEach.call(images, function (item, i) {
	item.addEventListener("click", function () {
		modal_image.setAttribute("src", item.getAttribute("src"));
		item.style.visibility = "hidden";
		modal.style.display = "block";
		body.style.overflow = "hidden";
		cur_image.item = item;
		cur_image.index = i;
		cur_image.scale = 1;
	});
});

// Добавляем обработчик для выхода из режима просмотра

modal.addEventListener("click", function () {
	if (cur_image.item == undefined) return;

	modal_image.setAttribute("src", "");
	cur_image.item.style.visibility = "visible";
	modal.style.display = "none";
	body.style.overflow = "auto";

	modal_image.style.transform = "";
	cur_image.item = undefined;
});

// Перелистывание фотографий

addEventHandler(controls, "click keydown", function (e) {
	if (cur_image.item == undefined) return;
	e.stopPropagation();

	var index = undefined;

	if (this == left_control || e.keyCode == 37) {
		index = cur_image.index - 1;
		if (images[index] == undefined) index = images.length - 1;
	} else if (this == right_control || e.keyCode == 39) {
		index = cur_image.index + 1;
		if (images[index] == undefined) index = 0;
	}

	if (index == undefined) return;

	cur_image.scale = 1;
	modal_image.style.transform = "";

	modal_image.setAttribute("src", images[index].getAttribute("src"));

	cur_image.item.style.visibility = "visible";
	images[index].style.visibility = "hidden";

	cur_image.item = images[index];
	cur_image.index = index;
});

// Изменение масштаба фото

addEventHandler(document, "wheel", function (e) {
	if (cur_image.item == undefined) return;

	if (e.deltaY > 0 && cur_image.scale >= 0.3) {
		cur_image.scale -= 0.1;
	} else if (e.deltaY < 0) {
		cur_image.scale += 0.1;
	}

	modal_image.style.transform = "translate(-50%, -50%) scale(" + cur_image.scale + ")";
});
