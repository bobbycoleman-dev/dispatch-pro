let calendarIcon = "./icons/calendar.badge.plus.svg";
let calendarIconWhite = "./icons/calendar.badge.plus.white.svg";
let scheduleBtn = document.getElementById("schedule-btn");

let locationIcon = "./icons/location.square.svg";
let locationIconWhite = "./icons/location.square.white.svg";
let mapBtn = document.getElementById("map-btn");

let shareIcon = "./icons/arrow.up.right.square.svg";
let shareIconWhite = "./icons/arrow.up.right.square.white.svg";
let shareBtn = document.getElementById("share-btn");

var settingsDisplayed = false;
let settingsMenu = document.getElementById("settings-menu");

var schedulerDisplayed = false;
let scheduleDelivery = document.getElementById("schedule-del-menu");

let calendarNavIcon = "./icons/calendar.svg";
let calendarNavIconGreen = "./icons/calendar.green.svg";

let noSecondRuns = document.getElementById("second-runs-no");
let yesSecondRuns = document.getElementById("second-runs-yes");
var secondRunCells = document.getElementById("second-run-cell-count");
var secondRuns = document.getElementById("second-runs-top-level");
let secondRunCellCount = document.getElementById("select-second-run-count");
let secondRunCellLabel = document.getElementById("select-second-run-label");
var secondRunHeader = document.getElementById("second-runs-header").outerHTML;

var truckNumAndName = document.querySelector(
	".truck-num-driver-name"
).outerHTML;

var truckCount = 4;
var firstRunCount = 4;
var secondRunCount = 3;
var addSecondRuns = true;

buildScheduleBoard(truckCount, firstRunCount, addSecondRuns, secondRunCount);

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

function displaySettings() {
	if (!settingsDisplayed) {
		settingsMenu.style.display = "block";
		settingsDisplayed = true;
	} else {
		settingsMenu.style.display = "none";
		settingsDisplayed = false;
	}
}

function displayScheduler() {
	if (!schedulerDisplayed) {
		scheduleDelivery.style.display = "block";
		schedulerDisplayed = true;
	} else {
		scheduleDelivery.style.display = "none";
		schedulerDisplayed = false;
	}
}

function activateSecondRuns() {
	noSecondRuns.checked = false;
	yesSecondRuns.checked = true;
	secondRunCellCount.style.display = "flex";
	secondRunCellLabel.style.display = "flex";
}

function deactivateSecondRuns() {
	yesSecondRuns.checked = false;
	noSecondRuns.checked = true;
	secondRunCellCount.style.display = "none";
	secondRunCellLabel.style.display = "none";
}

function saveSettings() {
	var truckNumber = document.getElementById("select-truck-num").value;
	truckCount = truckNumber;

	var firstRunNumber = document.getElementById(
		"select-first-run-count"
	).value;
	firstRunCount = firstRunNumber;

	var secondRunNumber = document.getElementById(
		"select-second-run-count"
	).value;
	secondRunCount = secondRunNumber;

	if (noSecondRuns.checked) {
		addSecondRuns = false;
	}
	if (yesSecondRuns.checked) {
		addSecondRuns = true;
	}

	console.log(addSecondRuns);

	displaySettings();
	buildScheduleBoard(
		truckCount,
		firstRunCount,
		addSecondRuns,
		secondRunCount
	);
}

function buildScheduleBoard(
	truckNum,
	firstRunNum,
	secondRunBool,
	secondRunNum
) {
	var scheduleBoard = document.getElementById("schedule-board-layout");
	var truckSchedule = document.getElementById("truck-schedule-layout");

	var truckScheduleTopLevel = "";
	var truckNumOutput = "";

	var firstRuns = document.getElementById("first-runs-top-level");
	var firstRunHeader = document.getElementById("first-runs-header").outerHTML;
	var firstRunCells = document.getElementById("first-run-cell-count");
	var firstRunNumOutput = "";
	var firstRunTopLevel = "";

	var secondRunNumOutput = "";
	var secondRunTopLevel = "";

	var stopNumCell = document.getElementById("stop-num-cell").outerHTML;

	if (secondRunBool) {
		for (var i = 1; i <= firstRunNum; i++) {
			firstRunNumOutput += stopNumCell;
		}
		firstRunCells.innerHTML = firstRunNumOutput;

		firstRunTopLevel += firstRunHeader;
		firstRunTopLevel += firstRunCells.outerHTML;
		firstRuns.innerHTML = firstRunTopLevel;

		for (var i = 1; i <= secondRunNum; i++) {
			secondRunNumOutput += stopNumCell;
		}

		secondRunCells.innerHTML = secondRunNumOutput;

		secondRunTopLevel += secondRunHeader;
		secondRunTopLevel += secondRunCells.outerHTML;
		secondRuns.innerHTML = secondRunTopLevel;

		truckScheduleTopLevel += truckNumAndName;
		truckScheduleTopLevel += firstRuns.outerHTML;
		truckScheduleTopLevel += secondRuns.outerHTML;
		truckSchedule.innerHTML = truckScheduleTopLevel;

		for (var i = 1; i <= truckNum; i++) {
			truckNumOutput += truckSchedule.outerHTML;
		}
	} else {
		for (var i = 1; i <= firstRunNum; i++) {
			firstRunNumOutput += stopNumCell;
		}

		firstRunCells.innerHTML = firstRunNumOutput;

		firstRunTopLevel += firstRunHeader;
		firstRunTopLevel += firstRunCells.outerHTML;
		firstRuns.innerHTML = firstRunTopLevel;

		truckScheduleTopLevel += truckNumAndName;
		truckScheduleTopLevel += firstRuns.outerHTML;
		truckSchedule.innerHTML = truckScheduleTopLevel;

		for (var i = 1; i <= truckNum; i++) {
			truckNumOutput += truckSchedule.outerHTML;
		}
	}

	scheduleBoard.innerHTML = truckNumOutput;

	var truckNumberOutput = document.querySelectorAll(".truck-num");
	for (var i = 0; i <= truckNumberOutput.length - 1; i++) {
		truckNumberOutput[i].innerHTML = i + 1;
	}
}

let customerSelect = document.getElementById("customer-select");
let citySelect = document.getElementById("city-select");
customerSelect.length = 0;
citySelect.length = 0;

let defaultCustomerOption = document.createElement("option");
let defaultCityOption = document.createElement("option");
defaultCustomerOption.text = "Choose Customer";
defaultCityOption.text = "Choose City";

customerSelect.add(defaultCustomerOption);
citySelect.add(defaultCityOption);
customerSelect.selectedIndex = 0;
citySelect.selectedIndex = 0;

const url = "https://jsonplaceholder.typicode.com/users";

async function getCustomerData() {
	var response = await fetch(url);
	var customerData = await response.json();
	var customer;
	for (var i = 0; i < customerData.length; i++) {
		customer = document.createElement("option");
		customer.text = customerData[i].name;
		customer.value = customerData[i].id;
		customerSelect.add(customer);
	}
	var city;
	for (var i = 0; i < customerData.length; i++) {
		city = document.createElement("option");
		city.text = customerData[i].address.city;
		city.value = customerData[i].address.zipcode;
		citySelect.add(city);
	}
}

getCustomerData();

dragElement(document.getElementById("settings-gear"));

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById("settings-gear")) {
		// if present, the header is where you move the DIV from:
		document.getElementById("settings-gear").onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
