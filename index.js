"use strict";
const form = document.getElementById("form");
const input_title = document.getElementById("input_title");
const wrapper = document.getElementById("wrapper");
const modal = document.getElementById("modal");
const modalHaButton = document.querySelector(".btn-ha");
const modalYoqButton = document.querySelector(".btn-yoq");
let list = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input_title.value.length > 0) {
        list = [{ id: Date.now(), title: input_title.value }, ...list];
        render();
    }
    else {
        alert("Iltimos, todo sarlavhasini kiriting");
    }
});
function render() {
    let result = "";
    list.map((todo, index) => (result += `
        <div class="card">
            <h3>${index + 1 + ") "} ${todo.title}</h3>
            <div>
                <button class="btn-edit" onclick="editItem(${todo.id})">Edit</button>
                <button class="btn-delete" onclick="openModal(${todo.id})">Delete</button>
            </div>
        </div>
    `));
    list.length > 0 ? (wrapper.innerHTML = result) : (wrapper.innerHTML = "Todolar mavjud emas");
    input_title.value = "";
}
function deleteItem(id) {
    list = list.filter((todo) => todo.id !== id);
    render();
}
function editItem(id) {
    list = list.map((todo) => todo.id === id ? Object.assign(Object.assign({}, todo), { title: prompt("Todoni tahrirlang") || "" }) : todo);
    render();
}
function openModal(id) {
    modal.style.display = "block";
    modalHaButton.addEventListener("click", () => {
        deleteItem(id);
        closeModal();
    });
    modalYoqButton.addEventListener("click", () => {
        closeModal();
    });
    setTimeout(() => {
        closeModal();
    }, 5000);
}
function closeModal() {
    modal.style.display = "none";
}
render();
