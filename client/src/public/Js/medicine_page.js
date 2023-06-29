// import axios from 'axios';
// import Swal from 'sweetalert2';
import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.12/+esm';
import { backendUrl } from '../../utils/url';
import { Toast } from '../../utils/swal';

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
			Swal.fire('Empty Condition', 'Enter your condition', 'question');
			return;
		}
		console.log(searchText);
		try {
			const resp = await axios.post(backendUrl + '/api/medical/search', {
				searchText,
			});
			document.getElementById('jsAyurvediDiv').innerHTML = '';
			document.getElementById('jsAllopathicDiv').innerHTML = '';
			document.querySelector('.jsInput').value = '';
			console.log('Running');
			const { message, ayurvedic, allopathic } = resp.data;
			if (ayurvedic.length == 0 && allopathic.length == 0) {
                throw new Error('No data found');
			}
            searchText = '';
            Toast.fire({
                icon: 'success',
                title: 'Medicines Loaded'
              })
            const data = {
                message,
                count: 0,
            };
			if (ayurvedic.length > 0) {
				updateAyurvedic(ayurvedic, data);
			}
			if (allopathic.length > 0) {
				updateAllopathic(allopathic, data);
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: `No Medicines related to ${searchText}!!!`,
			});
			console.log(error);
		}
	});
};

const updateAyurvedic = (ayurvedic, data) => {
	for (var i = 0; i < ayurvedic.length && i < 3; ++i) {
		// console.log(ayurvedic[i]);
		data.count++;
		ayurMedShow(ayurvedic[i], data);
	}
};

const updateAllopathic = (allopathic, data) => {
	for (var i = 0; i < allopathic.length && i < 3; ++i) {
		// console.log(allopathic[i]);
		data.count++;
		alloMedShow(allopathic[i], data);
	}
};

const ayurMedShow = ({ name, dosage, side_effect, symptoms }, { count }) => {
	var side_effectList = '',
		symptomsList = '';

	for (var se = 0; se < side_effect.length && se < 2; ++se) {
		side_effectList += `
        <li>${side_effect[se].name}</li>
        `;
	}

	for (var sy = 0; sy < symptoms.length && sy < 3; ++sy) {
		symptomsList += `
        <li>${symptoms[sy].name}</li>
        `;
	}
	const ayurvedicDiv = document.getElementById('jsAyurvediDiv');
	ayurvedicDiv.innerHTML += `
    <div class="box" id="box${count}">
    <div class="img" id="img${count}">
        <img src="../../image/about_us_img1.jpg">
    </div>
    <div class="big">
        <div class="name" id="name${count}">
            <p>${name}</p>
        </div>
        <div class="dandse">
            <div class="dosage" id="dosage${count}">
                <p><span>Dosage:</span>${dosage}</p>
            </div>
            <div class="side_effects" id="side_effects${count}">
                <p>Side Effects:</p>
                <ul id="jsSideEffects">
                    ${side_effectList}
                </ul>
            </div>
        </div>
        <div class="causes" id="causes${count}">
            <p>Symptoms:</p>
            <ul>
                ${symptomsList}
            </ul>
        </div>
    </div>
    </div>
    `;
};

const alloMedShow = ({ name, dosage, side_effect, symptoms }, { count }) => {
	var side_effectList = '',
		symptomsList = '';

	for (var se = 0; se < side_effect.length && se < 2; ++se) {
		side_effectList += `
        <li>${side_effect[se].name}</li>
        `;
	}

	for (var sy = 0; sy < symptoms.length && sy < 3; ++sy) {
		symptomsList += `
        <li>${symptoms[sy].name}</li>
        `;
	}
	const allopathicDiv = document.getElementById('jsAllopathicDiv');
	allopathicDiv.innerHTML += `
    <div class="box" id="'box${count}">
    <div class="img" id="img4">
        <img src="../../image/about_us_img1.jpg">
    </div>
    <div class="big">
        <div class="name" id="name${count}">
            <p>${name}</p>
        </div>
        <div class="dandse">
            <div class="dosage" id="dosage${count}">
                <p><span>Dosage:</span>${dosage}</p>
            </div>
            <div class="side_effects" id="side_effects${count}">
                <p>Side Effects:</p>
                <ul>
                    ${side_effectList}
                </ul>
            </div>
        </div>
        <div class="causes" id="causes${count}">
            <p>Symptoms:</p>
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
