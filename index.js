const URL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

const getData = async () => {
  const response = await fetch(URL, {
    method: "GET",
  });
  return response.json();
};

const primeraTabla = document.getElementsByTagName("tbody")[0];
const segundaTabla = document.getElementsByTagName("tbody")[1];

let num = 1;

let singleEvents = [];

let listaDeDatos = [];

getData().then((data) => {
  listaDeDatos = data;
  data.forEach((event) => {
    event.events.forEach((e) => {
      if (singleEvents.filter((s) => s.id === e).length === 0) {
        singleEvents.push({
          id: e,
          TP: 0,
          FP: 0,
          FN: 0,
          TN: 0,
        });
      }
    });
    let row = document.createElement("tr");

    let numtd = document.createElement("th");
    numtd.innerHTML = num;
    numtd.setAttribute("scope", "row");
    row.appendChild(numtd);

    let events = document.createElement("td");
    events.innerHTML = event.events.join(", ");
    row.appendChild(events);

    let squirrel = document.createElement("td");
    squirrel.innerHTML = event.squirrel;
    if (event.squirrel == true) {
      row.classList.add("bg-danger");
      row.classList.add("text-white");
    }

    row.appendChild(squirrel);

    primeraTabla.appendChild(row);
    num++;
  });

  singleEvents.forEach((e) => {
    listaDeDatos.forEach((event) => {
      if (event.events.includes(e.id) && event.squirrel == true) {
        e.TP++;
      } else if (event.events.includes(e.id) && event.squirrel == false) {
        e.FP++;
      } else if (!event.events.includes(e.id) && event.squirrel == false) {
        e.TN++;
      } else if (!event.events.includes(e.id) && event.squirrel == true) {
        e.FN++;
      }
    });
  });
  let num2 = 1;

  singleEvents.forEach((e) => {
    let row2 = document.createElement("tr");

    let numtd2 = document.createElement("th");
    numtd2.innerHTML = num2;
    numtd2.setAttribute("scope", "row");
    row2.appendChild(numtd2);

    let event = document.createElement("td");
    event.innerHTML = e.id;
    row2.appendChild(event);

    let correlation = document.createElement("td");
    correlation.innerHTML =
      (e.TP * e.TN - e.FP * e.FN) /
      Math.sqrt((e.TP + e.FP) * (e.TP + e.FN) * (e.TN + e.FP) * (e.TN + e.FN));
    row2.appendChild(correlation);
    segundaTabla.appendChild(row2);

    num2++;
  });
});
