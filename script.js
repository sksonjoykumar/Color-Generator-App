// Selected all html id
const main = document.getElementById("main-container");
const randomButton = document.getElementById("random-btn");
const colorDisplay = document.getElementById("color-display");
const copyToClipboard = document.getElementById("copy-to-clipboard");
const colorModeRadios = document.getElementsByName("color-mode");
const input1 = document.getElementById("input-1");
const input2 = document.getElementById("input-2");
const selectRGB = document.getElementById("select-rgb");
const rgbRangeRed = document.getElementById("rgb-range-red");
const rgbRangeGreen = document.getElementById("rgb-range-green");
const rgbRangeBlue = document.getElementById("rgb-range-blue");
const title1 = document.getElementById("title-1");
const title2 = document.getElementById("title-2");
const title3 = document.getElementById("title-3");
const presetColors = document.getElementById("preset-colors");
const colorSaveBtn = document.getElementById("save-to-clipboard");
const customColorParent = document.getElementById("custom-colors");
const bgColorPreview = document.getElementById("background-img");
const inputFiles = document.getElementById("input-file");
const inputUploadBtn = document.getElementById("upload-file-btn");
const removeBtn = document.getElementById("remove-file-btn");
const backgroundSizeParent = document.getElementById("background-size-parent");

// window.onload function
window.onload = function () {
  mainFun();

  // Display color box
  displayColorBox(presetColors, defaultPresetColors);

  // localStorage custom color
  const customColorsString = localStorage.getItem("custom-colors");
  if (customColorsString) {
    myCustomColors = JSON.parse(customColorsString);
    displayColorBox(customColorParent, myCustomColors);
  }
};
// Global Color Array Empty
let myCustomColors = [];

// mainFun function
function mainFun() {
  randomButton.addEventListener("click", function () {
    const myVar = decimalColor();
    updateColorCodeToDom(myVar);
    audioSound2.play();
    audioSound2.volume = 0.3;
  });
  input1.addEventListener("keyup", function (e) {
    const myInput = e.target.value;
    if (myInput) {
      input1.value = myInput.toUpperCase();
      if (isInvalid(myInput)) {
        const color = hexToDecimal(myInput);
        updateColorCodeToDom(color);
      }
    }
  });

  //   Range area
  rgbRangeRed.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });
  rgbRangeGreen.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });
  rgbRangeBlue.addEventListener("change", function () {
    const colorRange = {
      red: parseInt(rgbRangeRed.value),
      green: parseInt(rgbRangeGreen.value),
      blue: parseInt(rgbRangeBlue.value),
    };
    updateColorCodeToDom(colorRange);
  });

  // copyToClipboard color
  copyToClipboard.addEventListener("click", function () {
    const mode = getCheckValueRadios(colorModeRadios);
    if (mode === null) {
      throw new Error("Invalid radio Input!");
    }
    // console.log(mode)
    if (mode === "hex") {
      let hexCol = input1.value;
      if (hexCol && isInvalid(hexCol)) {
        navigator.clipboard.writeText(`#${hexCol}`);
        toastMsgFun(`#${hexCol} copied!`);
        audioSound.play();
        audioSound.volume = 0.5;
      } else {
        alert("Invalid Hex Code!");
      }
    } else {
      let rgbCol = input2.value;
      if (rgbCol) {
        navigator.clipboard.writeText(rgbCol);
        toastMsgFun(`${rgbCol} copied!`);
        audioSound.play();
        audioSound.volume = 0.5;
      } else {
        alert("Invalid RGB Code!");
      }
    }
  });
  // presetColors copy
  presetColors.addEventListener("click", function (event) {
    const myEvent = event.target;
    if (myEvent.className === "color-box") {
      navigator.clipboard.writeText(myEvent.getAttribute("data-color"));
      // audioSound2.play();
      audioSound.play();
      audioSound.volume = 0.5;
      toastMsgFun(`${myEvent.getAttribute("data-color")} copied!`);
    }
  });
  // save-to-clipboard btn
  colorSaveBtn.addEventListener("click", function () {
    let myCol = `#${input1.value}`;
    if (myCustomColors.includes(myCol)) {
      alert("Already saved the Color!");
      return false;
    }
    myCustomColors.unshift(myCol);
    if (myCustomColors.length > 30) {
      myCustomColors = myCustomColors.slice(0, 30);
    }
    localStorage.setItem("custom-colors", JSON.stringify(myCustomColors));
    removeChild(customColorParent);
    displayColorBox(customColorParent, myCustomColors);
    // Sound effect
    audioSound.play();
    audioSound.volume = 0.5;
  });
  // customColorParent copy
  customColorParent.addEventListener("click", function (event) {
    const evt = event.target;
    if (evt.className === "color-box") {
      navigator.clipboard.writeText(evt.getAttribute("data-color"));
      toastMsgFun(`${evt.getAttribute("data-color")} copied!`);
      // Sound effect
      audioSound.play();
      audioSound.volume = 0.5;
    }
  });
  // backgroundColorPreview section
  inputUploadBtn.addEventListener("click", function () {
    inputFiles.click();
  });
  inputFiles.addEventListener("change", function (event) {
    const file = event.target.files[0];
    const imgURL = URL.createObjectURL(file);
    bgColorPreview.style.background = `url(${imgURL})`;
    document.body.style.background = `url(${imgURL})`;
    removeBtn.style.display = "inline";
    backgroundSizeParent.style.display = "block";
  });
  // remove button area
  removeBtn.style.display = "none";
  removeBtn.addEventListener("click", function () {
    bgColorPreview.style.background = "none";
    bgColorPreview.style.backgroundColor = "#dddeee";
    document.body.style.background = "none";
    document.body.style.backgroundColor = "#dddeee";
    removeBtn.style.display = "none";
    inputFiles.value = null;
    backgroundSizeParent.style.display = "none";
  });
  // backgroundSizeParent
  document
    .getElementById("bg-size")
    .addEventListener("change", checkBackgroundPreferences);
  document
    .getElementById("bg-repeat")
    .addEventListener("change", checkBackgroundPreferences);
  document
    .getElementById("bg-position")
    .addEventListener("change", checkBackgroundPreferences);

  document
    .getElementById("bg-attachment")
    .addEventListener("change", checkBackgroundPreferences);
}
// checkBackgroundPreferences
function checkBackgroundPreferences() {
  document.body.style.backgroundSize = document.getElementById("bg-size").value;
  document.body.style.backgroundRepeat =
    document.getElementById("bg-repeat").value;
  document.body.style.backgroundPosition =
    document.getElementById("bg-position").value;
  document.body.style.backgroundAttachment =
    document.getElementById("bg-attachment").value;
}
// save-to-clipboard btn removeChild function
function removeChild(parent) {
  let child = parent.lastElementChild;
  while (child) {
    parent.removeChild(child);
    child = parent.lastElementChild;
  }
}

// updateColorCodeToDom function
function updateColorCodeToDom(color) {
  const hexColor = generatedHexColor(color);
  const rgbColor = generatedRgbColor(color);
  //   console.log(rgbColor);

  colorDisplay.style.backgroundColor = `#${hexColor}`;
  input1.value = hexColor;
  input2.value = rgbColor;
  rgbRangeRed.value = color.red;
  title1.innerText = color.red;
  rgbRangeGreen.value = color.green;
  title2.innerText = color.green;
  rgbRangeBlue.value = color.blue;
  title3.innerText = color.blue;
}

// generatedHexColor function
function generatedHexColor({ red, green, blue }) {
  function myFunction(value) {
    const hex = value.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }
  return `${myFunction(red)}${myFunction(green)}${myFunction(
    blue
  )}`.toUpperCase();
}

// generatedRgbColor function
function generatedRgbColor({ red, green, blue }) {
  return `rgb(${red}, ${green}, ${blue})`;
}

// Convert hex to rgb
function hexToDecimal(hex) {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4), 16);
  return {
    red: red,
    green: green,
    blue: blue,
  };
}

// generatedDecimalColor function
function decimalColor() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.floor(Math.random() * 255));

  return {
    red: red,
    green: green,
    blue: blue,
  };
}

// isInvalid function
function isInvalid(color) {
  if (color.length !== 6) return false;
  return /^[0-9a-fA-F]{6}$/i.test(color);
}

// toastMsgFun function
function toastMsgFun(msg) {
  let div = document.createElement("div");
  div.innerHTML = msg;
  div.className = "css-Toast-msg toast-message-slide-in";
  div.addEventListener("click", function () {
    div.classList.remove("toast-message-slide-in");
    div.classList.add("toast-message-slide-out");
    div.addEventListener("animationend", function () {
      div.remove();
    });
  });
  document.body.appendChild(div);
}

// getCheckValue
function getCheckValueRadios(nodes) {
  let checkValue = null;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkValue = nodes[i].value;
      break;
    }
  }
  return checkValue;
}

// Preset All Colors
const defaultPresetColors = [
  "#ffcdd2",
  "#f8bbd0",
  "#e1bee7",
  "#ff8a80",
  "#ff80ab",
  "#ea80fc",
  "#b39ddb",
  "#9fa8da",
  "#90caf9",
  "#b388ff",
  "#8c9eff",
  "#82b1ff",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#80d8ff",
  "#84ffff",
  "#a7ffeb",
  "#c8e6c9",
  "#dcedc8",
  "#f0f4c3",
  "#b9f6ca",
  "#ccff90",
  "#ffcc80",
];

// Audio Sound
const audioSound = new Audio("./audio/shooting-sound-fx-159024.mp3");
const audioSound2 = new Audio("./audio/multi-pop-1-188165.mp3");

// function generatedColorBox
function generatedColorBox(myColor) {
  let div = document.createElement("div");
  div.className = "color-box";
  div.style.backgroundColor = myColor;
  div.setAttribute("data-color", myColor);
  return div;
}

function displayColorBox(parent, colors) {
  colors.forEach((myColor) => {
    const colorBox = generatedColorBox(myColor);
    parent.appendChild(colorBox);
  });
}
