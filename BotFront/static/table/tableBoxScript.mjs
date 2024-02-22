function createArray(arr) {
  var newJson = arr.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
  newJson = newJson.replace(/'/g, '"');
  var data = JSON.parse(newJson);
  return data;
}

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
    const tr = document.getElementsByClassName("database");

    const backTTF = document.createElement("button");
    backTTF.textContent = "Назад";
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
  tbody.className = "tBody";

  const regDateHead = document.createElement("th");
  regDateHead.textContent = "дата РЕГ.";

  const firstNameHead = document.createElement("th");
  firstNameHead.textContent = "TG (first_name)";

  const userNameHead = document.createElement("th");
  userNameHead.textContent = "TG (username)";

  const boxHead = document.createElement("th");
  boxHead.textContent = "Название коробки";

  const companyHead = document.createElement("th");
  companyHead.textContent = "Компания";

  const numberHead = document.createElement("th");
  numberHead.textContent = "Номер телефона";

  const emailHead = document.createElement("th");
  emailHead.textContent = "e-mail";

  const CRMNameHead = document.createElement("th");
  CRMNameHead.textContent = "Название CRM";

  mainTable.append(
    regDateHead,
    firstNameHead,
    userNameHead,
    boxHead,
    companyHead,
    numberHead,
    emailHead,
    CRMNameHead
  );
  mainTable.append(tbody);
  document.body.append(mainTable);
  const data_site = document.getElementById("json2").innerHTML;

  const data_bot = document.getElementById("json3").innerHTML;

  const data = createArray(data_site);
  const data2 = createArray(data_bot);

  createData(data);
  createDataBot(data2);
}

function createData(data) {
  for (let subscriber of data) {
    const row = document.createElement("tr");
    row.className = "database";

    const rowRegDate = document.createElement("td");
    rowRegDate.className = "date";
    rowRegDate.textContent = subscriber.time;

    const rowFirstName = document.createElement("td");
    rowFirstName.textContent = subscriber.name;

    const rowUsername = document.createElement("td");
    rowUsername.textContent = subscriber.username;

    const rowBox = document.createElement("td");
    rowBox.textContent = subscriber.card;

    const rowCompany = document.createElement("td");
    rowCompany.textContent = subscriber.company;

    const rowNumber = document.createElement("td");
    rowNumber.textContent = subscriber.phone;

    const rowName = document.createElement("td");
    rowName.textContent = subscriber.email;

    const rowEmail = document.createElement("td");
    rowEmail.textContent = subscriber.crm;

    const rowTelephony = document.createElement("td");
    rowTelephony.textContent = subscriber.telephony;

    const rowRobotType = document.createElement("td");
    rowRobotType.textContent = subscriber.robotType;

    const rowNumberOf = document.createElement("td");
    rowNumberOf.textContent = subscriber.numberOfPhones;

    const rowCRM = document.createElement("td");
    rowCRM.textContent = subscriber.CRMName;

    const rowCMS = document.createElement("td");
    rowCMS.textContent = subscriber.CMS;

    const rowAnswer = document.createElement("td");
    rowAnswer.textContent = subscriber.answer;

    const rowScenario = document.createElement("td");
    rowScenario.textContent = subscriber.scenario;

    const rowSending = document.createElement("td");
    rowSending.textContent = subscriber.sending;

    row.append(
      rowRegDate,
      rowFirstName,
      rowUsername,
      rowBox,
      rowCompany,
      rowNumber,
      rowName,
      rowEmail
    );
    const tbody = document.querySelector(".tBody");
    tbody.append(row);
  }
}

function createDataBot(data) {
  for (let subscriber of data) {
    const row = document.createElement("tr");
    row.className = "database";

    const rowRegDate = document.createElement("td");
    rowRegDate.className = "date";
    rowRegDate.textContent = subscriber.time;

    const rowFirstName = document.createElement("td");
    rowFirstName.textContent = subscriber.name;

    const rowUsername = document.createElement("td");
    rowUsername.textContent = subscriber.username;

    const rowBox = document.createElement("td");
    rowBox.textContent = subscriber.card;

    const rowCompany = document.createElement("td");
    rowCompany.textContent = subscriber.company;

    const rowNumber = document.createElement("td");
    rowNumber.textContent = subscriber.phone;

    const rowName = document.createElement("td");
    rowName.textContent = subscriber.email;

    const rowEmail = document.createElement("td");
    rowEmail.textContent = subscriber.crm;

    const rowTelephony = document.createElement("td");
    rowTelephony.textContent = subscriber.telephony;

    const rowRobotType = document.createElement("td");
    rowRobotType.textContent = subscriber.robotType;

    const rowNumberOf = document.createElement("td");
    rowNumberOf.textContent = subscriber.numberOfPhones;

    const rowCRM = document.createElement("td");
    rowCRM.textContent = subscriber.CRMName;

    const rowCMS = document.createElement("td");
    rowCMS.textContent = subscriber.CMS;

    const rowAnswer = document.createElement("td");
    rowAnswer.textContent = subscriber.answer;

    const rowScenario = document.createElement("td");
    rowScenario.textContent = subscriber.scenario;

    const rowSending = document.createElement("td");
    rowSending.textContent = subscriber.sending;

    row.append(
      rowRegDate,
      rowFirstName,
      rowUsername,
      rowBox,
      rowCompany,
      rowNumber,
      rowName,
      rowEmail
    );
    const tbody = document.querySelector(".tBody");
    tbody.append(row);
  }
}

const switchTable = document.createElement("button");
switchTable.className = "switchTable";
switchTable.textContent = "Сменить таблицу";

switchTable.addEventListener("click", () => {
  window.location.href = "/users";
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
