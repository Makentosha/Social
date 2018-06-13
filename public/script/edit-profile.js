actionsList = document.getElementsByClassName('action');
selectedAction = actionsList[0];

for (var i = actionsList.length - 1; i >= 0; i--) {
	actionsList[i].addEventListener('click', (e) => {
		console.log($(e.target).find('p')[0].innerHTML);
		$(selectedAction).removeClass("selected");
		selectedAction = e.target;
		$(e.target).addClass("selected");

		let http = new XMLHttpRequest();
		http.onReadyStatusChange = (e) => {
			if (readyState == 4 && e.status == 200) {
				// $("#center-col")[0].innerHTML = http.responseText;
				console.log("test");
			}
			console.log("test");
		}

		console.log('/my-profile/edit-profile/' + $(e.target).find('p')[0].innerHTML.replace(/ /g, '-').toLowerCase());
		http.open('POST', '/my-profile/edit-profile/' + $(e.target).find('p')[0].innerHTML.replace(/ /g, '-').toLowerCase(), true);
		http.send();
	})
}


function saveChanges() {
	let user = {
		firstName: $('[name="first_name"]')[0].value,
		lastName: $('[name="last_name"]')[0].value,
		email: $('[name="email"]')[0].value,
		date: $('[name="date"]')[0].value,
		month: $('[name="month"]')[0].value,
		year: $('[name="year"]')[0].value,
		country: $('[name="country"]')[0].value,
		city: $('[name="city"]')[0].value,
	}

	// console.log(JSON.stringify(user));

	let http = new XMLHttpRequest();
	http.onReadyStatusChange = (e) => {
		if (http.readyState == 4 && e.status == 200) {
			console.log("done")
		}
	}

	http.open('POST', '/my-profile/basicinformation/savechanges', true);
	http.send(`${JSON.stringify(user)}`);

	return false;
}
