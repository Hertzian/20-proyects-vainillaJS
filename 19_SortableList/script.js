const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page',
];

// Store listItems
const listItems = [];

let dragStartIndex;

createList();

// Insert listItems into DOM
function createList(){
    [...richestPeople]
    // to random order list
    .map(a => ({value: a, sort: Math.random()}))
    // to sorting Math.random() and converting to Number default converts to srings
    .sort((a, b) => a.sort - b.sort)
    // to return string value of 'a'
    .map(a => a.value)
    // to generate list
    .forEach((person, index) => {
        // console.log(person)
        const listItem = document.createElement('li');

        // to custom attribute for convention uses 'data-'
        listItem.setAttribute('data-index', index);

        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

        listItems.push(listItem);

        draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart(){
    // console.log('Event: ', 'dragStart')
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log(dragStartIndex);

}

function dragOver(e){
    // console.log('Event: ', 'dragOver')
    // is getting in the way to swapItems
    e.preventDefault();
}

function dragDrop(){
    // console.log('Event: ', 'dragDrop')
    const dragEndIndex = +this.getAttribute('data-index');

    swapItemps(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function dragEnter(){
    // console.log('Event: ', 'dragEnter')
    this.classList.add('over');
}

function dragLeave(){
    // console.log('Event: ', 'dragLeave')
    this.classList.remove('over');
}

// Swap list items thar are drag and drop
function swapItemps(fromIndex, toIndex){
    // console.log(123);
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    // console.log(itemOne, itemTwo)
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

// check the order of list items
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();

        // if this false is in the wrong spot
        if(personName !== richestPeople[index]){
            listItem.classList.add('wrong');
        }else{
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners(){
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);
