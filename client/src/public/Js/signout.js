const signoutHandler = async () => {
	document.cookie = `jwt=null; path=/`;
	window.location.href = '../../index.html';
};

signoutHandler();
