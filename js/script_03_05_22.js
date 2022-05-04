'use strict'

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    lvlValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item'),
    expensesItemBtn = document.getElementsByClassName('expenses-item-btn')[0],
    optionalExpensesBtn = document.getElementsByClassName('optionalexpenses-btn')[0],
    countBudgetBtn = document.getElementsByClassName('count-budget-btn')[0],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('.checksavings'),
    chooseSum = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    inputYearValue = document.querySelector('.year-value'),
    inputMonthValue = document.querySelector('.month-value'),
    inputDayValue = document.querySelector('.day-value');

let money,
    time;

expensesItemBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

startBtn.addEventListener('click', function(){
    
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == '' || money == null) {
        alert("Введи число дэган");
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    inputYearValue.value = new Date(Date.parse(time)).getFullYear();
    inputMonthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    inputDayValue.value = new Date(Date.parse(time)).getDate();

    expensesItemBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;

});

expensesItemBtn.addEventListener('click', function() {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
       
        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && (typeof(a)) != ''
            && (typeof(b)) != '' && a.length < 50) {
    
            appData.expenses[a] = b;
            sum += +b;
            
        } else {
    
            console.log('bad result');
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {

    for (let i = 0; i < optionalExpensesItem.length; i++) {
        
        let questionOptionalExpenses = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = questionOptionalExpenses;
        optExpensesValue.textContent += appData.optionalExpenses[i] + ', ';
     
    }

});

countBudgetBtn.addEventListener('click', function() {

    if (appData.budget != undefined) {
        
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
            if (appData.moneyPerDay < 100) {
                lvlValue.textContent = 'минимальный уровень достатка';
            } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
                lvlValue.textContent = 'средний уровень достатка';
            } else if (appData.moneyPerDay > 2000 ) {
                lvlValue.textContent = 'высокий уровень достатка';
            } else {
                lvlValue.textContent = 'Произошла ошибка';
            }
    } else {
        dayBudgetValue.textContent = 'Нажмите клавишу "Начать расчет"';
    }


});

chooseIncome.addEventListener('input', function() {

    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSum.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }

});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSum.value,
            percent = +choosePercent.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});



let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};