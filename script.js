import html2canvas from "/node_modules/html2canvas/dist/html2canvas.esm.js";

let options = {};
let default_option = {};

options["hair"] = [
    ["default", "Default"],
    ["bang",    "Bang"],
    ["curls",   "Curls"],
    ["elegant", "Elegant"],
    ["fancy",   "Fancy"],
    ["short",   "Short"]
];
default_option["hair"] = "default";

options["ears"] = [
    ["default", "Default"],
    ["tilt-forward",    "Tilt Forward"],
    ["tilt-backward",   "Tilt Backward"]
];
default_option["ears"] = "default";

options["eyes"] = [
    ["default", "Default"],
    ["angry",   "Angry"],
    ["naughty", "Naughty"],
    ["panda",   "Panda"],
    ["smart",   "Smart"],
    ["star",    "Star"]
];
default_option["eyes"] = "default";

options["mouth"] = [
    ["default",     "Default"],
    ["astonished",  "Astonished"],
    ["eating",      "Eating"],
    ["laugh",       "Laugh"],
    ["tongue",      "Tongue"]
];
default_option["mouth"] = "default";

options["neck"] = [
    ["default",         "Default"],
    ["bend-backward",   "Bend Backward"],
    ["bend-forward",    "Bend Forward"],
    ["thick",           "Thick"]
];
default_option["neck"] = "default";

options["leg"] = [
    ["default",         "Default"],
    ["bubble-tea",      "Bubble Tea"],
    ["cookie",          "Cookie"],
    ["game-console",    "Game Console"],
    ["tilt-backward",   "Tilt Backward"],
    ["tilt-forward",    "Tilt Forward"]
];
default_option["leg"] = "default";

options["accessory"] = [
    ["earings",     "Earings"],
    ["flower",      "Flower"],
    ["glasses",     "Glasses"],
    ["headphones",  "Headphones"]
];
default_option["accessory"] = "glasses";

options["background"] = [
    ["blue50", "Blue 50"],
    ["blue60", "Blue 60"],
    ["blue70", "Blue 70"],
    ["darkblue30", "Dark Blue 30"],
    ["darkblue50", "Dark Blue 50"],
    ["darkblue70", "Dark Blue 70"],
    ["green50", "Green 50"],
    ["green60", "Green 60"],
    ["green70", "Green 70"],
    ["grey40", "Grey 40"],
    ["grey70", "Grey 70"],
    ["grey80", "Grey 80"],
    ["red50", "Red 50"],
    ["red60", "Red 60"],
    ["red70", "Red 70"],
    ["yellow50", "Yellow 50"],
    ["yellow60", "Yellow 60"],
    ["yellow70", "Yellow 70"]
];
default_option["background"] = "darkblue50";

let selected_alpaca_part_id = "hair";
let selected_alpaca_part_img = document.getElementById("hair-img");

let selected_alpaca_style_id = {};
selected_alpaca_style_id["hair"] = default_option["hair"];
selected_alpaca_style_id["ears"] = default_option["ears"];
selected_alpaca_style_id["eyes"] = default_option["eyes"];
selected_alpaca_style_id["mouth"] = default_option["mouth"];
selected_alpaca_style_id["neck"] = default_option["neck"];
selected_alpaca_style_id["leg"] = default_option["leg"];
selected_alpaca_style_id["accessory"] = default_option["accessory"];
selected_alpaca_style_id["background"] = default_option["background"];

function alpaca_asset_loc(alpaca_part_id, alpaca_style_id) {
    return "alpaca_assets/" + alpaca_part_id + "/" + alpaca_style_id + ".png";
}

function alpaca_part_click_handler(event) {
    let alpaca_part_button = event.target;
    let alpaca_part_id = alpaca_part_button.id;
    if(alpaca_part_id === selected_alpaca_part_id) {
        return;
    }
    let selected_alpaca_part_button = document.getElementById(selected_alpaca_part_id);
    selected_alpaca_part_button.classList.toggle("selected");
    alpaca_part_button.classList.toggle("selected");
    selected_alpaca_part_id = alpaca_part_id;
    selected_alpaca_part_img = document.getElementById(alpaca_part_id + "-img");
    let alpaca_style_buttons = document.getElementById("alpaca-style-buttons");
    while(alpaca_style_buttons.lastChild) {
        alpaca_style_buttons.lastChild.remove();
    }
    let alpaca_styles = options[alpaca_part_id];
    for(let [style_id, style_label] of alpaca_styles) {
        let alpaca_style_button = document.createElement("button");
        alpaca_style_button.setAttribute("type", "button");
        alpaca_style_button.id = style_id;
        alpaca_style_button.classList.add("radio-group-button");
        if(selected_alpaca_style_id[alpaca_part_id] === style_id) {
            alpaca_style_button.classList.toggle("selected");
        }
        alpaca_style_button.textContent = style_label;
        alpaca_style_button.addEventListener("click", alpaca_style_click_handler);
        alpaca_style_buttons.appendChild(alpaca_style_button);
    }
}

function alpaca_style_click_handler(event) {
    let alpaca_style_button = event.target;
    let alpaca_style_id = alpaca_style_button.id;
    let _selected_alpaca_style_id = selected_alpaca_style_id[selected_alpaca_part_id];
    if(alpaca_style_id === _selected_alpaca_style_id) {
        return;
    }
    let _selected_alpaca_style_button = document.getElementById(_selected_alpaca_style_id);
    _selected_alpaca_style_button.classList.toggle("selected");
    alpaca_style_button.classList.toggle("selected");
    selected_alpaca_style_id[selected_alpaca_part_id] = alpaca_style_id;
    selected_alpaca_part_img.src = alpaca_asset_loc(selected_alpaca_part_id, alpaca_style_id);
}

function get_rand_index(length) {
    return Math.floor(Math.random() * length);
}

function randomize_alpaca(event) {
    for(let alpaca_part_id in selected_alpaca_style_id) {
        let alpaca_style_id_options = options[alpaca_part_id];
        let rand_index = get_rand_index(alpaca_style_id_options.length);
        let [alpaca_style_id, _] = alpaca_style_id_options[rand_index]
        selected_alpaca_style_id[alpaca_part_id] = alpaca_style_id;
        let alpaca_part_img = document.getElementById(alpaca_part_id + "-img");
        alpaca_part_img.src = alpaca_asset_loc(alpaca_part_id, alpaca_style_id);
    }
}

function download_alpaca(event) {
    let alpaca_div = document.getElementById("alpaca");
    html2canvas(alpaca_div).then(
        function(canvas) {
            let dataURL = canvas.toDataURL();
            let link = document.createElement("a");
            link.href = dataURL;
            link.download = "alpaca_avatar.png"
            link.click();
        }
    );
}

let alpaca_part_buttons = document.querySelectorAll("#alpaca-part-buttons .radio-group-button");
for(let alpaca_part_button of alpaca_part_buttons) {
    alpaca_part_button.addEventListener("click", alpaca_part_click_handler);
}

let alpaca_style_buttons = document.querySelectorAll("#alpaca-style-buttons .radio-group-button");
for(let alpaca_style_button of alpaca_style_buttons) {
    alpaca_style_button.addEventListener("click", alpaca_style_click_handler);
}

let random_button = document.getElementById("random-button");
random_button.addEventListener("click", randomize_alpaca);

let download_button = document.getElementById("download-button");
download_button.addEventListener("click", download_alpaca);