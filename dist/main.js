/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_api_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api_management */ \"./src/modules/api_management.js\");\n\r\n\r\n(0,_modules_api_management__WEBPACK_IMPORTED_MODULE_0__.execSearch)('.search_section');\r\n\r\n\r\n\n\n//# sourceURL=webpack://weather_app/./src/index.js?");

/***/ }),

/***/ "./src/modules/api_management.js":
/*!***************************************!*\
  !*** ./src/modules/api_management.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"execSearch\": () => (/* binding */ execSearch)\n/* harmony export */ });\nfunction execSearch(thisForm){\r\n    const form = document.querySelector(thisForm);\r\n    const input = form.querySelector('input[type=text]');\r\n    const submit = form.querySelector('input[type=submit]');\r\n    getData(input);\r\n\r\n    submit.addEventListener('click', (e)=> {\r\n        e.preventDefault();\r\n        getData(input).catch(err => {\r\n            alert(\"Oops, city not found. Try again.\")\r\n        })\r\n    })\r\n}\r\n\r\nconst apiKey = \"73b4091d74739d827988af68075767d4\";\r\n//promise based code to async await code\r\nasync function getData(inputField){\r\n    const responseLATLON = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${inputField.value}&appid=${apiKey}`, {mode: 'cors'});\r\n    const dataLATLON = await responseLATLON.json();\r\n    const lat = dataLATLON[0].lat;\r\n    const lon = dataLATLON[0].lon;\r\n    const name = dataLATLON[0].name;\r\n    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appid=${apiKey}`)\r\n    const dataWeather = await responseWeather.json();\r\n    const currentData = dataWeather.current;\r\n    const nextWeekData = dataWeather.daily.slice(1,dataWeather.daily.length);\r\n   \r\n    // nextWeekData.forEach( el => {\r\n    //     console.log(new Date(el.dt*1000).getDay());\r\n    // });\r\n\r\n    displayToday(currentData, name);\r\n    displayNextWeek(nextWeekData);\r\n}\r\n\r\n\r\n\r\n\r\nfunction displayToday(todayData, city){\r\n    const todayDashboard = document.querySelector('.today_dashboard_lower');\r\n    const degrees = todayDashboard.querySelector('.degrees h1');\r\n    const data = todayDashboard.querySelector('.today_dashboard_data');\r\n\r\n    const location = data.querySelector('.location nobr');\r\n    const weatherImage = data.querySelector('.weather_image img');\r\n    const timeDate = data.querySelector('.time_date small');\r\n\r\n    degrees.innerText = `${Math.round(todayData.temp)}°`;\r\n    if (city.length > 8 ){\r\n        location.innerText = `${city.substring(0,8)}.`;\r\n    }else {\r\n        location.innerText = `${city}`;\r\n    }\r\n    \r\n    weatherImage.src = `https://openweathermap.org/img/wn/${todayData.weather[0].icon}.png`;\r\n    // timeDate.innerText = `${new Date(todayData.dt*1000)}`;\r\n    const date = new Date();\r\n    const dateString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()} - ${convertDay(date.getDay())}, ${date.getDate()} ${convertMonth(date.getMonth())} '${date.getFullYear().toString().slice(2)}`;\r\n    \r\n    timeDate.innerText = dateString;\r\n}\r\n\r\nfunction displayNextWeek(nextWeek){\r\n    let container = document.querySelector('.container_content');\r\n    container.innerHTML = '';\r\n\r\n    let container_row = document.createElement('div');\r\n    container_row.classList.add('content_row');\r\n\r\n    let dayTag = document.createElement('span');\r\n    let dayStrong = document.createElement('strong');\r\n\r\n    let iconTag = document.createElement('span');\r\n\r\n    let humidityTag = document.createElement('span');\r\n    let humStrong = document.createElement('strong');\r\n\r\n    let rainTag = document.createElement('span');\r\n    let rainStrong = document.createElement('strong');\r\n\r\n    let tempTag = document.createElement('span');\r\n    let tempStrong = document.createElement('strong');\r\n\r\n    container.appendChild(container_row);\r\n\r\n    container_row.appendChild(dayTag);\r\n    dayStrong.innerText = \"DAY\";\r\n    dayTag.appendChild(dayStrong);\r\n    \r\n    container_row.appendChild(iconTag);\r\n\r\n    container_row.appendChild(humidityTag);\r\n    humStrong.innerText = \"HUM\";\r\n    humidityTag.appendChild(humStrong);\r\n\r\n    container_row.appendChild(rainTag);\r\n    rainStrong.innerText = \"RAIN\";\r\n    rainTag.appendChild(rainStrong);\r\n\r\n    container_row.appendChild(tempTag);\r\n    tempStrong.innerText = \"TEMP\";\r\n    tempTag.appendChild(tempStrong);\r\n\r\n\r\n    nextWeek.forEach( (day, idx) => {\r\n        let date = new Date(day.dt * 1000);\r\n\r\n        let container_row = document.createElement('div');\r\n        container_row.classList.add('content_row');\r\n        let dayCell = document.createElement('span');\r\n        dayCell.innerText = `${convertDay(date.getDay())}`;\r\n\r\n        let iconCell = document.createElement('span');\r\n        let icon = document.createElement('img');\r\n        icon.classList.add('icon');\r\n        icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;\r\n\r\n        let humidityCell = document.createElement('span');\r\n        if (day.humidity === undefined) {\r\n            humidityCell.innerText = 'NaN';\r\n        }else {\r\n            humidityCell.innerText = `${day.humidity}%`;\r\n        }\r\n        \r\n\r\n        let rainCell = document.createElement('span');\r\n\r\n        if (day.rain === undefined) {\r\n            rainCell.innerText = 'NaN';\r\n        }else {\r\n            rainCell.innerText = `${day.rain}`;\r\n        }\r\n        \r\n\r\n        let tempCell = document.createElement('span');\r\n        tempCell.innerText = `${Math.round(day.temp.min)}° ${Math.round(day.temp.max)}°`;\r\n\r\n        container.appendChild(container_row);\r\n        container_row.appendChild(dayCell);\r\n\r\n        iconCell.appendChild(icon);\r\n        container_row.appendChild(iconCell);\r\n        \r\n        container_row.appendChild(humidityCell);\r\n        container_row.appendChild(rainCell);\r\n        container_row.appendChild(tempCell);\r\n    })\r\n\r\n}\r\n\r\nfunction convertMonth(month){\r\n    switch(month){\r\n        case 0:\r\n            return \"January\";\r\n            break;\r\n        \r\n        case 1:\r\n            return \"February\";\r\n            break;\r\n            \r\n        case 2:\r\n            return \"March\";\r\n            break;\r\n        \r\n        case 3:\r\n            return \"April\";\r\n            break;\r\n        \r\n        case 4:\r\n            return \"May\";\r\n            break;\r\n            \r\n        case 5:\r\n            return \"June\";\r\n            break;\r\n            \r\n        case 6:\r\n            return \"July\";\r\n            break;\r\n            \r\n        case 7:\r\n            return \"August\";\r\n            break;\r\n            \r\n        case 8:\r\n            return \"September\";\r\n            break;\r\n            \r\n        case 9:\r\n            return \"October\";\r\n            break;\r\n            \r\n        case 10:\r\n            return \"November\";\r\n            break;\r\n        \r\n        case 11:\r\n            return \"December\";\r\n            break;\r\n    }\r\n}\r\n\r\nfunction convertDay(day){\r\n    switch(day){\r\n        case 1:\r\n            return \"Monday\";\r\n            break;\r\n        case 2:\r\n            return \"Tuesday\";\r\n            break;\r\n        case 3:\r\n            return \"Wednesday\";\r\n            break;\r\n        case 4:\r\n            return \"Thursday\";\r\n            break;\r\n        case 5:\r\n            return \"Friday\";\r\n            break;\r\n        case 6:\r\n            return \"Saturday\";\r\n            break;\r\n        case 0:\r\n            return \"Sunday\";\r\n    }\r\n        \r\n}\r\n\r\n\n\n//# sourceURL=webpack://weather_app/./src/modules/api_management.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;