import React from 'react';
import WordHistory from './WordHistory.jsx';

export default function WordHistoryPage() {
    const history = JSON.parse(localStorage.getItem('wordHistory')) || [];

    const clearHistory = () => {
        localStorage.removeItem('wordHistory'); // Clear history from localStorage
        window.location.reload(); // Reload to reflect changes
    };

    return (
        <div className="word-history-page">
            <h1>Word History</h1>
            <WordHistory history={history} onClearHistory={clearHistory} />
        </div>
    );
}
