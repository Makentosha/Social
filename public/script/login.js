let submit = $('#submit');
let form = $('form')[0];
let tmp = $('.tmp');
let action = "login";
let loginBt = $("#login");
let registerBt = $("#register");

loginBt.click(() => {
	if (action == "register") {
		registerBt.css("background-color", "#80BE00");
		loginBt.css("background-color", "white");
		tmp.slideUp();
		action = "login";
	} else {
		let email = $('[name="email"]')[0].value;
		let password = $('[name="password"]')[0].value;

		let http = new XMLHttpRequest();
		http.onreadystatechange = () => {
			if (http.readyState == 4 && http.status == 200) {
				if (http.responseText)
					location.reload();
				else
					console.log("fail");
			}
		}

		http.open('POST', 'login/login', true);
		http.send(`email=${email}&password=${password}`);
	}
	return false;
})

registerBt.click(() => {
	if (action == "login") {
		registerBt.css("background-color", "white");
		loginBt.css("background-color", "#80BE00");
		tmp.slideToggle();
		action = "register";
	} else {
		let firstName = $('[name=firstName]')[0].value;
		let lastName = $('[name=lastName]')[0].value;
		let birthday = $('[name="year"]')[0].value + "-" + $('[name="month"]')[0].value + "-" + $('[name="date"]')[0].value;
		let sex = $('[name="sex"]:checked')[0].value;
		let email = $('[name="email"]')[0].value;
		let password = $('[name="password"]')[0].value;
		let passwordConf = $('[name="password"]')[1].value;

		if (password == passwordConf) {
			let http = new XMLHttpRequest();
			http.onreadystatechange = () => {
				if (http.readyState == 4 && http.status == 200) {
					console.log(http.responseText);
				}
			}

			http.open('POST', 'login/register', true);
			http.send(`firstName=${firstName}` +
					 `&lastName=${lastName}` +
					 `&birthday=${birthday}` +
					 `&sex=${sex}` +
					 `&email=${email}` +
					 `&password=${password}` +
					 `&passwordConf=${passwordConf}`);
		} else {
			console.log("passwords are not the same!");
		}
	}
	return false;
})