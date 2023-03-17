const button = document.getElementById("home");

button.addEventListener("click", goBack);

const goBack = (event) => {
	event.preventDefault();
	history.back();
};
