const taskList = [];
const entryTable = document.getElementById('entryList');
const alertElm = document.getElementsByClassName('alert-hour')[0];
const savedElm = document.getElementById('savedElm');
const twklHr = 175;

const handleSubmit = (form) => {
    const newForm = new FormData(form);
    const task = newForm.get('label');
    const hour = +newForm.get('data');

    const obj = {
        task,
        hour,
    }
    console.log(obj);
    const prevTotal = displayTotal();
    if ((prevTotal + hour) > twklHr) {
        return alert('Sorry you do not have enough time left!!!!');
    }
    taskList.push(obj);
    display();
    displayTotal();
    form.reset();
}


const display = () => {
    let strEntry = '';
    taskList.forEach((item, i) => {
        strEntry += `
    <tr>
    <td>${i}</td>
    <td>${item.task}</td>
    <td>${item.hour}hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onClick="handOnDelete(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
    </tr>`;
        // total += parseFloat(item.hour);

    });

    // alertElm.innerText = `Total hours allocated = ${total()}hrs`;
    entryTable.innerHTML = strEntry;
}

const displayTotal = () => {
    const total = taskList.reduce((subTotal, item) => {
        return subTotal + item.hour;
    }, 0);
    alertElm.innerText = `Total hours allocated = ${total}hrs`;
    return total;
}

const handOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete the item?")) {
        taskList.splice(id, 1);
        display();
        displayTotal();
    }
}



