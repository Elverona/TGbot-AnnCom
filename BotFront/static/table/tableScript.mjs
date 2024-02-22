function tableSearch() {
  var phrase = document.getElementById("searchName");
  var table = document.getElementById("mainTable");
  var regPhrase = new RegExp(phrase.value, "i");
  var flag = false;
  for (var i = 0; i < table.rows.length; i++) {
    flag = false;
    for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
      flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
      if (flag) break;
    }
    if (flag) {
      table.rows[i].style.display = "";
    } else {
      table.rows[i].style.display = "none";
    }
  }
}

function createFilter() {
  const dateBox = document.createElement("div");
  dateBox.className = "dateBox";

  const startDate = document.createElement("input");
  startDate.type = "date";
  startDate.className = "startDate";

  const endDate = document.createElement("input");
  endDate.type = "date";
  endDate.className = "endDate";

  const dash = document.createElement("label");
  dash.className = "dash";
  dash.textContent = " - ";

  const searchDate = document.createElement("button");
  searchDate.className = "searchDate";
  searchDate.textContent = "Отфильтровать";

  searchDate.addEventListener("click", () => {
    if (document.querySelector(".backTTF")) {
      document.querySelector(".backTTF").remove();
    }
    const tr = document.getElementsByClassName("database");

    const backTTF = document.createElement("button");
    backTTF.textContent = "Назад";
    backTTF.className = "backTTF";
    document.body.prepend(backTTF);

    backTTF.addEventListener("click", () => {
      const mainTable = document.querySelector(".mainTable");
      mainTable.remove();
      backTTF.remove();
      createTable();
    });

    for (var i = 0; i < tr.length; i++) {
      var td = tr[i].getElementsByClassName("date")[0];
      let td_date = td.innerHTML;
      td_date =
        td_date.substr(6, 4) +
        "-" +
        td_date.substr(3, 2) +
        "-" +
        td_date.substr(0, 2);

      let start = startDate.value;
      let end = endDate.value;
      if (td_date < start || end < td_date) {
        tr[i].style.position = "absolute";
        tr[i].style.visibility = "hidden";
      }
    }
  });
  const searchName = document.createElement("input");
  searchName.className = "searchName";
  searchName.id = "searchName";
  searchName.placeholder = "Поиск...";
  searchName.addEventListener("keyup", () => {
    tableSearch();
  });

  document.body.append(dateBox, searchDate, searchName);
  dateBox.append(startDate, dash, endDate);
}

function createTable() {
  const mainTable = document.createElement("table");
  mainTable.className = "mainTable";
  mainTable.id = "mainTable";
  const tbody = document.createElement("tbody");

  const regDateHead = document.createElement("th");
  regDateHead.textContent = "дата РЕГ.";

  const timeRegHead = document.createElement("th");
  timeRegHead.textContent = "время РЕГ.";

  const userIdHead = document.createElement("th");
  userIdHead.textContent = "User ID";

  const firstNameHead = document.createElement("th");
  firstNameHead.textContent = "TG (name)";

  const userNameHead = document.createElement("th");
  userNameHead.textContent = "Username";

  // Данные юзеров
  const data_users = document.getElementById("json").innerHTML;
  console.log(data_users);

  var newJson = data_users.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  newJson = newJson.replace(/'/g, '"');

  var data = JSON.parse(newJson);

  for (let subscriber of data) {
    const row = document.createElement("tr");
    row.className = "database";

    const rowRegDate = document.createElement("td");
    rowRegDate.className = "date";
    rowRegDate.textContent = subscriber.time;

    const rowTimeReg = document.createElement("td");
    rowTimeReg.textContent = subscriber.registrationTime;

    const rowFirstName = document.createElement("td");
    rowFirstName.textContent = subscriber.name;

    const rowUsername = document.createElement("td");
    rowUsername.textContent = subscriber.user_name;

    const rowUserId = document.createElement("td");
    rowUserId.textContent = subscriber.user_id;

    row.append(rowRegDate, rowFirstName, rowUserId, rowUsername);
    tbody.append(row);
  }

  mainTable.append(regDateHead, firstNameHead, userIdHead, userNameHead);
  mainTable.append(tbody);
  document.body.append(mainTable);
}

const switchTable = document.createElement("button");
switchTable.className = "switchTable";
switchTable.textContent = "Сменить таблицу";

switchTable.addEventListener("click", () => {
  window.location.href = "/data";
});

document.body.append(switchTable);

createFilter();
createTable();

var getCellValue = function (tr, idx) {
  return tr.children[idx].innerText || tr.children[idx].textContent;
};

var comparer = function (idx, asc) {
  return function (a, b) {
    return (function (v1, v2) {
      return v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2)
        ? v1 - v2
        : v1.toString().localeCompare(v2);
    })(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));
  };
};

Array.prototype.slice
  .call(document.querySelectorAll("th"))
  .forEach(function (th) {
    th.addEventListener("click", function () {
      var table = th.parentNode;
      while (table.tagName.toUpperCase() != "TABLE") table = table.parentNode;
      Array.prototype.slice
        .call(table.querySelectorAll("tr:nth-child(n+1)"))
        .sort(
          comparer(
            Array.prototype.slice.call(th.parentNode.children).indexOf(th),
            (this.asc = !this.asc)
          )
        )
        .forEach(function (tr) {
          table.appendChild(tr);
        });
    });
  });
