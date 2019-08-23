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

const renderProjectList = (project) => {
	const titleProjectNode = document.createElement('h3');
	const titleProjectContent = document.createTextNode(project);
	const list = document.createElement("ul");

	titleProjectNode.appendChild(titleProjectContent);

	list.setAttribute("id", `${project}-projects`);

	return list;
}

const renderRepo = (repo) => {
	const li = document.createElement('li');
	const anchor = document.createElement('a');

	anchor.setAttribute('href', repo.html_url);
	anchor.innerHTML = repo.name;

	li.appendChild(anchor);

	return li;
}

// latest repositories
(async () => {
	const url = new URL('https://cybertec-postgresql-api.agustin107.now.sh/repos');

	const json = await (await fetch(url)).json();

	const container = dom.select('#list-of-cybertec-open-source-projects').parentNode;
	
	for (const project in json) {
		const domProjectList = renderProjectList(project);
		
		for (const repo in project) {
			const domRepo = renderRepo(json[project][repo]);

			domProjectList.appendChild(domRepo);
		}
		
		container.appendChild(domProjectList);
	}

})();