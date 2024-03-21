
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
  