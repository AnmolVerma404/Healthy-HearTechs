import axios, { all } from 'axios';
import { backendUrl } from '../../utils/url';

var searchText = '';

const fetchSearchText = () => {
	if (window.localStorage.getItem('searchText')) {
		searchText = window.localStorage.getItem('searchText');
		console.log(searchText);
		localStorage.removeItem('searchText');
	} else {
		console.log('No text detected');
	}
};

const searchTextFunc = async () => {
	if (searchText.length != 0) {
		document.querySelector('.jsInput').setAttribute('value', searchText);
	}
	const searchClick = document.querySelector('.jsSearchButton');
	searchClick.addEventListener('click', async e => {
		e.preventDefault();
		searchText = document.querySelector('.jsInput').value;
		if (searchText.length == 0) {
			console.log('Enter your condition');
			return;
		}
		console.log(searchText);
		try {
			const resp = await axios.post(backendUrl + '/api/medical/search', {
				searchText,
			});
			searchText = '';
			document.querySelector('.jsInput').setAttribute('value', '');
			const { message, ayurvedic, allopathic } = resp.data;
			if (ayurvedic.length > 0) {
				updateAyurvedic(ayurvedic);
			}
			if (allopathic.length > 0) {
				updateAllopathic(allopathic);
			}
		} catch (error) {}
	});
};

const updateAyurvedic = ayurvedic => {
	for (var i = 0; i < ayurvedic.length && i < 3; ++i) {
		// console.log(ayurvedic[i]);
		ayurMedShow(ayurvedic[i], i);
	}
};

const updateAllopathic = allopathic => {
	for (var i = 0; i < allopathic.length && i < 3; ++i) {
		// console.log(allopathic[i]);
	}
};

const ayurMedShow = ({ name, dosage, side_effect, symptoms }, i) => {
	console.log("name",name);
	console.log("dosage",dosage);
	console.log("side_effect",side_effect);
	console.log("symptoms",symptoms);
	console.log("i",i);
    var side_effectList = "",symptomsList = "";

    for(var se = 0;se<side_effect.length && se<2;++se){
        side_effectList+=`
        <li>${side_effect[se].name}</li>
        `
    }
    
    for(var sy = 0;sy<symptoms.length && sy<3;++sy){
        symptomsList+=`
        <li>${symptoms[sy].name}</li>
        `
    }
	const ayurvedicDiv = document.getElementById('jsAyurvediDiv');
	ayurvedicDiv.innerHTML += `
        <div class="box" id="box${i+1}">
        <div class="img" id="img1">
            <img src="../../image/about_us_img1.jpg">
        </div>
        <div class="big">
            <div class="name" id="name1">
                <p>${name}</p>
            </div>
            <div class="dandse">
                <div class="dosage" id="dosage1">
                    <p><span>Dosage:</span>${dosage}</p>
                </div>
                <div class="side_effects" id="side_effects1">
                    <p>Side Effects:</p>
                    <ul id="jsSideEffects">
                        ${side_effectList}
                    </ul>
                </div>
            </div>
            <div class="causes" id="causes1">
                <p>Causes:</p>
                <ul>
                    ${symptomsList}
                </ul>
            </div>
        </div>
        </div>
    `;
};

fetchSearchText();
searchTextFunc();
