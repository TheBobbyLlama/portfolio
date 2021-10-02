const docPage = $("html");
const contactInfo = $("#contact-info");

const projectInfo = [
	{
		id: "projectivity",
		name: "Projectivity",
		description: `Track your projects and manage timesheets in this all-in-one productivity solution.`,
		details: `<p>Projectivity was the final group project of UW Coding Bootcamp.  I did the Groups and Timesheets pages, the Conversations and Time Tracker widgets, much of the backend query support, and I also created the site's logo.</p>
		<p>This is a full stack MERN application - Mongo, Express, React, and Node.  Other technologies used include JSON Web Tokens, GraphQL, and Apollo Client/Server</p>`,
		link: "https://evening-dawn-14533.herokuapp.com/",
		github: "https://github.com/alexo-a/projectivity",
	},
	{
		name: "Hop To",
		description: `Find breweries either in your hometown or while on vacation, and plan a trip to see them!`,
		details: `<p>Hop To is a group project from UW Coding Bootcamp.  My responsibilities for the project were the Bing Maps display and tour selection/routing.  I also created most of the custom icons for the project.<p>
		<p>This project was made with HTML/CSS/Javascript/JQuery, and uses the <a href="https://www.microsoft.com/en-us/maps/choose-your-bing-maps-api" target="_blank">Bing Maps API</a> <a href="https://www.openbrewerydb.org/" target="_blank">Open Brewery DB</a> and <a href="https://www.zipcodeapi.com/" target="_blank">Zip Code API</a>.</p>`,
		link: "https://laurenceokite.github.io/hop-to/",
		github: "https://github.com/laurenceokite/hop-to",
	},
	{
		name: "Pagebound",
		description: `An online book club where you can find clubs in your area or create your own, as well as participate in book discussions.`,
		details: `<p>Pagebound is a full stack group project from UW Coding Bootcamp.  Our group didn't have fixed roles, so I was involved at all levels of the stack.  In addition to creating a couple of the pages, I was primarily responsible for the database models, and I made the logo as well.<p>
		<p>This project was made with HTML/CSS/Javascript/JQuery on the frontend, and Node/Express/Sequelize/MySQL on the backend.  It also uses the <a href="https://developers.google.com/books" target="_blank">Google Books API</a> and <a href="https://www.zipcodeapi.com/" target="_blank">Zip Code API</a>.</p>`,
		link: "https://tranquil-shelf-96400.herokuapp.com/",
		github: "https://github.com/TheBobbyLlama/pagebound"
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
		name: "CoH Builder",
		description: `A character building application for the City of Heroes online game.`,
		details: `<p>This is an online counterpart to the <a href="https://midsreborn.com/" target="_blank">Mids Reborn Hero Designer</a> desktop application, and uses data extracted from that program.  It is a work in progress, but will have full import and export capabilities with Mids!  Currently, characters may be fully created, but there is no way to save or import them, and no stats are calculated.<p>
		<p>CoH Builder is a progressive web application written in React.  It can be installed to the user's desktop or device and used offline if desired.</p>`,
		link: "https://thebobbyllama.github.io/coh-builder/",
		github: "https://github.com/TheBobbyLlama/coh-builder"
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
	modalPane.find("a").attr("href", project.link).text(project.link);
	modalPane.children("p:first-of-type")[0].innerHTML = "<p><em>" + project.description + "</em></p>";
	modalPane.children("p:last-of-type")[0].innerHTML = project.details;
	modalPane.children("iframe").attr("src", project.link);
	modalPane.find("#modalGithubButton").attr("data-link", project.github);

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