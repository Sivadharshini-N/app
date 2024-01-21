document.addEventListener("DOMContentLoaded", function () {
    // Load saved history from local storage on page load
    loadHistory();
});

function calculate() {
    // Get input values
    const unitSystem = document.getElementById('unitSystem').value;
   const heightInput = document.getElementById('height');
   const weightInput = document.getElementById('weight');
   const ageInput = document.getElementById('age');
   const gender = document.getElementById('gender').value;

    // Convert height to cm if using imperial units
   const convertedHeight = (unitSystem === 'imperial') ? heightInput.value * 2.54 : heightInput.value;

    // Calculate BMI
   let bmi = (weightInput.value / ((convertedHeight / 100) ** 2)).toFixed(2);

    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightInput.value) + (4.799 * convertedHeight) - (5.677 * ageInput.value);
    } else if (gender === 'female') {
        bmr = 447.593 + (9.247 * weightInput.value) + (3.098 * convertedHeight) - (4.330 * ageInput.value);
    }

    // Display results with BMI categories
    displayResults(bmi, bmr);

    // Save results to history
    saveToHistory(`BMI: ${bmi}, BMR: ${bmr.toFixed(2)} calories/day`);

    // Clear entered values
    clearValues(heightInput, weightInput, ageInput);
}

function displayResults(bmi, bmr) {
    // Get result elements
   let bmiResultElement = document.getElementById('bmiResult');
   let bmrResultElement = document.getElementById('bmrResult');

    // Display BMI result with category
    bmiResultElement.innerText = `BMI: ${bmi} - ${getBmiCategory(bmi)}`;

    // Display BMR result
    bmrResultElement.innerText = `BMR: ${bmr.toFixed(2)} calories/day`;
}

function getBmiCategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal Weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
}

function saveToHistory(result) {
    // Get current date and time
   let timestamp = new Date().toLocaleString();

    // Create history item
    const historyItem = `${timestamp} - ${result}`;

    // Get existing history from local storage
   let existingHistory = JSON.parse(localStorage.getItem('bmiBmrHistory')) || [];

    // Add new item to history
    existingHistory.push(historyItem);

    // Save updated history to local storage
    localStorage.setItem('bmiBmrHistory', JSON.stringify(existingHistory));

    // Reload and display updated history
    loadHistory();
}

function loadHistory() {
    // Get history list element
   let historyList = document.getElementById('historyList');

    // Get existing history from local storage
   let existingHistory = JSON.parse(localStorage.getItem('bmiBmrHistory')) || [];

    // Clear existing list items
    historyList.innerHTML = '';

    // Populate history list
    existingHistory.forEach(item => {
       let listItem = document.createElement('li');
        listItem.textContent = item;
        historyList.appendChild(listItem);
    });
}

function clearValues(...inputs) {
    // Clear entered values
    inputs.forEach(input => {
        input.value = '';
    });
}

function clearResults() {
    // Clear displayed results
    document.getElementById('bmiResult').innerText = 'BMI: ';
    document.getElementById('bmrResult').innerText = 'BMR: ';
}

function clearHistory() {
    // Clear history from local storage
    localStorage.removeItem('bmiBmrHistory');

    // Reload and display updated history (empty)
    loadHistory();
}