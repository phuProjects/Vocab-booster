import React from 'react';

export default function Header() {
    return (
        <header className="app-header">
            <h1>Vocab Knowledge</h1>
            <nav>
                <ul>
                    <li><a href="#favorites">Favorites</a></li>
                    <li><a href="#history">History</a></li>
                </ul>
            </nav>
        </header>
    );
}
