let calendarIcon = "./icons/calendar.badge.plus.svg";
let calendarIconWhite = "./icons/calendar.badge.plus.white.svg";
let scheduleBtn = document.getElementById("schedule-btn");

let locationIcon = "./icons/location.square.svg";
let locationIconWhite = "./icons/location.square.white.svg";
let mapBtn = document.getElementById("map-btn");

let shareIcon = "./icons/arrow.up.right.square.svg";
let shareIconWhite = "./icons/arrow.up.right.square.white.svg";
let shareBtn = document.getElementById("share-btn");

function activeButton(id) {
	switch (document.getElementById(id)) {
		case scheduleBtn:
			scheduleBtn.src = calendarIconWhite;
			break;
		case mapBtn:
			mapBtn.src = locationIconWhite;
			break;
		case shareBtn:
			shareBtn.src = shareIconWhite;
	}
}

function deactivateButton(id) {
	switch (document.getElementById(id)) {
		case scheduleBtn:
			scheduleBtn.src = calendarIcon;
			break;
		case mapBtn:
			mapBtn.src = locationIcon;
			break;
		case shareBtn:
			shareBtn.src = shareIcon;
	}
}
