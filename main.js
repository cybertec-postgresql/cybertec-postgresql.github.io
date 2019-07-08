// Helper
const dom = {
	select: document.querySelector.bind(document),
	slectAll: document.querySelectorAll.bind(document)
};

const injectScript = (source, callback) => {
	const script = document.createElement('script');
	script.src = source;
	script.addEventListener('load', callback);
	document.head.appendChild(script);
};

const insertHypenationHintsForCamelCase = string => string.replace(/([a-z])([A-Z])/g, '$1\u00AD$2');

const renderProjectList = (project) => {
	const list = document.createElement("ul");
	list.setAttribute("id", `${project}-projects`);

	return list;
}

const renderRepo = (repo) => {
	const li = document.createElement('li');
	const anchor = document.createElement('a');

	anchor.setAttribute('href', dataProject.html_url);
	anchor.innerHTML = dataProject.name;

	li.appendChild(anchor);

	return li;
}

// latest repositories
(async () => {
	const url = new URL('https://cybertec-postgresql-api-71bgq7xk9.now.sh/repos');

	const json = await (await fetch(url)).json();

	const container = dom.select('#list-of-cybertec-open-source-projects');
	
	for (const project in json) {
		const domProjectList = renderProjectList(project);
		
		for (const repo in project) {
			const domRepo = renderRepo(repo);

			domProjectList.appendChild(domRepo);
		}
		
		container.appendChild(domProjectList);
	}

})();