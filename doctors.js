const doctorForm = document.getElementById("doctorForm");
const doctorTable = document.getElementById("doctorTable");

doctorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("docName").value;
  const speciality = document.getElementById("speciality").value;
  const time = document.getElementById("time").value;

  const row = doctorTable.insertRow();
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = speciality;
  row.insertCell(2).textContent = time;

  doctorForm.reset();
});
