import fullCountryList from './fullCountryList';
import { countryList } from '../../../../_plugins';
import { CountryState } from './Country';
import { getRandomArrayValue } from '~utils/randomUtils';
import { DTGenerateResult, DTGenerationData } from '~types/dataTypes';
import { CountryType } from '~types/countries';


export const generate = (data: DTGenerationData): DTGenerateResult => {
	const { rowState, countryData } = data;
	const { source, selectedCountries } = rowState as CountryState;

	const hasFilteredCountryList = selectedCountries.length > 0;

	if (source === 'all') {
		return {
			display: getRandomArrayValue(hasFilteredCountryList ? selectedCountries : fullCountryList)
		};
	} else {
		const randomCountry = getRandomArrayValue(hasFilteredCountryList ? selectedCountries : countryList) as CountryType;

		const data = countryData[randomCountry];
		return {
			display: data.countryName,
			slug: data.countrySlug,
			countryDataType: randomCountry
		};
	}
};

let utilsLoaded = false;

const onmessage = (e: any) => {
	if (!utilsLoaded) {
		importScripts(e.data.workerResources.workerUtils);
		utilsLoaded = true;
	}

	postMessage(generate(e.data));
};

export {};
