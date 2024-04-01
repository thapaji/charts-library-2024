const taskList = [];
const entryTable = document.getElementById('entryList');
const alertElm = document.getElementsByClassName('alert-hour')[0];
const savedElm = document.getElementById('savedElm');

const handleSubmit = (form) => {
    const newForm = new FormData(form);
    const label = newForm.get('label');
    const data = +newForm.get('data');

    const obj = {
        label,
        data,
    }
    console.log(obj);
    taskList.push(obj);
    display();
    form.reset();
}


const display = () => {
    let strEntry = '';
    taskList.forEach((item, i) => {
        strEntry += `
    <tr>
    <td>${i}</td>
    <td>${item.label}</td>
    <td>${item.data}hrs</td>
    <td class="text-end">
      <button class="btn btn-danger btn-sm" onClick="handOnDelete(${i})"><i class="fa-solid fa-trash"></i></button>
    </td>
    </tr>`;
        // total += parseFloat(item.hour);

    });

    // alertElm.innerText = `Total hours allocated = ${total()}hrs`;
    entryTable.innerHTML = strEntry;
    createBarGraph(taskList);
}



const handOnDelete = (id) => {
    if (window.confirm("Are you sure, you want to delete the item?")) {
        taskList.splice(id, 1);
        display();
    }
}

const createBarGraph = (arrData) => {
    document.getElementById('bar-chart').innerHTML = '';
    // Find the maximum value in the data array
    const maxDataValue = Math.max(...arrData.map(obj => obj.data));

    // Calculate the height of each bar based on the maximum value
    const maxHeight = 100; // Max height of the bar graph

    // Create the bar graph
    const graphContainer = document.createElement('div');
    graphContainer.classList.add('bar-graph');
    graphContainer.classList.add('row');

    arrData.forEach(obj => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.classList.add('col');
        bar.classList.add('border');
        bar.classList.add('shadow-lg');
        bar.classList.add('mr-5');
        const barHeight = (obj.data / maxDataValue) * maxHeight;
        bar.style.height = `${barHeight}px`;
        bar.textContent = obj.data;

        const label = document.createElement('div');
        label.classList.add('label');
        label.textContent = obj.label;

        bar.appendChild(label);
        graphContainer.appendChild(bar);
    });
    document.getElementById('bar-chart').appendChild(graphContainer);
}



