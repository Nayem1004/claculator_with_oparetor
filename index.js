var resultField = $("#result")

function insertNumber(number){
    var existingNumbers = resultField.val();
    $("#result").val(existingNumbers + number)
}

function clearResult(){
    resultField.val('')
}

function calculate(){
    try {
        var expression = resultField.val();
        if (!expression) return;

        if (expression.includes('%')) {
            handleModulus(expression);
            return;
        }

        var numbers = [];
        var operator = '';
        
        if (expression.includes('+')) {
            numbers = expression.split('+');
            operator = '+';
        } else if (expression.includes('-')) {
            numbers = expression.split('-');
            operator = '-';
        } else if (expression.includes('*')) {
            numbers = expression.split('*');
            operator = '*';
        } else if (expression.includes('/')) {
            numbers = expression.split('/');
            operator = '/';
        }

        if (numbers.length === 2) {
            var num1 = parseFloat(numbers[0]);
            var num2 = parseFloat(numbers[1]);

            if (isNaN(num1) || isNaN(num2)) {
                resultField.val('Error');
                return;
            }

            var result;
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 === 0) {
                        resultField.val('Error: Division by zero');
                        return;
                    }
                    result = num1 / num2;
                    break;
                default:
                    resultField.val('Error: Invalid operator');
                    return;
            }
            resultField.val(result);
        }
    } catch (error) {
        resultField.val('Error');
    }
}

function handleModulus(expression) {
    var numbers = expression.split('%');
    if (numbers.length === 2) {
        var num1 = parseFloat(numbers[0]);
        var num2 = parseFloat(numbers[1]);
        if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
            var result = num1 % num2;
            resultField.val(result);
        } else {
            resultField.val('Error');
        }
    }
}

function deleteNumber(){
    var presentValue = resultField.val();
    if(presentValue!=''){
        resultField.val(presentValue.slice(0, -1));
    }
}