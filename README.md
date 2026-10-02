# Expense Tracker

A full-stack web application designed to help manage personal finances. It allows users to track their spending by adding, editing, deleting, and reviewing expenses. All data is securely validated and persistently stored in a PostgreSQL database via an Express REST API.

## 🔗 Project Links

* **Live Demo Video:** [Watch the demo on Google Drive](https://drive.google.com/file/d/1cjdv_nt8Dv-mkPG5VnNhu5P7PGRne6LG/view?usp=sharing)
* **GitHub Repository:** [View source code on GitHub](https://github.com/Ahmadbashar/expense-tracker)

## 🚀 Features

- [x] **Add an expense** (with strict frontend and backend validation)
- [x] **Delete an expense** (with confirmation handling)
- [x] **Edit an expense** (via interactive modal)
- [x] **Filter by category** (dynamically updates table without mutating data)
- [x] **Summary cards** (real-time calculation of total, count, and highest expense)
- [x] **Data persistence** (saved securely in a PostgreSQL database)
- [x] **Live Search (Bonus):** Instantly filter the expense table by typing the title.
- [x] **Visual Breakdown (Bonus):** Integrated Chart.js doughnut chart to visualize spending by category.

## 🛠️ How to run

**Backend**
1. Open pgAdmin and create a new database named `expense_tracker`.
2. Open the Query Tool and execute the contents of `schema.sql` to create the table and insert the initial seed data.
3. Copy the `.env.example` file to a new file named `.env` and fill in your PostgreSQL credentials (`DB_PASSWORD`, `DB_USER`, etc.).
4. Open your terminal in the `backend` folder and run `npm install` to install dependencies (`express`, `cors`, `pg`, `dotenv`).
5. Run `node server.js` to start the backend server on `http://localhost:3000`.

**Frontend**
1. Open the `frontend` folder in VS Code.
2. Launch `index.html` using the Live Server extension to view the application in your browser. (The UI is dynamically rendered against the live API).

## 📸 Screenshots

### 1. GET /api/expenses
* **200 OK (All Expenses):** 
![GET All Expenses](screenshots/GetApiExpensesStatus200OK.png)
* **200 OK (By ID):** 
![GET Expense by ID](screenshots/GetApiExpensesIdStatus200OK.png)
* **404 Not Found (Invalid ID):** 
![GET Invalid ID](screenshots/GetApiExpensesStatusId404NotFound2.png)
* **404 Not Found (Non-existent ID):** 
![GET 404 Not Found](screenshots/GetApiExpensesStatusId404NotFound.png)

### 2. POST /api/expenses
* **201 Created:** 
![POST Created](screenshots/PostApiExpensesIdStatus201Created.png)
* **400 Bad Request (Missing Fields):** 
![POST Missing Fields](screenshots/PostApiExpensesIdStatus400BadRequest.png)
* **400 Bad Request (Invalid Amount):** 
![POST Invalid Amount](screenshots/PostApiExpensesIdStatus400BadRequest2.png)
* **400 Bad Request (Invalid Category):** 
![POST Invalid Category](screenshots/PostApiExpensesIdStatus400BadRequest3.png)

### 3. PUT /api/expenses/:id
* **200 OK (Updated successfully):** 
![PUT 200 OK](screenshots/PutApiExpensesIdStatus200OK.png)
* **400 Bad Request (Missing Fields):** 
![PUT Missing Fields](screenshots/PutApiExpensesIdStatus400BadRequest.png)
* **400 Bad Request (Invalid Category):** 
![PUT Invalid Category](screenshots/PutApiExpensesIdStatus400BadRequest2.png)
* **400 Bad Request (Invalid Amount):** 
![PUT Invalid Amount](screenshots/PutApiExpensesIdStatus400BadRequest3.png)
* **404 Not Found:** 
![PUT 404 Not Found](screenshots/PutApiExpensesIdStatus404NotFound.png)

### 4. DELETE /api/expenses/:id
* **200 OK (Deleted successfully):** 
![DELETE 200 OK](screenshots/DeleteApiExpensesIdStatus200OK.png)
* **404 Not Found:** 
![DELETE 404 Not Found](screenshots/DeleteApiExpensesIdStatus404NotFound.png)

### 5. Frontend UI & Bonus Features
* **Main Dashboard (Full View):** 
![Main Dashboard](screenshots/frontend-dashboard.png)
* **Dynamic Summary Cards:** 
![Summary Cards](screenshots/frontend-summary-cards.png)
* **Visual Breakdown - Chart.js (Bonus):** 
![Chart Breakdown](screenshots/frontend-chart-breakdown.png)
* **Add Expense Form:** 
![Add Expense](screenshots/frontend-add-expense.png)
* **Expenses Table & Dynamic Badges:** 
![Expenses Table](screenshots/frontend-expenses-table.png)
* **Category Filtering:** 
![Category Filter](screenshots/frontend-category-filter.png)
* **Live Search Filtering (Bonus):** 
![Live Search](screenshots/frontend-live-search.png)
* **Edit Expense Modal:** 
![Edit Modal](screenshots/frontend-edit-modal.png)
* **Mobile Responsive View:** 
![Mobile View](screenshots/mobile-view.png)

### 6. Error Handling & Edge Cases
* **Delete Confirmation:** 
![Delete Confirm](screenshots/frontend-delete-confirm.png)
* **Server Offline Alert:** 
![Error Alert](screenshots/frontend-error-alert.png)

## 💡 What was the hardest part?

The most challenging part was understanding the strict flow of HTTP responses in Express and avoiding the "Cannot set headers after they are sent to the client" crash. I learned that `return res.status().json()` must be used to stop code execution after an error. 

Additionally, connecting the frontend directly to the backend required careful State Management. Ensuring that the Summary Cards and the Chart.js breakdown updated perfectly alongside the Live Search filter—without mutating the original dataset—was a great exercise in utilizing JavaScript array methods (`filter`, `forEach`) and defensive programming.