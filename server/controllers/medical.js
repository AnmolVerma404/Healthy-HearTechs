import { Ayurvedic } from '../models/ayurvedic.js';
import { Allopathic } from '../models/allopathic.js';

export const search = async (req, res, next) => {
	const searchText = req.body.searchText;

	const ayurvedic = await Ayurvedic.find({});
	const allopathic = await Allopathic.find({});

	console.log(searchText);
	const foundAyurvedic = ayurvedic.filter(ayur => {
		let foundCause = false;
		const symptoms = ayur.symptoms
		for(var i = 0;i<symptoms.length;++i){
			if (symptoms[i].name == searchText) {
				foundCause = true;
				break;
			}
		}
		return ayur.name == searchText || ayur.dosage == searchText || foundCause;
	});
	const foundAllopathic = allopathic.filter(allo => {
		let foundCause = false;
		const symptoms = allo.symptoms
		for(var i = 0;i<symptoms.length;++i){
			if (symptoms[i].name == searchText) {
				foundCause = true;
				break;
			}
		}
		return allo.name == searchText || allo.dosage == searchText || foundCause;
	});
	res.status(200).json({
		message: 'Success',
		ayurvedic: foundAyurvedic,
		allopathic: foundAllopathic,
	});
};
