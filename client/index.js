console.log('Home page');

window.addEventListener('error', function (event) {
	console.error(event.error);
	window.location.href = './404.html';
});
