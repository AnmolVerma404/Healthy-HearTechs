import { Diseases} from '../models/diseases.js';
import { Ayurvedic} from '../models/ayurvedic.js';
import { Allopathic } from '../models/allopathic.js';

export const search = async (req, res, next) => {
	const searchText = req.body.searchText;

	const diseases = await Diseases.find({});
	const ayurvedic = await Ayurvedic.find({});
	const allopathic = await Allopathic.find({});

	// console.log('diseases', diseases);
	// console.log('ayurvedic', ayurvedic);
	// console.log('allopathic', allopathic);
	// console.log(searchText);

	const foundDiseases = diseases.filter((dis)=>{
	});
	const foundAyurvedic = ayurvedic.filter((ayur)=>{
		
	});;
	const foundAllopathic = allopathic.filter((allo)=>{
		
	});;

	res.status(200).json({
		message: 'Success',
	});
};
