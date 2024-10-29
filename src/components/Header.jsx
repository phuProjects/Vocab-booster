import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header className="app-header">
            <h1>Vocabulary Booster</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/favorite">Favorite</Link></li>
                    <li><Link to="/history">History</Link></li>
                </ul>
            </nav>
        </header>
    );
}
