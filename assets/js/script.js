const docPage = $("html");
const contactInfo = $("#contact-info");

const projectInfo = [
	{
		name: "ESO Profiles",
		description: `A site for editing and viewing character profiles for the game The Elder Scrolls Online.`,
		details: `<p>It is a React upgrade to the profile system from my ESO Rollplay project, and uses the same database.<p>
		<p>ESO Profiles is a work in progress, using React and Redux, as well as <a href="https://firebase.google.com/" target="_blank">Google Firebase</a> to store data.</p>`,
		link: "https://thebobbyllama.github.io/eso-profiles/",
		github: "https://github.com/TheBobbyLlama/eso-profiles"
	},
	{
		name: "Cherit",
		description: "A site for creating and sharing scrapbooks or photo albums.",
		details: `<p>Cherit is an online photo album and scrapbooking site that allows for creating and sharing your creations, all in an easy to use interface.</p>
		<p>This project was made with React, NextJS, and Redux.  Images for the project are saved using the <a href="https://apidocs.imgur.com/" target="_blank">Imgur API</a>.</p>`,
		link: "https://scrapbook-eight.vercel.app/",
		github: "https://github.com/TheBobbyLlama/scrapbook"
	},
	{
		name: "ESO Rollplay",
		description: `A character tracking and dice roll system to facillitate roleplaying in the game The Elder Scrolls Online.`,
		details: `<p>This site functions much like what you might see in tabletop Dungeons &amp; Dragons.  Players create and save their character sheets, and then Game Masters create and run sessions for other players to join with their characters.</p>
		<p>ESO Rollplay was made with HTML/CSS/Javascript/JQuery, and uses <a href="https://firebase.google.com/" target="_blank">Google Firebase</a> to store data.</p>`,
		link: "https://eso-rollplay.net/",
		github: "https://github.com/TheBobbyLlama/eso-rollplay",
	},
	{
		name: "Hop To",
		description: `Find breweries either in your hometown or while on vacation, and plan a trip to see them!`,
		details: `<p>Hop To is a group project from UW Coding Bootcamp.  My responsibilities for the project were the Bing Maps display and tour selection/routing.  I also created most of the custom icons for the project.<p>
		<p>This project was made with HTML/CSS/Javascript/JQuery, as well as <a href="https://get.foundation/" target="_blank">Foundation Framework</a>. It also makes use of the <a href="https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api" target="_blank">Bing Maps API</a>, <a href="https://www.openbrewerydb.org/" target="_blank">Open Brewery DB</a> and <a href="https://www.zipcodeapi.com/" target="_blank">Zip Code API</a>.</p>`,
		link: "https://laurenceokite.github.io/hop-to/",
		github: "https://github.com/laurenceokite/hop-to",
	},
];

const initializePage = function() {
	const showcaseList = $(".showcase > div");

	for (let i = 0; i < showcaseList.length; i++) {
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
	const projectIndex = projectInfo.indexOf(project);
	const modalPane = $("#previewModal");

	modalPane.children("h2").text(project.name);
	modalPane.find("a").attr("href", project.link).text(project.link);
	modalPane.children("p:first-of-type")[0].innerHTML = "<p><em>" + project.description + "</em></p>";
	modalPane.children("p:last-of-type")[0].innerHTML = project.details;
	modalPane.children("iframe").attr("src", project.link);
	modalPane.find("#modalGithubButton").attr("data-link", project.github);

	if (projectIndex > 0) {
		modalPane.find("#leftButton").show().off().on("click", () => { showProjectPopup(projectInfo[projectIndex - 1])});
	} else {
		modalPane.find("#leftButton").hide();
	}
	
	if (projectIndex < projectInfo.length - 1) {
		modalPane.find("#rightButton").show().off().on("click", () => { showProjectPopup(projectInfo[projectIndex + 1])});
	} else {
		modalPane.find("#rightButton").hide();
	}

	$("#modalBG").addClass("show");
	modalPane.addClass("show");
}

const hidePopup = function() {
	$("#modalBG, #modalBG > div").removeClass("show");
	$("#previewModal iframe").attr("src", "about:blank");
}

const modalBGClick = function(event) {
	if (event.target.id === "modalBG") {
		hidePopup();
	}
}

document.addEventListener("scroll", scrollMe);
$(".showcase > div").on("click", showProject);
$("#modalGithubButton").on("click", launchProjectGithub);
$("#modalCloseButton, #modalBG a").on("click", hidePopup);
$("#modalBG").on("click", modalBGClick);

initializePage();