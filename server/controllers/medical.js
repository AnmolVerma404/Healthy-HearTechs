import { Ayurvedic } from '../models/ayurvedic.js';
import { Allopathic } from '../models/allopathic.js';

export const search = async (req, res, next) => {
	const searchText = req.body.searchText;

	const ayurvedic = await Ayurvedic.find({});
	const allopathic = await Allopathic.find({});

	console.log(searchText);
	const foundAyurvedic = ayurvedic.filter(ayur => {
		let foundCause = false;
		ayur.causes.filter(cause => {
			if (cause.name == searchText) {
				foundCause = true;
				return;
			}
		});
		return ayur.name == searchText || ayur.dosage == searchText || foundCause;
	});
	const foundAllopathic = allopathic.filter(allo => {
		let foundCause = false;
		allo.causes.filter(cause => {
			if (cause.name == searchText) {
				foundCause = true;
				return;
			}
		});
		return allo.name == searchText || allo.dosage == searchText || foundCause;
	});
	res.status(200).json({
		message: 'Success',
		ayurvedic: foundAyurvedic,
		allopathic: foundAllopathic,
	});
};
