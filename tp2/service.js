
let isAscOrder = true;
let offset = 0;
let limit = offset + 10;
let activeIndex = 1;

let usersList = users.map((item) => ({
    id: item.id,
    picture: item.image,
    firstName: item.firstName,
    lastName: item.lastName,
    birthdate: item.birthDate
}))

const createDataTable = () => {

    let body = document.querySelector("table tbody")
    if (body.hasChildNodes) {
        body.innerHTML = ""
    }
    let row = null;
    for (const user of usersList.slice(offset, limit)) {
        row = createRow(user);
        body.appendChild(row);
    }

    createPagenationBar()
}

const createRow = (columns) => {
    let tr = document.createElement("tr");
    let td, el;
    for (element of Object.keys(columns)) {
        td = document.createElement("td");
        if (element === "picture") {
            el = document.createElement("img");
            el.src = columns[element]
            el.width = 50;
        } else {
            el = document.createTextNode(columns[element]);
        }
        td.appendChild(el);
        tr.appendChild(td)
    }
    return tr;
}

const changePage = (i) => {
    offset = i * 10 - 10;
    limit = offset + 10 > usersList.length ? usersList.length : offset + 10;
    activeIndex = i;
    createDataTable()
}

const createPagenationBar = () => {
    
    const pagenbr = Math.ceil(users.length / 10);
    let pagenationContainer = document.querySelector("table tfoot #pagenation");
    if (pagenationContainer.hasChildNodes) {
        pagenationContainer.innerHTML = ""
    }
    for (let i = 1; i <= pagenbr; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = `btn text-white ${activeIndex === i ? "active" : ""}`;
        button.onclick = () => changePage(i);
        pagenationContainer.appendChild(button);
    }
}

const sortByColumn = (column) => {
    usersList = usersList.sort((a, b) => (
        isAscOrder ? compare(a[column], b[column]) :
            -(compare(a[column], b[column]))
    ));
    isAscOrder = !isAscOrder;

    createDataTable()

}

const compare = (a, b) => {
    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    }
    return 0
}