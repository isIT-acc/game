let currentButton = "attack"; //two variants:skill or attack
let skillButtonPressed = false;

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
function transformZombieToRed() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.add("unit-image_type_red-zombie");
}
function zombieSittingAnimationFinished() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.remove("unit-image_sitting");
}

function zombieAttackAnimationKeyframesFinished() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.remove("unit-image_attacks");
}

function zombieAttackAnimationShlevesFinished() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.firstElementChild.classList.remove(
      "unit-image__shleves_play"
    );
}
function zombieAnimationFinished() {
  if (currentButton === "skill") {
    transformZombieToRed();
    zombieSittingAnimationFinished();
  } else if (currentButton === "attack") {
    zombieAttackAnimationKeyframesFinished();
    zombieAttackAnimationShlevesFinished();
    enableSkillButton();
  }
}

function redCloudAnimationFinished() {
  let unitImage = document
    .querySelector(".unit_positioned_right")
    .firstElementChild.firstElementChild.nextElementSibling.classList.remove(
      "red-cloud_animation-played"
    );
  enableSkillButton();
  enableAttackButton();
}

function pressAttackButton() {
  currentButton = "attack";

  let attackButton = document.querySelector(".attack-button");
  // change view of attack button
  attackButton.classList.add("attack-button_pressed");
  // change view of text inside button
  attackButton.firstElementChild.classList.add(
    "attack-button__hp-number_pressed"
  );
}

function disableSkillButton() {
  document
    .querySelector(".skills-button")
    .removeEventListener("mousedown", zombieSkillActivatedListener);
}
function playZombieAttackAnimationKeyFrames() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.add("unit-image_attacks");
}

function playZombieAttackAnimationShleves() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.firstElementChild.classList.add(
      "unit-image__shleves_play"
    );
}
function zombieAttacks() {
  pressAttackButton();
  disableSkillButton();
  playZombieAttackAnimationKeyFrames();
  playZombieAttackAnimationShleves();
}
function unpressAttackButton() {
  let attackButton = document.querySelector(".attack-button");
  // change view of attack button
  attackButton.classList.remove("attack-button_pressed");
  // change view of text inside button
  attackButton.firstElementChild.classList.remove(
    "attack-button__hp-number_pressed"
  );
}
function enableAttackButton() {
  document
    .querySelector(".attack-button")
    .addEventListener("mousedown", zombieAttacks);
  document
    .querySelector(".attack-button")
    .addEventListener("mouseup", unpressAttackButton);
}

function disableAttackButton() {
  document
    .querySelector(".attack-button")
    .removeEventListener("mousedown", zombieAttacks);
  document
    .querySelector(".attack-button")
    .removeEventListener("mouseup", unpressAttackButton);
}

function unpressSkillButton() {
  skillButtonPressed = false;
  document
    .querySelector(".skills-button")
    .classList.remove("skills-button_activated");
}
function transformToDefaultZombie() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.remove("unit-image_type_red-zombie");
}

function zombieSkillActivatedListener() {
  if (skillButtonPressed) {
    unpressSkillButton();
    transformToDefaultZombie();
  } else {
    pressSkillButton();
    transformToRedZombie();
  }
}
function enableSkillButton() {
  document
    .querySelector(".skills-button")
    .addEventListener("mousedown", zombieSkillActivatedListener);
}
function playZombieAnimationSitting() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.classList.add("unit-image_sitting");
}

function playRedCloudAnimation() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.firstElementChild.nextElementSibling.classList.add(
      "red-cloud_animation-played"
    );
}
function transformToRedZombie() {
  disableSkillButton();
  disableAttackButton();
  playZombieAnimationSitting();
  playRedCloudAnimation();
}

function addRedCloudAnimationListener() {
  document
    .querySelector(".red-cloud")
    .addEventListener("animationend", redCloudAnimationFinished);
}

function addRedZombieAnimationListener() {
  document
    .querySelector(".unit_positioned_right")
    .firstElementChild.addEventListener(
      "animationend",
      zombieAnimationFinished
    );
}

function main() {
  addRedZombieAnimationListener();
  addRedCloudAnimationListener();
  enableAttackButton();
  enableSkillButton();
}

window.addEventListener("load", main);
