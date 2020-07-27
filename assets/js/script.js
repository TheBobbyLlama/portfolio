const docPage = $("html");
const contactInfo = $("#contact-info");

const projectInfo = [
	{
		name: "Hop To",
		description: "Find breweries either in your hometown or while on vacation, and plan a trip to see them!",
		details: "This is a group project from UW Coding Bootcamp.  My responsibilities for the project were the Bing Maps display and tour selection/routing.  I also created most of the custom icons for the project.",
		link: "https://laurenceokite.github.io/hop-to/",
		github: "https://github.com/laurenceokite/hop-to",
	},
	{
		name: "ESO Roleplay",
		description: "A character tracking and dice roll system to facillitate roleplaying in the game The Elder Scrolls Online.",
		details: "This is the player portal page which consists of 3 subpages:" +
		"<ul>" +
			"<li>A character sheet page where players can create and save their characters for use in the system.</li>" +
			"<li>A 'Rollplay' page where players can participate in roleplaying sessions by making dice rolls.</li>" +
			"<li>A profile page where characters can be browsed and viewed.</li>" +
		"</ul>",
		link: "https://thebobbyllama.github.io/eso-roleplay/",
		github: "https://github.com/TheBobbyLlama/eso-roleplay",
	}
];

const initializePage = function() {
	const showcaseList = $(".showcase > div");

	for (var i = 0; i < showcaseList.length; i++) {
		const project = projectInfo.find(element => element.name == showcaseList[i].getAttribute("id"));
		
		if (project) {
			showcaseList[i].querySelector("h3").textContent = project.name;
			showcaseList[i].querySelector("p").textContent = project.description;
		}
	}
}

const scrollMe = function() {
	if (docPage.scrollTop() > 200) {
		contactInfo.addClass("fly-in");
		document.removeEventListener("scroll", scrollMe);
	}
}

const showProject = function() {
	event.preventDefault();

	const project = projectInfo.find(element => element.name == $(this).attr("id"));
	
	if (project) {
		showProjectPopup(project);
	}
}

const launchProjectGithub = function() {
	window.open($(this).attr("data-link"));
}

const showProjectPopup = function(project) {
	var modalPane = $("#previewModal");
	modalPane.children("h2").text(project.name);
	modalPane.children("p:first-of-type").text(project.description);
	modalPane.children("p:last-of-type")[0].innerHTML = project.details;
	modalPane.find("a").attr("href", project.link).text(project.link);
	modalPane.children("iframe").attr("src", project.link);
	modalPane.find("#modalGithubButton").attr("data-link", project.github);

	$("#modalBG").addClass("show");
	modalPane.addClass("show");
}

const hidePopup = function() {
	$("#modalBG, #modalBG > div").removeClass("show");
	$("#previewModal iframe").attr("src", "about:blank");
}

document.addEventListener("scroll", scrollMe);
$(".showcase > div").on("click", showProject);
$("#modalGithubButton").on("click", launchProjectGithub);
$("#modalCloseButton, #modalBG a").on("click", hidePopup);

initializePage();