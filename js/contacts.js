var map_button = document.getElementById("map_button");
var phone = document.getElementById("phone");

map_button.addEventListener("click", function () {
	document.getElementById("map").classList.toggle("showed")
});

var positions = [];

phone.value.replace(/_/g, function (str, pos) {
	positions.push(pos);
	return "";
});

// Обработка событий на поле ввода номера телефона

addEventHandler(phone, "focus keydown input", function (e) {

	var cur_pos = e.target.selectionStart || positions[0] || e.target.value.length;

	if (e.type == "focus") {
		e.target.setSelectionRange(cur_pos, cur_pos);
		return;
	}

	var index = (positions.indexOf(cur_pos) + 1 || positions[positions.length - 1] + 1) - 1;

	var left_pos = (positions[index - 1]) ? positions[index - 1] : (positions[index] || e.target.value.length - 1);
	var right_pos = (positions[index + 1]) ? positions[index + 1] : (positions[index] || e.target.value.length);

	e.preventDefault();

	switch (e.which) {
		case 8:
		case 37:
			if (e.which == 8) {
				var val = e.target.value;
				e.target.value = val.substring(0, left_pos) + "_" + val.substring(left_pos + 1);
			}

			e.target.setSelectionRange(left_pos, left_pos);
			break;
		case 46:
			if (cur_pos == e.target.value.length) return;
			var val = e.target.value;
			e.target.value = val.substring(0, cur_pos) + "_" + val.substring(cur_pos + 1);
			e.target.setSelectionRange(cur_pos, cur_pos);
			break;
		case 39:
			e.target.setSelectionRange(right_pos, right_pos);
			break;
		default:
			var char_code = (e.keyCode > 90) ? e.keyCode - 48 : e.keyCode;

			if (!!String.fromCharCode(char_code).match(/[0-9]/g)) {
				e.target.value = e.target.value.replace(/_/, String.fromCharCode(char_code));
				var first_pos = (e.target.value.search(/_/) + 1 || e.target.value.length + 1) - 1;
				e.target.setSelectionRange(first_pos, first_pos);
			}
	}

});

addEventHandler(phone, "mousedown touchstart keydown", function (e) {
	e.target.focus();

	// Разрешаем клавиши: влево, право, backspace, delete

	var allowed = [8, 46, 37, 39];

	if (String.fromCharCode(e.which).replace(/[^0-9]/g, "") == "" && allowed.indexOf(e.which) == -1) e.preventDefault();
});
