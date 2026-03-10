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

    alert(isValid)
    return isValiaisid;
}

mortgageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    validateForm();
})
