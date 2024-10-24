// WordHistory.jsx
import React from 'react';

const WordHistory = ({ history, onClearHistory }) => {
    if (!history || history.length === 0) {
        return (
            <div className="history-card">
                <div className="history-header">
                    <h2>Word History</h2>
                </div>
                <div className="history-content">
                    <p className="empty-message">No words generated yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="history-card">
            <div className="history-header">
                <h2>Word History</h2>
                <button 
                    onClick={onClearHistory}
                    className="clear-button"
                >
                    Clear History
                </button>
            </div>
            <div className="history-content">
                <div className="history-list">
                    {history.slice().reverse().map((entry, index) => (
                        <div
                            key={`${entry.word}-${index}`}
                            className="history-item"
                        >
                            <div className="history-item-header">
                                <h3>{entry.word}</h3>
                                <span className="timestamp">
                                    {new Date(entry.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="part-of-speech">
                                <span>Part of Speech:</span> {entry.partOfSpeech}
                            </p>
                            <p className="definition">
                                <span>Definition:</span> {entry.definition}
                            </p>
                            {entry.example && entry.example !== 'No example available.' && (
                                <p className="example">
                                    <span>Example:</span> {entry.example}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Make sure to include this export statement
export default WordHistory;