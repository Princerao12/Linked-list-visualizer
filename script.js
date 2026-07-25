const codeDisplay = document.getElementById("codeDisplay");

let list = [];

const container = document.getElementById("listContainer");
const status = document.getElementById("status");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawList(highlight = -1) {
    container.innerHTML = "";

    list.forEach((value, index) => {
        const node = document.createElement("div");
        node.className = "node";
        node.innerText = value;

        if (index === highlight) {
            node.style.background = "#ef4444";
        }

        container.appendChild(node);
    });
}

function showCode(type) {

    if (type === "insertBegin") {
        codeDisplay.textContent = `
void insertBeginning(int value)
{
    Node *newNode;

    newNode = (Node*)malloc(sizeof(Node));

    newNode->data = value;
    newNode->next = head;

    head = newNode;
}`;
    }

    else if (type === "insertEnd") {
        codeDisplay.textContent = `
void insertEnd(int value)
{
    Node *newNode;

    newNode = (Node*)malloc(sizeof(Node));

    newNode->data = value;
    newNode->next = NULL;

    if(head == NULL)
    {
        head = newNode;
        return;
    }

    Node *temp = head;

    while(temp->next != NULL)
    {
        temp = temp->next;
    }

    temp->next = newNode;
}`;
    }

    else if (type === "deleteBegin") {
        codeDisplay.textContent = `
void deleteBeginning()
{
    if(head == NULL)
        return;

    Node *temp = head;

    head = head->next;

    free(temp);
}`;
    }

    else if (type === "deleteEnd") {
        codeDisplay.textContent = `
void deleteEnd()
{
    if(head == NULL)
        return;

    Node *temp = head;

    while(temp->next->next != NULL)
    {
        temp = temp->next;
    }

    free(temp->next);
    temp->next = NULL;
}`;
    }

    else if (type === "search") {
        codeDisplay.textContent = `
void search(int key)
{
    Node *temp = head;

    while(temp != NULL)
    {
        if(temp->data == key)
        {
            printf("Found");
            return;
        }

        temp = temp->next;
    }

    printf("Not Found");
}`;
    }
}

async function insertBegin() {

    showCode("insertBegin");

    let value = document.getElementById("value").value;

    if (value === "")
        return alert("Enter a value");

    status.innerText = "Creating node...";

    await sleep(500);

    list.unshift(value);

    status.innerText = "Inserted at Beginning";

    drawList();
}

async function insertEnd() {

    showCode("insertEnd");

    let value = document.getElementById("value").value;

    if (value === "")
        return alert("Enter a value");

    status.innerText = "Creating node...";

    await sleep(500);

    list.push(value);

    status.innerText = "Inserted at End";

    drawList();
}

async function deleteBegin() {

    showCode("deleteBegin");

    if (list.length === 0)
        return;

    status.innerText = "Deleting first node...";

    await sleep(500);

    list.shift();

    status.innerText = "Deleted";

    drawList();
}

async function deleteEnd() {

    showCode("deleteEnd");

    if (list.length === 0)
        return;

    status.innerText = "Deleting last node...";

    await sleep(500);

    list.pop();

    status.innerText = "Deleted";

    drawList();
}

async function searchNode() {

    showCode("search");

    let value = document.getElementById("value").value;

    if (value === "")
        return;

    status.innerText = "Searching...";

    for (let i = 0; i < list.length; i++) {

        drawList(i);

        await sleep(700);

        if (list[i] == value) {

            status.innerText = "Found at Position " + (i + 1);

            return;
        }
    }

    drawList();

    status.innerText = "Not Found";
}

function resetList() {

    list = [];

    drawList();

    status.innerText = "List Reset";

    codeDisplay.textContent = "Select any operation to view C code...";
}

drawList();
