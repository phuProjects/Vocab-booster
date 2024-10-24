import React from 'react';

function Header() {
    return (
        <header className="app-header">
            <h1>Word Explorer</h1>
            <nav>
                <ul>
                    <li><a href="#favorites">Favorites</a></li>
                    <li><a href="#history">History</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
