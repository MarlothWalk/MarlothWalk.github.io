let languages = {}

function contentLoad()
{
	setLanguage('english')
}
currentLanguage = "english"
function toggleLanguage()
{
	if (currentLanguage == "english")
	{
		currentLanguage = "afrikaans"
		document.getElementById('changelanguage').innerHTML = "English"
	}	
	else
	{
		currentLanguage = "english"
		document.getElementById('changelanguage').innerHTML = "Afrikaans"
	}
	setLanguage(currentLanguage)
}
function loadLanguage(language,func)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	languages[language] = this.responseText;
    	if (func) func();
    }
  };
  xhttp.open("GET", language+".txt", true);
  xhttp.send();
}
function setLanguage(name)
{
	hideClass('english')
	hideClass('afrikaans')

	var titles = {'english':'Marlothii Conservancy Self-Guided Tree Walk','afrikaans':'Marlothii Bewarea Self-Begeleide Boomwandeling Roete'}
	document.title = titles[name];
	let txt = languages[name];
	let data = []
	let trees = txt.split('--\r\n')
	for (t in trees)
	{		
		lines = trees[t].split('\n')		
		if (lines[0] == "EXTRA\r")
		{
			let special = true;
			let html = trees[t].replace('EXTRA\r','')
			data.push({special:special, html:html})
		}
		else{
			let name = lines[0];
			let location = lines[1];
			let description = lines[2].replace('Description:','<em>Description:</em>');
			let ecology = lines[3].replace('Ecology:','<em>Ecology:</em>');;
			let interesting = lines[4].replace('Interesting points:','<em>Interesting points:</em>');
			let other = lines[5].replace('Other links:','<em>Other links:</em>');
			let link = lines[6];
			data.push({
				name:name,
				location:location,
				description:description,
				ecology:ecology,
				other:other,
				link:link,
				interesting:interesting
			})	
		}
		showClass(name);
	}	
	populateTrees(data);
}
function hideClass(cl)
{
	showClass(cl)
	var elems = document.getElementsByClassName(cl)
	for (let i =0;i <elems.length;i++)
	{
		let elem = elems[i];
		elem.className = elem.className + " hide";
	}
}
function showClass(cl)
{
	var elems = document.getElementsByClassName(cl)
	for (let i =0;i <elems.length;i++)
	{
		let elem = elems[i];
		elem.className = elem.className.replace('hide','')
	}
}
function populateTrees(data)
{
	document.getElementById('trees').innerHTML = '';
	for (d in data)
	{
		let tree = data[d];
		if (tree.special)
		{
			let div = document.createElement('div')
			div.innerHTML = tree.html;
			div.className = 'extra';
			document.getElementById('trees').appendChild(div)
		}	
		else
		{
			let h1 = document.createElement('h1');
			let location = document.createElement('h2')
			let description = document.createElement('p');
			description.className = "description";
			let ecology = document.createElement('p');
			ecology.className = 'ecology';
			let interesting = document.createElement('p');
			interesting.className = 'interesting';
			let other = document.createElement('p');
			other.className = "other";	
			let link = document.createElement('a');
			link.className = 'link';
			link.setAttribute('href',tree.link)
			link.setAttribute('target','_blank')
			
			h1.innerHTML = tree.name;
			location.innerHTML = tree.location;
			description.innerHTML = tree.description;
			ecology.innerHTML = tree.ecology;
			interesting.innerHTML = tree.interesting;
			other.innerHTML = tree.other;
			link.innerHTML = tree.link;
		
			document.getElementById('trees').appendChild(h1)
			document.getElementById('trees').appendChild(location)
			document.getElementById('trees').appendChild(description)
			document.getElementById('trees').appendChild(ecology)
			document.getElementById('trees').appendChild(interesting)
			document.getElementById('trees').appendChild(other)		
			document.getElementById('trees').appendChild(link)	
		}
	}
}
loadLanguage('english', () => {setLanguage('english')});
loadLanguage('afrikaans');
