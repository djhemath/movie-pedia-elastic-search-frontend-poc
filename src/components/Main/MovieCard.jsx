import link from '../../assets/link.svg';
import calendar from '../../assets/calendar.svg';
import users from '../../assets/users.svg';
import clock from '../../assets/clock.svg';
import { hoursToDurationString } from '../../utils/duration';

export default function MovieCard(props) {
    const { actors, countries, description, directors, duration, genre, id, image, imdbUrl, languages, rating, title, votes, year } = props;

    return (
        <div className="movie-card">
            <div className="image-container" style={{backgroundImage: `url(${image})`}}></div>

            <div className="details">
                <div className='header'>
                    <div>
                        <h3>{title}</h3>

                        <div className="rating">
                            <div className="box">
                                <span>&#9733;</span>
                                <span>{rating}</span>
                            </div>
                            <div className="votes">
                                ({votes} votes)
                            </div>
                        </div>
                    </div>

                    <div>
                        <a href={imdbUrl} rel="noreferrer" target="_blank">
                            <img className='link' src={link} alt='link'/>
                        </a>
                    </div>
                </div>

                <div className='description'>
                    {description}
                </div>

                <div className='genre-container'>
                    {
                        genre.map(g => {
                            return <div style={{backgroundColor: '#ff167d', color: '#fff'}} className="tag">{g}</div>
                        })
                    }
                </div>

                <div className="footer">
                    <div className="left">
                        <div className="tag">
                            <img src={calendar} alt='calendar' />
                            <span>{year}</span>
                        </div>
                        
                        <div className="tag">
                            <img src={clock} alt='clock' />
                            <span>{hoursToDurationString(duration)}</span>
                        </div>
                    </div>

                    <div className="right">
                        <div className="tag black cursor-pointer">
                            <img src={users} alt='crew' />
                            <span>CREW</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}