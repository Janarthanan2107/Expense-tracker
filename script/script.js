'use strict';
//inputs
const transactionEl = document.getElementById("transaction")
const amountEl = document.getElementById("amount")
const transactionTrackerEl = document.getElementById("transaction-tracker")
const submitEl = document.getElementById("submit")
//outputs
const listContainer = document.getElementById("list-container")
const balanceContainer = document.getElementById("balance")
const alertEl = document.getElementById("alert")
//global variable
let items = [
    { id: 1, transaction: "Dress", amount: -420 },
    { id: 2, transaction: "Team Amount", amount: -300 },
    { id: 3, transaction: "Rent", amount: -3000 },
    { id: 4, transaction: "Salary", amount: 15000 }
]
let balance = null
let negativeValue = 0

//functions
const init = () => {
    getData(items)
    balanceTemplate()
}

const getData = (item) => {
    listContainer.innerHTML = ""

    item.forEach(element => {
        listTemplate(element)
    });
}

const listTemplate = (item) => {
    const { id, transaction, amount } = item
    const type = amount > 0 ? "plus" : "minus";
    const list = document.createElement("div")
    list.classList.add("list")
    list.innerHTML = `<span class="${type}">
    <h4>${transaction}</h4>
    <p>${amount.toFixed(2)}</p>
    </span>
    <button onClick="deleteRow(${id})" class='btn'>Delete</button>
    `
    listContainer.appendChild(list)
}

const deleteRow = (id) => {
    items = items.filter((item) => item.id !== id)
    console.log(items)
    getData(items)
    balanceTemplate(items)
}

const balanceTemplate = () => {
    // Filter items with negative values
    const negativeItems = items.filter(item => item.amount < 0)
        .reduce((total, item) => total + item.amount, 0);

    // Filter items with positive values
    const positiveItems = items.filter(item => item.amount > 0)
        .reduce((total, item) => total + item.amount, 0);


    balance = Number(positiveItems) + negativeItems
    console.log(negativeItems)
    console.log(Number(positiveItems))
    console.log(balance)

    balanceContainer.innerHTML = `<p class="balance-amount">Balance: ${balance.toFixed(2)}</p> 
    <p class="expense-amount">Expenses: ${negativeItems.toFixed(2)}</p>`
}

const nullishValue = () => {
    transactionEl.value = null
    amountEl.value = null
    transactionTrackerEl.value = "Select your action"
}

const toast = () => {
    alertEl.style.display = "block"
}

//events
submitEl.addEventListener("click", () => {
    const transaction = transactionEl.value;
    const amount = Number(amountEl.value);
    const tracker = transactionTrackerEl.value;

    if (tracker === "expense") {
        negativeValue = -amount
    }
    // console.log(transaction, ":", tracker === "expense" ? negativeValue : amount)
    const newData = {
        id: Date.now(),
        transaction: transaction,
        amount: tracker === "expense" ? negativeValue : amount,
    }

    console.log(newData)
    items.push(newData)
    console.log(items)
    balanceTemplate()
    nullishValue()
    setTimeout(() => {
        toast()
    }, 3000);
    getData(items)

})

//initial settings
init();
