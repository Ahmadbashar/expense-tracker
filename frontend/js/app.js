// Expense Tracker - frontend logic
// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.
//
// A possible structure (change it if you have a better idea):
//   - async function getExpenses()          fetch(API_URL), return the JSON
//   - async function addExpense(data)       fetch(API_URL, { method: "POST", ... })
//   - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... })
//   - async function deleteExpense(id)      fetch(API_URL + "/" + id, { method: "DELETE" })
//   - async function refresh()              get the list, then call renderTable and renderSummary
//   - renderTable(list)                     build the table rows from the array the API returned
//   - renderSummary(list)                   update the summary cards
//   - applyFilter()                         re-render with the list filtered by category
//
// Don't forget:
//   - Show a Bootstrap spinner while a request is in flight.
//   - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
//   - After add, edit, or delete, call refresh() so the page always shows
//     what the server actually saved - never update the table by hand.
//   - The API is at http://localhost:3000/api/expenses (see the Roadmap).





const API_URL = "http://localhost:3000/api/expenses";
const addForm =document.getElementById("add-expense-form");
const editForm= document.getElementById("edit-expense-form");
const spinner = document.getElementById("loading-spinner");
const filterCategory = document.getElementById("select-category");

const ctx = document.getElementById('expensesChart');
let myChart;

const searchTitleInput= document.getElementById("search-title");


function showBootstrapAlert(message) {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show shadow-sm" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    
    setTimeout(() => {
        alertContainer.innerHTML = "";
    }, 5000);
}

async function getExpenses(){
    try{
      const response= await fetch(API_URL);
      if(!response.ok){
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to fetch data');
      }
      const data = await response.json();
      return data;

    }catch(err){
        console.error(err);
        const errorMsg = err.message === "Failed to fetch" ? "Error loading expenses! Server might be offline." : err.message;
        showBootstrapAlert(errorMsg);
        return [];
    }
}
async function addExpense(data){
    try{
         const response = await fetch(API_URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
         });
         if(!response.ok){
             const ErrData =await response.json();
             throw new Error(ErrData.error || 'Failed to add expense');
         }
         const newExpense = await response.json();
         return newExpense;

    }catch(err){
          console.error(err);
           const errorMsg = err.message === "Failed to fetch" ? "Error adding expense! Server might be offline." : err.message;
          showBootstrapAlert(errorMsg);
    }
}

async function updateExpense(id,data){
    if(isNaN(id)){
        throw new Error("The id is not available");
    }
    try{
       const response= await fetch(`${API_URL}/${id}`,{
        method:"PUT",
        headers:{
        "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
       })
       if(!response.ok){
         const ErrData = await response.json();
         throw new Error(ErrData.error || 'Failed to update expense');
       }
       const updatedata =await response.json();
       return updatedata;
    }catch(err){
        console.error(err);
        const errorMsg = err.message === "Failed to fetch" ? "Error updating expense! Server might be offline." : err.message;
        showBootstrapAlert(errorMsg);
        return null;
    }
}

async function deleteExpense(id){
    if(isNaN(id)){
        throw new Error("The id is not available");
    }
    try{
        const response =await fetch(`${API_URL}/${id}`,{
            method:"DELETE"
        });
        if(!response.ok){
            const ErrData = await response.json();
            throw new Error(ErrData.error || 'Failed to delete expense');
        }
        const deleteData =await response.json();
        return deleteData;
        
    }catch(err){
        console.error(err);
        const errorMsg = err.message === "Failed to fetch" ? "Error deleting expense! Server might be offline." : err.message;
        showBootstrapAlert(errorMsg);
        return null;
    }
}

async function refresh(){
    
    spinner.classList.remove("d-none");

    const expenses= await getExpenses();
    renderTable(expenses);
    renderSummary(expenses);
    renderChart(expenses);

    spinner.classList.add("d-none");
}



function renderTable(list){
   const tbody = document.getElementById("expense-table-body");
   tbody.innerHTML ="";
   const color = ["success","primary","warning","info","secondary"];
   
   list.forEach(expense => {
    let colorBadgeCatefory;
   if(expense.category === "Food"){
     colorBadgeCatefory = color[0];
   }else if(expense.category === "Transport"){
     colorBadgeCatefory = color[1];
   }else if(expense.category === "Bills"){
     colorBadgeCatefory = color[2];
   }else if(expense.category === "Entertainment"){
     colorBadgeCatefory = color[3];
   }else{
    colorBadgeCatefory = color[4];
   }
    const tr =document.createElement("tr");
    
    tr.innerHTML=
    `   <td>${expense.title}</td>
        <td class="text-end">${expense.amount}</td>
        <td><span class="badge bg-${colorBadgeCatefory}">${expense.category}</span></td> 
        <td>${expense.date}</td>
        <td class="text-end">
           <div class="d-flex flex-column flex-md-row justify-content-end gap-1">
            <button class="btn btn-sm btn-outline-primary px-2">Edit</button>
            <button class="btn btn-sm btn-outline-danger px-2">Delete</button>
           </div>
        </td>
    `;

     const deleteBtn = tr.querySelector(".btn-outline-danger");
     deleteBtn.addEventListener("click",async()=>{
        if(confirm("Are you sure you want to delete this expense?")){
            const isDeleted =await deleteExpense(expense.id);
            if (isDeleted) {
                refresh();
            }
        }
     });

     const editBtn = tr.querySelector(".btn-outline-primary");
     editBtn.addEventListener("click",()=>{
        document.getElementById("edit-title").value = expense.title;
        document.getElementById("edit-amount").value = expense.amount;
        document.getElementById("edit-category").value = expense.category;
        document.getElementById("edit-date").value = expense.date;
        document.getElementById("edit-id").value = expense.id;
        

        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
     });
     

    tbody.appendChild(tr);
   });
}
function renderSummary(list){
    const summaryTotal = document.getElementById("summary-total");
    const summaryCount = document.getElementById("summary-count");
    const summaryHighestAmount = document.getElementById("summary-highest-amount");
    const summaryHighestTitle =document.getElementById("summary-highest-title");
    
   let total= 0;
   list.forEach(data=>{
    total += data.amount;
   })
   summaryTotal.innerHTML=total.toFixed(2);
   let count = list.length;
   
   summaryCount.innerHTML=count;
   let highestAmount=0;
   let highestTitle="";
   list.forEach(data=>{
    if(highestAmount< data.amount){
         highestAmount =data.amount;
         highestTitle = data.title;
    }
   })
   summaryHighestAmount.innerHTML = highestAmount;
   summaryHighestTitle.innerHTML = highestTitle || "No expenses";


}

addForm.addEventListener("submit",async event=>{
     event.preventDefault();
     const titleValues =document.getElementById("title").value;
     const amountValue =parseFloat(document.getElementById("amount").value);
     const categoryValue =document.getElementById("category").value;
     const dateValue =document.getElementById("date").value;
     
     const newExpenseData ={
        title:titleValues,
        amount:amountValue,
        category:categoryValue,
        date:dateValue
     }
     const isAdded = await addExpense(newExpenseData);
     if(isAdded){
        refresh();
        addForm.reset();
     }
})

editForm.addEventListener("submit",async event =>{
    event.preventDefault();
    const id = document.getElementById("edit-id").value;
    const updatedData ={
          title: document.getElementById("edit-title").value,
          amount: parseFloat(document.getElementById("edit-amount").value),
          category: document.getElementById("edit-category").value,
          date: document.getElementById("edit-date").value
    }
    const isUpdated =await updateExpense(id,updatedData);
    if(isUpdated){
       refresh();
       const editModalInstance = bootstrap.Modal.getInstance(document.getElementById('editModal'));
       editModalInstance.hide();
    }
})

filterCategory.addEventListener("change",async(event)=>{
    spinner.classList.remove("d-none");
    const selectedCategory= event.target.value;
    const allExpenses = await getExpenses();
    let filteredExpenses ;
    if(selectedCategory === "All"){
       filteredExpenses = allExpenses;
    }else{
    filteredExpenses = allExpenses.filter(data => data.category === selectedCategory);
    }
    renderTable(filteredExpenses);
    renderSummary(allExpenses);
    spinner.classList.add("d-none");

})


function renderChart(list) {
    let foodTotal = 0;
    let transportTotal = 0;
    let billsTotal = 0;
    let entertainmentTotal = 0;
    let otherTotal = 0;

    list.forEach(expense => {
        if(expense.category === "Food") foodTotal += expense.amount;
        else if(expense.category === "Transport") transportTotal += expense.amount;
        else if(expense.category === "Bills") billsTotal += expense.amount;
        else if(expense.category === "Entertainment") entertainmentTotal += expense.amount;
        else if(expense.category === "Other") otherTotal += expense.amount;
    });

    const aggregatedData = [foodTotal, transportTotal, billsTotal, entertainmentTotal, otherTotal];

    
    if (myChart) {
        myChart.destroy();
    }
    
    myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'],
            datasets: [{
                label: 'Total Amount',
                data: aggregatedData,
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: false
        }
    });
}

searchTitleInput.addEventListener("input",async event=>{
      const input = event.target.value.toLowerCase();
      const allExpenses = await getExpenses();
      let filterTable= allExpenses.filter(expense=>{
        return expense.title.toLowerCase().includes(input);
      }) ;
      renderTable(filterTable);
      renderSummary(allExpenses);

      if (typeof renderChart === "function") {
        renderChart(allExpenses);
      }
});

refresh();
