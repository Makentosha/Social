$(document).ready(function(){
	let logo = $("#logo");
	let onlineContainer = $("#online-container");
	let bodyContainer = $("#body-container");
	let	logOutBt = $("#logout");


	logo.click(() => {
		window.location.href = "localhost:4000/";
	})

	$(window).scroll((e) => {
		if ($(window).scrollTop() > 402) {
			onlineContainer.addClass("fixed");
		} else {
			onlineContainer.removeClass("fixed");
		}
	});

	logOutBt.click(() => {
		console.log("click")
		http = new XMLHttpRequest();

		http.onreadystatechange = () => {
			if (http.readyState == 4 && http.status == 200)
				location.reload();
		}

		http.open("POST", "/logout", true);
		http.send();
	})
});