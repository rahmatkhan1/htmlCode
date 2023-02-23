var form = `<div>
<div class="mb-3">
  <label for="name" class="form-label">Name</label>
  <input type="text" class="form-control" id="name" placeholder='Enter your name'  aria-describedby="emailHelp">
</div>
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input type="email" class="form-control" id="email" placeholder='Enter your email' aria-describedby="emailHelp">
</div>
<button type="submit" class="btn btn-primary" onclick='save()'>Save</button>
</div>`;

document.getElementById("form").innerHTML = form;

let details = [];
// table();
load();
// getData();

function save() {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  if (name.value == 0) {
    return alert("Name is empty");
  }
  let data = {
    name: name.value,
    email: email.value,
  };
  details.push(data);
  setData(name, email);
  table();
  name.value = "";
  email.value = "";
}

async function getData() {
  let ax = axios
    .get("https://crudcrud.com/api/3900712053364deca04890fb0252dfe3/appoint")
    .then((res) => {
      details = res.data;
      console.log(details[0].name);
    })
    .catch((err) => console.log(err));
  if (ax) {
    await ax;
  } else {
    setData();
  }
  // let data=localStorage.getItem('details');
  // if(data){
  //     details=JSON.parse(data)
  // }else{
  //     setData();
  // }
}
function setData(n, e) {
  axios
    .post("https://crudcrud.com/api/3900712053364deca04890fb0252dfe3/appoint", {
      name: n.value,
      email: e.value,
    })
    .then((res) => {
      details = res.data;
      console.log("setData", details);
    });
  // localStorage.setItem('details',JSON.stringify(details));
}

function updateData(n, e, id) {
  axios
    .patch(
      "https://crudcrud.com/api/3900712053364deca04890fb0252dfe3/appoint/" + id,
      {
        name: n.value,
        email: e.value,
      }
    )
    .then((res) => {
      details = res.data;
      console.log(details);
    })
    .catch((er) => {
      console.log(er);
    });
}

function table() {
  let table = `<table class="table">
    <thead>
      <tr>
        <th scope="col-1">#</th>
        <th scope="col-3">Name</th>
        <th scope="col-4">Email</th>
        <th scope="col-2">Edit</th>
        <th scope="col-2">Delete</th>
      </tr>
    </thead>
    <tbody>`;
  for (let i = 0; i < details.length; i++) {
    table =
      table +
      `<tr>
        <th scope="row">${i + 1}</th>
        <td>${details[i].name}</td>
        <td>${details[i].email}</td>
        <td><button type='button' class='btn btn-warning ' onclick='edit(${i})'>Edit</td>
        <td><button type='button' class='btn btn-danger ' onclick='deleteData(${i})'>Delete</td>
      </tr>`;
  }

  table =
    table +
    ` </tbody>
    </table>`;
  document.getElementById("table").innerHTML = table;
  document.getElementById("form").innerHTML = form;
}

function edit(index) {
  let editForm = `<div>
    <div class="mb-3">
    <label for="name" class="form-label">Name</label>
    <input type="text" class="form-control" id="newname" value="${details[index].name}" aria-describedby="emailHelp">
  </div>
  
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="newemail" value='${details[index].email}'  aria-describedby="emailHelp">
  </div>
  
  <button type="submit" class="btn btn-primary" onclick='update(${index})'>Update</button>
  </div>`;
  //   console.log('editted');
  document.getElementById("form").innerHTML = editForm;
}

function update(index) {
  let newName = document.getElementById("newname");
  let newEmail = document.getElementById("newemail");
  let id = details[index].id;
  details[index] = {
    name: newName.value,
    email: newEmail.value,
  };
  let name1 = details[index].name;
  let email1 = details[index].email;
  console.log("iiidddd", id);
  // setData(name,email);
  updateData(name1, email1, id);
  table();
  document.getElementById("form").innerHTML = form;
}

async function deleteData(i) {
  let id = details[i]._id;
  axios
    .delete(
      "https://crudcrud.com/api/3900712053364deca04890fb0252dfe3/appoint/" + id
    )
    .then((res) => {
      details = res.data;
      console.log(id);
    })
    .catch((er) => {
      console.log("catchBlock", er);
    });
  await getData();
  await table();
  //  load()
  // details.splice(index,1);
  // setData();
  // table();
}

async function load() {
  await getData();
  await table();
  console.log("loaded");
}
