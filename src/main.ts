import './style.css';

let year = new Date().getFullYear();

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 style = 'text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);'>${year}</h1>
    <div class="calendar" id="calender">
    </div>
  </div>
`

function setup(calendar: HTMLElement) {

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month_containers = months.map(month => {

    const element = document.createElement('div');

    const month_name = document.createElement('h2');

    month_name.innerHTML = month;
    month_name.className = 'month-name';

    element.append(month_name);

    return element;

  });

  month_containers.forEach((month_container, i) => generate_month(month_container, i));

  month_containers.forEach(container => calendar.appendChild(container));

};

function generate_month(container: HTMLElement, month_index: number) {

  const div = document.createElement('div');

  div.className = 'month';

  ['s', 'm', 't', 'w', 't', 'f', 's'].forEach(d => {

    const day = document.createElement('span');

    day.className = 'day';
    day.innerHTML = d;

    div.appendChild(day);

  });

  const offset = new Date(year, month_index, 1).getDay();

  for (let x = 0; x < offset; x++) {

    const date = document.createElement('span');

    div.appendChild(date);

  }

  const num_days = new Date(year, month_index + 1, 0).getDate();

  for (let x = 1; x <= num_days; x++) {

    const date = document.createElement('span');

    date.className = 'date';
    date.innerHTML = x.toString().padStart(2, '0');
    date.style.backgroundColor = `var(--green-${Math.floor(Math.random() * (10 - 5)) + 4}00)`

    div.appendChild(date);

  }

  container.appendChild(div);

}

setup(document.getElementById('calender')!);
