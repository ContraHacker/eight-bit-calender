import "./style.css";

let year = new Date().getFullYear();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1 style = 'text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.7);'>${year}</h1>
    <div class="calendar" id="calender">
    </div>
  </div>
`;

function setup(calendar: HTMLElement) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month_containers = months.map((month, i) => {
    const element = document.createElement("div");

    const month_name = document.createElement("h2");
    month_name.innerHTML = month;
    month_name.className = "month-name";

    element.append(month_name);

    element.append(generate_month(element, i));

    return element;
  });

  month_containers.forEach((month) => calendar.append(month));

  const today_string = new Date().toISOString().split("T")[0];
  const today = document.getElementById(today_string);

  today!.classList.add("today");
}

function generate_month(container: HTMLElement, month_index: number) {
  const month = document.createElement("div");

  month.className = "month";

  ["s", "m", "t", "w", "t", "f", "s"].forEach((d) => {
    const day = document.createElement("span");

    day.className = "day";
    day.innerHTML = d;

    month.append(day);
  });

  const offset = new Date(year, month_index, 1).getDay();

  for (let x = 0; x < offset; x++) {
    const date = document.createElement("span");
    month.append(date);
  }

  const num_days = new Date(year, month_index + 1, 0).getDate();

  for (let x = 1; x <= num_days; x++) {
    const date = document.createElement("span");

    date.className = "date";
    date.innerHTML = x.toString().padStart(2, "0");
    date.id = `${year}-${(month_index + 1).toString().padStart(2, "0")}-${x.toString().padStart(2, "0")}`;

    month.append(date);
  }

  container.append(month);

  return month;
}

setup(document.getElementById("calender")!);
