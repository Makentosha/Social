function requestContent(content) {
	let http = new XMLHttpRequest();
	http.onreadystatechange = () => {
		if (http.readyState == 4 && http.status == 200) {
			$('#body-container').fadeOut('fast', () => {
				http.respostType = 'document';
				$('#body-container')[0].innerHTML = http.responseText;
				// console.log(http.respostType)
			});
			$('#body-container').fadeIn('fast');
			
		}
	}

	http.open('POST', `/my-profile/${content}`, true);
	http.send("timeline");
}

requestContent('edit-profile');

let current = $('#edit-profile')[0];

$('li').click((e) => {
	current.style.color = 'white';
	current = e.target;
	current.style.color = '#27aae1';
	requestContent(current.innerHTML);
})

console.log("done")