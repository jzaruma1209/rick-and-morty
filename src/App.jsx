import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import getRandomNumber from './helpers/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import getNumbers from './helpers/getNumbers';

function App() {
	const [locationID, setLocationID] = useState(getRandomNumber(126));
	const [errorMessage, setErrorMessage] = useState('');
	const url = `https://rickandmortyapi.com/api/location/${locationID}`;
	const [location, hasError, isLoading, getLocation] = useFetch(url);
	const [locations, hasErrorLocations, isLoadingLocations, getLocations] = useFetch(`https://rickandmortyapi.com/api/location/${getNumbers()}`);
	useEffect(() => {
		getLocation();
	}, [locationID]);
	useEffect(() => {
		getLocations();
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		const inputValue = inputName.current.value.trim();
		const selectedLocation = locations.find((location) => location.name.toLowerCase() === inputValue.toLowerCase());

		if (inputValue) {
			setLocationID(selectedLocation ? selectedLocation.id : null);
			setErrorMessage(selectedLocation ? '' : 'No location found with that name!');
		} else {
			setErrorMessage(inputValue ? '' : 'You must put a location name');
		}
	};

	const inputName = useRef();
	return (
		<div className="app flex-container">
			<header className="app__hero">
				<img className="hero__image" src="/image/hero.png" alt="Hero Image" />
			</header>
			<section className="app__body">
				<form className="form" onSubmit={handleSubmit}>
					<input className="form__input" type="text" placeholder="Search location name" ref={inputName} list="locations" />
					<datalist id="locations">
						{isLoadingLocations ? (
							<div className="loader__container">
								<div className="loader">
									<img src="/Icono Logo.png" alt="logo" />
								</div>
							</div>
						) : (
							locations?.map((location) => <option value={location.name} key={location.id}></option>)
						)}
					</datalist>
					<button className="form__btn">Search</button>
				</form>
				{isLoading ? (
					<div className="loader__container">
						<div className="loader">
							<img src="/Icono Logo.png" alt="logo" />
						</div>
					</div>
				) : errorMessage ? (
					<h1>{errorMessage}</h1>
				) : (
					<>
						<LocationInfo location={location} />
						<section className="cards__container flex-container">
							{location?.residents?.map((url) => (
								<ResidentCard key={url} url={url} />
							))}
						</section>
					</>
				)}
			</section>
		</div>
	);
}

export default App;
