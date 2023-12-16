const form = document.getElementById("form") as HTMLFormElement;
const input_title = document.getElementById("input_title") as HTMLInputElement;
const wrapper = document.getElementById("wrapper") as HTMLDivElement;
const modal = document.getElementById("modal") as HTMLDivElement;
const modalHaButton = document.querySelector(".btn-ha") as HTMLButtonElement;
const modalYoqButton = document.querySelector(".btn-yoq") as HTMLButtonElement;
let list: { id: number; title: string }[] = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input_title.value.length > 0) {
        list = [{ id: Date.now(), title: input_title.value }, ...list];
        render();
    } else {
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

function deleteItem(id: number) {
    list = list.filter((todo) => todo.id !== id);
    render();
}

function editItem(id: number) {
    list = list.map((todo) =>
        todo.id === id ? { ...todo, title: prompt("Todoni tahrirlang") || "" } : todo
    );
    render();
}

function openModal(id: number) {
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