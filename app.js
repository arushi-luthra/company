// Mock data for users, tasks, and leaves
const users = [
    { username: 'admin', password: 'adminpass', role: 'admin' },
    { username: 'employee', password: 'employeepass', role: 'employee' }
];

let employees = [];
let tasks = [];
let employeeTasks = [];
let leaveRequests = []; // Employee leaves to be approved
let leaveApprovalList = []; // Leaves approved/rejected

// Login functionality
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('role', user.role);
        showDashboard(user.role);
    } else {
        document.getElementById('login-error').textContent = 'Invalid username or password';
    }
}

// Show the correct dashboard based on role
function showDashboard(role) {
    document.getElementById('login-page').style.display = 'none';

    if (role === 'admin') {
        document.getElementById('admin-dashboard').style.display = 'block';
        renderEmployees();
        renderTasks();
        renderLeaveRequestsForApproval();
    } else if (role === 'employee') {
        document.getElementById('employee-dashboard').style.display = 'block';
        renderEmployeeTasks();
        renderLeaveRequests();
    }
}

// Logout functionality
function logout() {
    localStorage.removeItem('role');
    document.getElementById('login-page').style.display = 'block';
    document.getElementById('admin-dashboard').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'none';
    document.getElementById('settings-page').style.display = 'none';
}

// Add employee (Admin functionality)
function addEmployee() {
    const employeeName = document.getElementById('employee-name').value;
    if (employeeName) {
        employees.push(employeeName);
        document.getElementById('employee-name').value = '';
        renderEmployees();
    }
}

// Render the employee list (Admin functionality)
function renderEmployees() {
    const employeeList = document.getElementById('employee-list');
    employeeList.innerHTML = '';
    employees.forEach(employee => {
        const li = document.createElement('li');
        li.textContent = employee;
        employeeList.appendChild(li);
    });
}

// Assign task to employees (Admin functionality)
function assignTask() {
    const taskName = document.getElementById('task-name').value;
    if (taskName) {
        tasks.push(taskName);
        employeeTasks.push(taskName);
        document.getElementById('task-name').value = '';
        renderTasks();
    }
}

// Render tasks (Admin functionality)
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
}

// Render employee's assigned tasks (Employee functionality)
function renderEmployeeTasks() {
    const employeeTaskList = document.getElementById('employee-task-list');
    employeeTaskList.innerHTML = '';
    employeeTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        employeeTaskList.appendChild(li);
    });
}

// Submit work report (Employee functionality)
function submitReport() {
    const report = document.getElementById('work-report').value;
    if (report) {
        document.getElementById('work-report').value = '';
        document.getElementById('report-status').textContent = 'Report submitted successfully!';
    }
}

// Request leave (Employee functionality)
function requestLeave() {
    const start = document.getElementById('leave-start').value;
    const end = document.getElementById('leave-end').value;
    if (start && end) {
        leaveRequests.push({ start, end, status: 'Pending' });
        document.getElementById('leave-start').value = '';
        document.getElementById('leave-end').value = '';
        renderLeaveRequests();
    }
}

// Render leave requests for employees (Employee functionality)
function renderLeaveRequests() {
    const leaveList = document.getElementById('leave-list');
    leaveList.innerHTML = '';
    leaveRequests.forEach(request => {
        const li = document.createElement('li');
        li.textContent = `From: ${request.start} To: ${request.end} - ${request.status}`;
        leaveList.appendChild(li);
    });
}

// Render leave requests for admin approval (Admin functionality)
function renderLeaveRequestsForApproval() {
    const leaveApprovalList = document.getElementById('leave-approval-list');
    leaveApprovalList.innerHTML = '';
    leaveRequests.forEach((request, index) => {
        const li = document.createElement('li');
        li.textContent = `From: ${request.start} To: ${request.end} - ${request.status}`;
        const approveButton = document.createElement('button');
        approveButton.textContent = 'Approve';
        approveButton.onclick = () => approveLeave(index);
        const rejectButton = document.createElement('button');
        rejectButton.textContent = 'Reject';
        rejectButton.onclick = () => rejectLeave(index);
        li.appendChild(approveButton);
        li.appendChild(rejectButton);
        leaveApprovalList.appendChild(li);
    });
}

// Approve leave (Admin functionality)
function approveLeave(index) {
    leaveRequests[index].status = 'Approved';
    renderLeaveRequestsForApproval();
    renderLeaveRequests();
    document.getElementById('leave-notification').textContent = 'Your leave has been approved!';
}

// Reject leave (Admin functionality)
function rejectLeave(index) {
    leaveRequests[index].status = 'Rejected';
    renderLeaveRequestsForApproval();
    renderLeaveRequests();
    document.getElementById('leave-notification').textContent = 'Your leave has been rejected.';
}

// Show settings page
function showSettings() {
    document.getElementById('employee-dashboard').style.display = 'none';
    document.getElementById('settings-page').style.display = 'block';
}

// Back to dashboard from settings
function backToDashboard() {
    document.getElementById('settings-page').style.display = 'none';
    document.getElementById('employee-dashboard').style.display = 'block';
}

// Change password functionality (Mock, no actual security)
function changePassword() {
    const newPassword = document.getElementById('new-password').value;
    if (newPassword) {
        document.getElementById('new-password').value = '';
        document.getElementById('password-status').textContent = 'Password changed successfully!';
        document.getElementById('leave-notification').textContent = 'Your settings have been updated!';
    }
}

// Check for session on page load
document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('role');
    if (role) {
        showDashboard(role);
    }
});
