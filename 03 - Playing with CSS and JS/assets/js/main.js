const inputs = document.querySelectorAll('.controls input'); // Correct selector
console.log(inputs);
function handleUpdate() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${this.id}`, `${this.value}${suffix}`) ;
}

// Attach event listeners to all inputs
inputs.forEach(input => input.addEventListener('input', handleUpdate));
inputs.forEach(input => input.addEventListener('change', handleUpdate));

