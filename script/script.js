// SELECTORS
const mortgageForm = document.getElementById('mortgageForm');
const clearBtn = document.getElementById('clearBtn');
const amountInput = document.getElementById('amount');
const termInput = document.getElementById('term');
const rateInput = document.getElementById('rate');
const calculateBtn = document.getElementById('calculateBtn');
const resultsDefault = document.getElementById('resultsDefault');
const resultsState = document.getElementById('resultsState');
const monthlyResult = document.getElementById('monthlyResult');
const totalResult = document.getElementById('totalResult');

// ERRORS
const amountError = document.getElementById('amountError');
const termError = document.getElementById('termError');
const rateError = document.getElementById('rateError');
const typeError = document.getElementById('typeError');

// RADIO BUTTON HIGHLIGHT WHEN CLICK
const radioOptions = document.querySelectorAll('.radioOption');

radioOptions.forEach((option) => 
{
    option.addEventListener('click', () =>
    {
        // Remove selected class from all options
        radioOptions.forEach(opt => opt.classList.remove('selected'));
    
        // Add selected class to clicked option
        option.classList.add('selected');
    });  
});


// VALIDATE FORM
function validateForm()
{
    let isValid = true;

    document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('visible'));
    document.querySelectorAll('.inputWrapper').forEach(i => i.classList.remove('error'));

    // CHECK AMOUNT
    if (!amountInput.value || amountInput.value <= 0)
    {
        amountError.classList.add('visible');
        amountInput.closest('.inputWrapper').classList.add('error')
        isValid = false;
    }

    // CHECK TERM
    if (!termInput.value || termInput.value <= 0)
    {
        termError.classList.add('visible');
        termInput.closest('.inputWrapper').classList.add('error')
        isValid = false;
    }

    // CHECK RATE
    if (!termInput.value || termInput.value <= 0)
    {
        rateError.classList.add('visible');
        rateInput.closest('.inputWrapper').classList.add('error')
        isValid = false;
    }

    // CHECK MORTGAGE TYPE
    const selectedType = document.querySelector('input[name="type"]:checked');
    if (!selectedType)
    {
        rateError.classList.add('visible');
        isValid = false;
    }

    return isValid;
}

// CALCULATE
function calculate()
{
    const principal = parseFloat(amountInput.value);
    const years = parseFloat(termInput.value);
    const annualRate = parseFloat(rateInput.value);
    const type = document.querySelector('input[name="type"]:checked').value;

    const monthlyRate = (annualRate / 100) / 12;
    const totalMonths = 12;

    let monthlyPayment;
    let totalPayment;

    if (type === 'repayment')
    {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
        totalPayment = monthlyPayment * totalMonths;
    }
    else // Interest Only
    {
        monthlyPayment = principal * monthlyRate;
        totalPayment = monthlyPayment * totalMonths;
    }

    // Display Results
    monthlyResult.textContent = '$' + monthlyPayment.toFixed(2).replace(/\B(?=(\d{3}) + (?!\d))/g, ',');
    totalResult.textContent = '$' + totalPayment.toFixed(2).replace(/\B(?=(\d{3}) + (?!\d))/g, ',')
}

// Clear Button
clearBtn.addEventListener('click', () => 
{
    // Reset form fields
    mortgageForm.reset();

    document.querySelectorAll('.error-msg').forEach(e => e.classList.remove('visible'));
    document.querySelectorAll('.inputWrapper').forEach(i => i.classList.remove('error'));

    radioOptions.forEach(opt => opt.classList.remove('selected'));

    resultsDefault.classList.remove('hidden');
    resultsState.classList.add('hidden');

    monthlyResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
})

mortgageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm())
    {
        calculate();
        resultsDefault.classList.add('hidden');
        resultsState.classList.remove('hidden')
    }
});
