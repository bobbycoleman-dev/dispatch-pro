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
		scheduleDelivery.style.left = "34%";
		scheduleDelivery.style.bottom = "10%";
		schedulerDisplayed = true;
	} else {
		scheduleDelivery.style.display = "none";
		scheduleDelivery.style.left = "34%";
		scheduleDelivery.style.bottom = "10%";
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
			truckNumOutput += "<div class='horizontal-break'></div>";
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
			truckNumOutput += "<div class='horizontal-break'></div>";
		}
	}

	scheduleBoard.innerHTML = truckNumOutput;

	var truckNumberOutput = document.querySelectorAll(".truck-num");
	var truckNumAndNameColor = document.querySelectorAll(
		".truck-num-driver-name"
	);
	for (var i = 0; i <= truckNumberOutput.length - 1; i++) {
		truckNumberOutput[i].innerHTML = i + 1;
		switch (i) {
			case 0:
				truckNumAndNameColor[i].style.backgroundColor = "green";
				break;
			case 1:
				truckNumAndNameColor[i].style.backgroundColor = "blue";
				break;
			case 2:
				truckNumAndNameColor[i].style.backgroundColor = "red";
				break;
			case 3:
				truckNumAndNameColor[i].style.backgroundColor = "orange";
				break;
			case 4:
				truckNumAndNameColor[i].style.backgroundColor = "yellow";
				truckNumAndNameColor[i].style.color = "black";
				break;
			case 5:
				truckNumAndNameColor[i].style.backgroundColor = "purple";
		}
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

dragSettingsButton(document.getElementById("settings-gear"));

function dragSettingsButton(elmnt) {
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

dragElement(document.getElementById("schedule-del-menu"));
function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	if (document.getElementById("schedule-del-header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById("schedule-del-header").onmousedown =
			dragMouseDown;
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

function getDateRangeOfWeek(weekNo) {
	var d1 = new Date();
	numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
	d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
	var weekNoToday = d1.getWeek();
	var weeksInTheFuture = eval(weekNo - weekNoToday);
	d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
	var rangeIsFrom =
		eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
	d1.setDate(d1.getDate() + 6);
	var rangeIsTo =
		eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
	return [rangeIsFrom, rangeIsTo];
}

Date.prototype.getWeek = function () {
	// Create a copy of this date object
	var target = new Date(this.valueOf());

	// ISO week date weeks start on monday, so correct the day number
	var dayNr = (this.getDay() + 6) % 7;

	// Set the target to the thursday of this week so the
	// target date is in the right year
	target.setDate(target.getDate() - dayNr + 3);

	// ISO 8601 states that week 1 is the week with january 4th in it
	var jan4 = new Date(target.getFullYear(), 0, 4);

	// Number of days between target date and january 4th
	var dayDiff = (target - jan4) / 86400000;

	if (new Date(target.getFullYear(), 0, 1).getDay() < 5) {
		// Calculate week number: Week 1 (january 4th) plus the
		// number of weeks between target date and january 4th
		return 1 + Math.ceil(dayDiff / 7);
	} else {
		// jan 4th is on the next week (so next week is week 1)
		return Math.ceil(dayDiff / 7);
	}
};

function convertToMonthName(monthNum) {
	var monthName = "";
	switch (monthNum) {
		case 0:
			monthName = "January";
			break;
		case 1:
			monthName = "February";
			break;
		case 2:
			monthName = "March";
			break;
		case 3:
			monthName = "April";
			break;
		case 4:
			monthName = "May";
			break;
		case 5:
			monthName = "June";
			break;
		case 6:
			monthName = "July";
			break;
		case 7:
			monthName = "August";
			break;
		case 8:
			monthName = "September";
			break;
		case 9:
			monthName = "October";
			break;
		case 10:
			monthName = "November";
			break;
		case 11:
			monthName = "December";
	}
	return monthName;
}

class ScheduleBoard {
	static weekList = [];
	constructor(weekNumber, startDate, endDate) {
		this.weekNumber = weekNumber;
		this.startDate = startDate;
		this.endDate = endDate;
		this.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
		this.numOfTrucks = [];
		ScheduleBoard.weekList.push(this);
	}
	static weekNum = 31;
	// new Date().getWeek();
	createWeeks() {
		for (var i = 1; i < 54; i++) {
			new ScheduleBoard(
				i,
				getDateRangeOfWeek(i)[0],
				getDateRangeOfWeek(i)[1]
			);
		}
	}
	displaySBHeader() {
		var sbHeader = `
			<p class="previous-week flex algn-cntr">
                <img src="./icons/chevron.left.svg" alt="previous-week">
                previous week
            </p>
            <div class="sb-header-mid">
                <p class="sb-header-week">Week ${
					ScheduleBoard.weekList[ScheduleBoard.weekNum].weekNumber
				}</p>
                <p class="sb-header-dates">${
					convertToMonthName(new Date().getMonth()) +
					" " +
					new Date(
						ScheduleBoard.weekList[ScheduleBoard.weekNum].startDate
					).getDate()
				} - ${
			convertToMonthName(new Date().getMonth()) +
			" " +
			(new Date(
				ScheduleBoard.weekList[ScheduleBoard.weekNum].endDate
			).getDate() -
				2)
		}</p>
            </div>
            <p class="next-week flex algn-cntr">
                next week
                <img src="./icons/chevron.right.svg" alt="next-week">
            </p>
		`;
		document.querySelector(".sb-header").innerHTML = sbHeader;
	}
	displayDaysOfWeek() {
		var tempString = "";
		for (var i = 0; i < this.days.length; i++) {
			tempString += ` 
			<div class="day-date">
				<p>${this.days[i]}</p>
				<p class="txt-14pt">${
					convertToMonthName(new Date().getMonth()) +
					" " +
					(new Date(
						ScheduleBoard.weekList[ScheduleBoard.weekNum].startDate
					).getDate() +
						i)
				}</p>
			</div>`;
		}
		document.querySelector(".sb-days").innerHTML = tempString;
	}
	displayTruck() {
		var newTruck = ``;
		for (var i = 1; i <= truckCount; i++) {
			newTruck += new Truck(i, i);
		}
		document.getElementById("truck-schedule-layout").innerHTML = newTruck;
	}
}

class Truck {
	constructor(driverName, number) {
		this.driverName = driverName;
		this.number = number;
	}
	createTruck() {
		var truckLayout = `
		<p class="truck-num-driver-name">
            Truck <span class="truck-num">${Truck.number}</span>: <span>${Truck.driverName}</span>
        </p>`;
		truckLayout += Truck.createFirstRunStops();
		document.getElementById("truck-schedule-layout").innerHTML =
			truckLayout;
	}
	createFirstRunStops() {
		var output = document.getElementById("first-runs-top-level");
		let stopRow = `
		<p class="first-run-header" id="first-runs-header">First Runs</p>
		<div id="first-run-cell-count">
		`;
		for (var i = 1; i <= firstRunCount; i++) {
			stopRow += `
			<div class="stop-num flex" id="stop-num-cell">
				<div class="delivery-cell"></div>
				<div class="delivery-cell"></div>
				<div class="delivery-cell"></div>
				<div class="delivery-cell"></div>
				<div class="delivery-cell"></div>
			</div>
			`;
		}
		stopRow += `</div>`;
		output.innerHTML = stopRow;
		return output.outerHTML;
	}
}

const sb = new ScheduleBoard();
sb.createWeeks();
sb.displayDaysOfWeek();
sb.displaySBHeader();
sb.displayTruck();
