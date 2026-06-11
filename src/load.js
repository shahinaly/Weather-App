export const loadTable = function () {
  const panel = document.querySelector(".panel-content");
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headerRow = document.createElement("tr");
  const th1 = document.createElement("th");
  const th2 = document.createElement("th");
  const th3 = document.createElement("th");
  const th4 = document.createElement("th");
  const th5 = document.createElement("th");

  th1.textContent = "";
  th2.textContent = "";
  th3.textContent = "Temp Min";
  th4.textContent = "Temp Max";
  th5.textContent = "Rain";

  headerRow.appendChild(th1);
  headerRow.appendChild(th2);
  headerRow.appendChild(th3);
  headerRow.appendChild(th4);
  headerRow.appendChild(th5);

  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 0; i < 7; i++) {
    const row = document.createElement("tr");

    const th = document.createElement("th");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");

    th.classList.add("datetime");
    td1.classList.add("icon");
    td2.classList.add("tempmin");
    td3.classList.add("tempmax");
    td4.classList.add("precip");

    row.appendChild(th);
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  panel.appendChild(table);
};
