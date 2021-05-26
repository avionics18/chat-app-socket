const socket = io();

loginBtn.onclick = () => {
	if(loginInp.value != ""){
		socket.emit("logged_in", {
			name: loginInp.value
		});
		loginInp.value = "";
		loadingAnimation.classList.remove("d-none");
		setTimeout(()=>{
			document.querySelector(".login-overlay").style.height = "0px";
		}, 1500);
	} else {
		alert("Please provide a valid username");
	}
}


const msgBox = document.querySelector(".msg-box");

msgBtn.onclick = () => {
	if(msgInp.value != ""){
		socket.emit("send_msg", {
			msg: msgInp.value
		});
		msgInp.value = "";
	} else {
		alert("Please enter a message!");
	}
}

socket.on("got_msg", (data) => {
	if(socket.id == data.id){
		msgBox.innerHTML = `<p class="p-2 bg-dark border border-light text-light shadow rounded-lg small ml-lg-5 ml-4">${data.msg}</p>` + msgBox.innerHTML;
	} else {
		msgBox.innerHTML = `<p class="bg-white shadow rounded-lg overflow-hidden small mr-lg-5 mr-4"><span class="d-block p-2 bg-lighter small text-secondary font-weight-bold">@${data.name}</span><span class="d-block p-2">${data.msg}</span></p>` + msgBox.innerHTML;
	}
});