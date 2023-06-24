let socket = io();
let focos = [false, false, false, false];

socket.emit("state", focos);

function foco(num) {
  focos[num] = !focos[num];
  focos[num]
    ? $(`#btn${num}`).removeClass("btn-danger").addClass("btn-success")
    : $(`#btn${num}`).removeClass("btn-success").addClass("btn-danger");
  socket.emit("state", focos);
  console.log(focos);
}
