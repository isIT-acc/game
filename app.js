let currentButton = "attack"; //two variants:skill or attack
let skillButtonPressed = false;

function pressAttackButton() {
  currentButton = "attack";
  // change view of attack button
  let attackButton = document.querySelector(".attack-button");
  attackButton.classList.add("attack-button_pressed");
  attackButton.firstElementChild.classList.add(
    "attack-button__hp-number_pressed"
  );
}

function unpressAttackButton() {
  let attackButton = document.querySelector(".attack-button");
  attackButton.classList.remove("attack-button_pressed");
  attackButton.firstElementChild.classList.remove(
    "attack-button__hp-number_pressed"
  );
}
function pressSkillButton() {
  skillButtonPressed = true;
  document
    .querySelector(".skills-button")
    .classList.add("skills-button_activated");
  currentButton = "skill";
}

function unpressSkillButton() {
  skillButtonPressed = false;
  document
    .querySelector(".skills-button")
    .classList.remove("skills-button_activated");
}
function zombieAttacks() {
  pressAttackButton();
  disableSkillButton();
  // disableAttackButton();
  // play animation keyframes
  let unitImage = document.querySelector(".unit_positioned_right")
    .firstElementChild;
  unitImage.classList.add("unit-image_attacks");
  // play animation shleves in the same time
  unitImage.firstElementChild.classList.add("unit-image__shleves_play");
}

function zombieAnimationFinished() {
  let unitImage = document.querySelector(".unit_positioned_right")
    .firstElementChild;
  if (currentButton === "skill") {
    // unit-image_type_red-zombie

    unitImage.classList.add("unit-image_type_red-zombie");
    unitImage.classList.remove("unit-image_change-to-red-zombie");
    // unitImage.firstElementChild.nextElementSibling.classList.remove(
    //   "red-cloud_animation-played"
    // );
  } else if (currentButton === "attack") {
    unitImage.classList.remove("unit-image_attacks");
    unitImage.firstElementChild.classList.remove("unit-image__shleves_play");
    enableSkillButton();
    // enableAttackButton();
  }
}

function redCloudAnimationFinished() {
  let unitImage = document.querySelector(".unit_positioned_right")
    .firstElementChild;

  unitImage.firstElementChild.nextElementSibling.classList.remove(
    "red-cloud_animation-played"
  );
  enableSkillButton();
  enableAttackButton();
}

function disableSkillButton() {
  document
    .querySelector(".skills-button")
    .removeEventListener("mousedown", zombieSkillActivateListener);
}

function disableAttackButton() {
  document
    .querySelector(".attack-button")
    .removeEventListener("mousedown", zombieAttacks);
  document
    .querySelector(".attack-button")
    .removeEventListener("mouseup", unpressAttackButton);
}
function enableAttackButton() {
  document
    .querySelector(".attack-button")
    .addEventListener("mousedown", zombieAttacks);
  document
    .querySelector(".attack-button")
    .addEventListener("mouseup", unpressAttackButton);
}

function enableSkillButton() {
  document
    .querySelector(".skills-button")
    .addEventListener("mousedown", zombieSkillActivateListener);
}
function transformToRedZombie() {
  disableSkillButton();
  disableAttackButton();
  // play animation
  let unitImage = document.querySelector(".unit_positioned_right")
    .firstElementChild;
  unitImage.classList.add("unit-image_change-to-red-zombie");
  // unitImage.classList.add("unit-image_type_red-zombie");
  unitImage.firstElementChild.nextElementSibling.classList.add(
    "red-cloud_animation-played"
  );
}

function transformToDefaultZombie() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.remove("unit-image_type_red-zombie");
}
function zombieSkillActivateListener() {
  if (skillButtonPressed) {
    unpressSkillButton();
    transformToDefaultZombie();
  }
  // change view of skills button
  else {
    pressSkillButton();
    transformToRedZombie();
  }
}
function addRedCloudAnimationListener() {
  document
    .querySelector(".red-cloud")
    .addEventListener("animationend", redCloudAnimationFinished);
}
function main() {
  console.log("in_main");
  // zombieAttack animation finished listener

  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.addEventListener(
      "animationend",
      zombieAnimationFinished
    );
  addRedCloudAnimationListener();
  // zombieSkillActivateListenerd animation finished listener
  // document.querySelector()
  // button attack
  enableAttackButton();

  // button skills
  enableSkillButton();
}

window.addEventListener("load", main);
