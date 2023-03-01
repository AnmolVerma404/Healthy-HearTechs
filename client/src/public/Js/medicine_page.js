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
            const {message,ayurvedic,allopathic} = resp.data;
            console.log(message,ayurvedic,allopathic);
            if(ayurvedic.length>0){
                updateAyurvedic(ayurvedic);
            }
            if(allopathic.length>0){
                updateAllopathic(allopathic);
            }
		} catch (error) {}
	});
};

const updateAyurvedic = (ayurvedic) =>{

}

const updateAllopathic= (allopathic) =>{

}

fetchSearchText();
searchTextFunc();
