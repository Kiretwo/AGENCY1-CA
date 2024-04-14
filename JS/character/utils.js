// Get references to all increase buttons (NodeList)

const increaseBtns = document.querySelectorAll(".increaseBtn");

// Add click event listener to each increase button
increaseBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const statsBox = button.closest(".stats-box"); // Find the parent stats-box
    const countLabel = statsBox.querySelector(".countLabel"); // Find the countLabel within the stats-box

    let count = parseInt(countLabel.textContent) || 1; // Get current count, default to 1
    if (count < 18) {
      // Check if count is less than 18
      count++;
      countLabel.textContent = count; // Update countLabel text
    }
  });
});

// Get references to all decrease buttons (NodeList)
const decreaseBtns = document.querySelectorAll(".decreaseBtn");

// Add click event listener to each decrease button
decreaseBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const statsBox = button.closest(".stats-box"); // Find the parent stats-box
    const countLabel = statsBox.querySelector(".countLabel"); // Find the countLabel within the stats-box

    let count = parseInt(countLabel.textContent) || 1; // Get current count, default to 1
    if (count > 1) {
      // Check if count is greater than 1
      count--;
      countLabel.textContent = count; // Update countLabel text
    }
  });
});

// Get reference to the reset button
const resetBtn = document.querySelector(".resetBtn");

// Add click event listener to the reset button
resetBtn.addEventListener("click", () => {
  // Get all countLabel elements
  const countLabels = document.querySelectorAll(".countLabel");

  // Iterate over each countLabel element and reset its text content to '1'
  countLabels.forEach((countLabel) => {
    countLabel.textContent = "8";
  });
});

document.querySelectorAll(".back-class").forEach((box) => {
  box.addEventListener("click", () => {
    document.querySelectorAll(".back-class").forEach((b) => {
      if (b !== box) {
        b.classList.remove("highlight");
      }
    });
    box.classList.toggle("highlight");
  });
});

document.querySelectorAll(".gender").forEach((box) => {
  box.addEventListener("click", () => {
    document.querySelectorAll(".gender").forEach((b) => {
      if (b !== box) {
        b.classList.remove("highlight");
      }
    });
    box.classList.toggle("highlight");
  });
});

const rangeInput = document.getElementById("myRange");
const rangeValueDisplay = document.getElementById("rangeValue");

// Add event listener for input change
rangeInput.addEventListener("input", () => {
  // Update the display element with the current value
  rangeValueDisplay.textContent = rangeInput.value;
});

const weightInput = document.getElementById("myWeight");
const weightValueDisplay = document.getElementById("weightValue");

// Initialize display with default value
weightValueDisplay.textContent = weightInput.value;

// Add event listener for input change
weightInput.addEventListener("input", () => {
  // Update the display element with the current value
  weightValueDisplay.textContent = weightInput.value;
});

document.addEventListener("DOMContentLoaded", () => {
  const classCheckboxes = document.querySelectorAll(".class-checkbox");
  const raceCheckboxes = document.querySelectorAll(".race-checkbox");
  const classContents = document.querySelectorAll(".content-class");
  const raceContents = document.querySelectorAll(".content-race");

  const toggleHighlightAndExpand = (items, selectedItem, contents) => {
    items.forEach((item, index) => {
      const content = contents[index];
      if (item === selectedItem) {
        item.classList.toggle("highlight"); // Toggle highlight class on the button
        content.style.display = item.classList.contains("highlight")
          ? "block"
          : "none"; // Toggle content visibility
      } else {
        item.classList.remove("highlight"); // Remove highlight class from other buttons
        content.style.display = "none"; // Hide other contents
      }
    });
  };

  classCheckboxes.forEach((item, index) => {
    item.addEventListener("click", () => {
      toggleHighlightAndExpand(classCheckboxes, item, classContents);
    });
  });

  raceCheckboxes.forEach((item, index) => {
    item.addEventListener("click", () => {
      toggleHighlightAndExpand(raceCheckboxes, item, raceContents);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const backCards = document.querySelectorAll(".back-class");

  // Function to toggle highlight class and manage content visibility for back-cards
  const toggleHighlightAndExpand = (items, selectedItem) => {
    items.forEach((item) => {
      const content = item.querySelector(".char-text"); // Get the associated char-text
      if (item === selectedItem) {
        item.classList.add("highlight"); // Add highlight class to the selected card
        content.style.display = "block"; // Show the associated char-text
      } else {
        item.classList.remove("highlight"); // Remove highlight class from other cards
        content.style.display = "none"; // Hide the associated char-text
      }
    });
  };

  // Add event listener for each back-card
  backCards.forEach((card) => {
    card.addEventListener("click", () => {
      toggleHighlightAndExpand(backCards, card);
    });
  });
});

// Function to collect selected character data
function collectCharacterData() {
  // Initialize character data object
  let characterData = {
    name: "",
    age: "",
    gender: "",
    race: "",
    weight: "",
    height: "",
    skinColor: "",
    characterClass: "",
    bodyType: "",
    strength: "",
    dexterity: "",
    constitution: "",
    intelligence: "",
    wisdom: "",
    charisma: "",
    background: "",
  };

  // Get selected gender
  const selectedGender = document.querySelector(".gender.highlight");
  characterData.gender = selectedGender
    ? selectedGender.textContent.trim()
    : "";

  // Get selected race
  const selectedRace = document.querySelector(".race-checkbox.highlight");
  characterData.race = selectedRace ? selectedRace.textContent.trim() : "";

  // Get selected class
  const selectedClass = document.querySelector(".class-checkbox.highlight");
  characterData.characterClass = selectedClass
    ? selectedClass.textContent.trim()
    : "";

  // Get selected background card and its associated description
  const selectedBackground = document.querySelector(".back-class.highlight");
  if (selectedBackground) {
    const charTextElement = selectedBackground.querySelector(".char-text");
    if (charTextElement) {
      characterData.background = charTextElement.textContent.trim();
    }
  }

  // Get entered age, name, and skin color
  characterData.age = document.getElementById("myAge").value.trim();
  characterData.name = document.getElementById("myName").value.trim();
  characterData.skinColor = document.getElementById("myColor").value.trim();

  // Get selected body type
  const selectedBodyType = document.querySelector(
    "input[name='bodyType']:checked"
  );
  characterData.bodyType = selectedBodyType ? selectedBodyType.value : "";

  characterData.height = document
    .getElementById("rangeValue")
    .textContent.trim();
  characterData.weight = document
    .getElementById("weightValue")
    .textContent.trim();
  // Get current attribute values
  characterData.strength = document.getElementById("myStr").textContent.trim();
  characterData.dexterity = document.getElementById("myDex").textContent.trim();
  characterData.constitution = document
    .getElementById("myCon")
    .textContent.trim();
  characterData.intelligence = document
    .getElementById("myInt")
    .textContent.trim();
  characterData.wisdom = document.getElementById("myWis").textContent.trim();
  characterData.charisma = document.getElementById("myCha").textContent.trim();

  return characterData;
}

// Add click event listener to the "Show Result" button
document.getElementById("showResultBtn").addEventListener("click", () => {
  // Collect character data first
  const characterData = collectCharacterData();

  // Display collected data
  const characterDisplay = document.getElementById("characterDisplay");
  characterDisplay.innerHTML = `
    <div class="character-info">
      <h2 class="big-text">Character Information</h2>
      <p class="small-text"><strong>Name:</strong> ${characterData.name}</p>
      <p class="small-text"><strong>Age:</strong> ${characterData.age}</p>
      <p class="small-text"><strong>Gender:</strong> ${characterData.gender}</p>
      <p class="small-text"><strong>Race:</strong> ${characterData.race}</p>
      <p class="small-text"><strong>Skin Color:</strong> <span style="display: inline-block; width: 20px; height: 20px; background-color: ${characterData.skinColor}; border: 1px solid black;"></span></p>
      <p class="small-text"><strong>Height:</strong> ${characterData.height}</p>
      <p class="small-text"><strong>Weight:</strong> ${characterData.weight}</p>
      <p class="small-text"><strong>Class:</strong> ${
        characterData.characterClass
      }</p>
      <p class="small-text"><strong>Body Type:</strong> ${
        characterData.bodyType
      }</p>
      <p class="small-text"><strong>Strength:</strong> ${
        characterData.strength
      }</p>
      <p class="small-text"><strong>Dexterity:</strong> ${
        characterData.dexterity
      }</p>
      <p class="small-text"><strong>Constitution:</strong> ${
        characterData.constitution
      }</p>
      <p class="small-text"><strong>Intelligence:</strong> ${
        characterData.intelligence
      }</p>
      <p class="small-text"><strong>Wisdom:</strong> ${characterData.wisdom}</p>
      <p class="small-text"><strong>Charisma:</strong> ${
        characterData.charisma
      }</p>
      ${
        characterData.background
          ? `<p class="small-text"><strong>Background:</strong> ${characterData.background}</p>`
          : ""
      }
    </div>
  `;
});
