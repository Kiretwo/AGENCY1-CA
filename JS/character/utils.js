// Get all elements with class countLabel
const countLabels = document.querySelectorAll(".countLabel");

// Function to handle reset action
function resetCountLabels() {
  countLabels.forEach((countLabel) => {
    countLabel.textContent = "1";
  });
}

// Get all elements with class decreaseBtn
const decreaseBtns = document.querySelectorAll(".decreaseBtn");

// Add click event listener to decrease buttons
decreaseBtns.forEach((decreaseBtn) => {
  decreaseBtn.addEventListener("click", () => {
    const countLabel = decreaseBtn.previousElementSibling;
    let count = parseInt(countLabel.textContent);
    if (count > 1) {
      count--;
      countLabel.textContent = count;
    }
  });
});

// Get all elements with class increaseBtn
const increaseBtns = document.querySelectorAll(".increaseBtn");

// Add click event listener to increase buttons
increaseBtns.forEach((increaseBtn) => {
  increaseBtn.addEventListener("click", () => {
    const countLabel =
      increaseBtn.previousElementSibling.previousElementSibling;
    let count = parseInt(countLabel.textContent);
    if (count < 18) {
      count++;
      countLabel.textContent = count;
    }
  });
});

// Get the reset button
const resetBtn = document.querySelector(".resetBtn");

// Add click event listener to reset button
resetBtn.addEventListener("click", resetCountLabels);

decreaseBtns.forEach((decreaseBtn, index) => {
  decreaseBtn.addEventListener("click", () => {
    const countLabel = countLabels[index];
    let count = parseInt(countLabel.textContent);
    if (count > 1) {
      count--;
      countLabel.textContent = count;
    }
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

document.querySelectorAll(".race-checkbox").forEach((box) => {
  box.addEventListener("click", () => {
    document.querySelectorAll(".race-checkbox").forEach((b) => {
      if (b !== box) {
        b.classList.remove("highlight");
      }
    });
    box.classList.toggle("highlight");
  });
});
