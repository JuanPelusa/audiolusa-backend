Swal.fire({
    title: "Enter your name",
    input: "text",
    inputValidator: (value) => {
      return !value && "You must enter a name!";
    },
    allowOutsideClick: false,
  }).then((datos) => {
    const socket = io();
    let name = datos.value;
    document.title = "Chat of: " + name;
    let inputMessage = document.getElementById("message");
    let divMessage = document.getElementById("messages");
    inputMessage.focus();
  
    socket.emit("id", name);
    socket.on("newUser", (name) => {
      Toastify({
        text: `${name} is connected`,
        position: "top right",
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        duration: 5000,
      }).showToast();
    });
  
    inputMessage.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.code === "Enter" && e.target.value.trim().length > 0) {
        socket.emit("newMessage", name, e.target.value.trim());
        e.target.value = "";
        e.target.focus();
      }
    });
  
    socket.on("sendMessage", (userName, message) => {
      let cName = userName === name ? "me" : "others";
      divMessage.innerHTML += `
      <div class="msg">
        <div class="${cName}">
        <span><strong>${userName}</strong> says 
        <i>${message}</i></span><br>
        </div>
      </div>
      `;
      divMessage.scrollTop = divMessage.scrollHeight;
    });
  
    socket.on("previousMessages", (messages) => {
      messages.forEach((messagesList) => {
        let className = messagesList.user === name ? "me" : "others";
        divMessage.innerHTML += `
        <div class="msg ${className}">
          <strong>${messagesList.user}</strong>
          <p>${messagesList.message}</p>
        </div>
        `;
        divMessage.scrollTop = divMessage.scrollHeight;
      });
    });
    socket.on("userOut", name => {
        divMessage.innerHTML += `<span><strong>${userName}</strong><i> Is disconnected... </i></span><br>`
    })
  });