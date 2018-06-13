$(document).ready(() => {
	let imgList = document.getElementsByClassName('photo-container');

	for (var i = imgList.length - 1; i >= 0; i--) {
		console.log(imgList[i].firstElementChild)
		imgList[i].firstElementChild.on('click', () => {console.log("lol")
			})
	}
})
