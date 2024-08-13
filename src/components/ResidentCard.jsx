import { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import './styles/ResidentCard.css';

const ResidentCard = ({ url }) => {
	const [resident, hasError, isLoading, getResident] = useFetch(url);
	useEffect(() => {
		getResident();
	}, []);

	return (
		<article className="resident">
			{isLoading ? (
				<div className="loader__container">
					<div className="loader">
						<img src="/Icono Logo.png" alt="logo" />
					</div>
				</div>
			) : (
				<section>
					<header className="resident__header">
						<img className="resident__image" src={resident?.image} alt={resident?.name} />
						<div className="resident__status-container flex-container">
							<div className={`resident__status-circle ${resident?.status}`}></div>
							<div className="resident__status">{resident?.status}</div>
						</div>
					</header>
					<section className="resident__body">
						<h2 className="resident__name">{resident?.name}</h2>
						<hr className="resident__hr" />
						<ul className="resident__list grid-container">
							<li className="resident__item grid-container">
								<span className="resident__label">
									Species: <span className="resident__value">{resident?.species}</span>
								</span>
							</li>
							<li className="resident__item grid-container">
								<span className="resident__label">
									Origin: <span className="resident__value">{resident?.origin.name}</span>
								</span>
							</li>
							<li className="resident__item grid-container">
								<span className="resident__label">
									Number of episodes: <span className="resident__value">{resident?.episode.length}</span>
								</span>
							</li>
						</ul>
					</section>
				</section>
			)}
		</article>
	);
};

export default ResidentCard;
