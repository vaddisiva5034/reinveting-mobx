import { observable, observer } from "./mobx";
const myObj = observable({
  name: "kiran",
  lastName: "vaddi"
});

const firstNameEl = document.getElementById("firstName");
const lastNameEl = document.getElementById("lastName");

observer(() => {
  firstNameEl.textContent = myObj.name;
  console.log("from first name ->", myObj.name);
});

observer(() => {
  lastNameEl.textContent = myObj.lastName;
  console.log("from last name ->", myObj.lastName);
});

observer(() => {
  console.log("from full name ->", myObj.name, myObj.lastName);
});

function* nameGernator() {
  myObj.name = "himashu";
  yield;
  myObj.lastName = "patak";
  yield;
  myObj.name = "ashu";
  yield;
  myObj.lastName = "jain";
  yield;
}

let nameGernatorObj = nameGernator();

document.getElementById("btn").addEventListener("click", () => {
  const { done } = nameGernatorObj.next();
  if (done) {
    nameGernatorObj = nameGernator();
  }
});
