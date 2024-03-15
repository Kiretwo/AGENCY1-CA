// Get all checkboxes
const checkboxes = document.querySelectorAll('.race-checkbox');

// Add event listener to each checkbox
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // Uncheck all checkboxes except the one that triggered the event
        checkboxes.forEach(cb => {
            if (cb !== this) {
                cb.checked = false;
            }
        });
    });
});
// Handle gender checkboxes
const genderCheckboxes = document.querySelectorAll('.gender-checkbox');
genderCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            genderCheckboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                }
            });
        }
    });
});