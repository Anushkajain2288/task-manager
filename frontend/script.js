// async function login() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await res.json();
//     localStorage.setItem("token", data.token);

//     alert("Login successful");
// }

function getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role;
}
const BASE_URL = "http://localhost:5000";

// ================= LOGIN =================
async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Login failed");
        }

    } catch (err) {
        console.error(err);
        alert("Server not reachable");
    }
}
// ================= SIGNUP (OPTIONAL) =================
async function signup() {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const res = await fetch(`${BASE_URL}/api/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await res.text();
        alert(data);

    } catch (error) {
        console.error(error);
        alert("Signup failed ❌");
    }
}


// ================= CREATE TASK =================
async function createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const assignedTo = document.getElementById("assignedTo").value;

    await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description,
            dueDate,
            assignedTo
        })
    });

    loadTasks();
}
// ================= LOAD TASKS =================
async function loadTasks() {
    try {
        const res = await fetch("http://localhost:5000/api/tasks");
        const tasks = await res.json();

        const taskList = document.getElementById("taskList");
        if (!taskList) return;

        taskList.innerHTML = "";

        // 🔐 Get role from token
        const token = localStorage.getItem("token");
        let role = null;

        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            role = payload.role;
        }

        tasks.forEach(task => {
            const div = document.createElement("div");
            div.className = "task";

            // 🔴 Overdue logic
            const isOverdue =
                task.dueDate &&
                new Date(task.dueDate) < new Date() &&
                task.status !== "done";

            div.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description || "No description"}</p>

                <p>Assigned To: 
                    ${task.assignedTo?.name || "Not assigned"}
                </p>

                <p>Due: 
                    ${task.dueDate 
                        ? new Date(task.dueDate).toDateString() 
                        : "No date"}
                </p>

                ${isOverdue ? '<p style="color:red;">⚠ Overdue</p>' : ''}

                <p>Status: 
                    <span style="color:${task.status === 'done' ? 'green' : 'red'}">
                        ${task.status}
                    </span>
                </p>

                <button onclick="markDone('${task._id}')">
                    Mark Done
                </button>

                ${
                    role === "admin"
                    ? `<button onclick="deleteTask('${task._id}')" style="background:red; margin-top:5px;">
                        Delete
                       </button>`
                    : ""
                }
            `;

            taskList.appendChild(div);
        });

    } catch (error) {
        console.error("Error loading tasks:", error);
    }
}
// ================= MARK TASK DONE =================
async function markDone(id) {
    try {
        await fetch(`${BASE_URL}/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "done" })
        });

        loadTasks();

    } catch (error) {
        console.error(error);
    }
}

async function loadUsers() {
    const res = await fetch("http://localhost:5000/api/auth/users");
    const users = await res.json();

    const select = document.getElementById("assignedTo");

    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user._id;
        option.textContent = user.name;
        select.appendChild(option);
    });
}

function restrictUI() {
    const role = getUserRole();

    if (role !== "admin") {
        const section = document.getElementById("createSection");
        if (section) section.style.display = "none";
    }
}

// ================= AUTO LOAD TASKS =================
window.onload = function () {
    loadTasks();
    loadUsers();
    restrictUI();  
};
// DELETE TASK
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}