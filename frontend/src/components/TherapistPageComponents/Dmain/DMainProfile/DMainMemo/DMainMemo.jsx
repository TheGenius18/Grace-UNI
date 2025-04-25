import React, { useState, useEffect } from "react";
import "./DMainMemo.css";

function DMainMemo() {
  const [cells, setCells] = useState(() => {
    const saved = localStorage.getItem('therapist-memos');
    return saved ? JSON.parse(saved) : [{ id: Date.now(), content: '' }];
  });

  useEffect(() => {
    localStorage.setItem('therapist-memos', JSON.stringify(cells));
  }, [cells]);

  const addCell = () => {
    setCells([...cells, { id: Date.now(), content: '' }]);
  };

  const deleteCell = (id) => {
    if (cells.length > 1) {
      setCells(cells.filter(cell => cell.id !== id));
    } else {
      setCells([{ id: Date.now(), content: '' }]);
    }
  };

  const updateCellContent = (id, content) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, content } : cell));
  };

  return (
    <div className="memo-container">
      <div className="memo-notebook">
        {cells.map(cell => (
          <div key={cell.id} className="memo-cell">
            <textarea
              className="memo-textarea"
              value={cell.content}
              onChange={(e) => updateCellContent(cell.id, e.target.value)}
              placeholder="Type your notes here..."
              rows={Math.max(1, Math.ceil(cell.content.length / 77))} 
            />
            <div className="memo-actions">
              <button 
                onClick={() => deleteCell(cell.id)} 
                className="memo-delete-btn"
                aria-label="Delete note"
              >
                ✕
              </button>
              <span className="memo-date">
                {new Date(cell.id).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={addCell} 
        className="memo-add-btn"
      >
        + Add New Note
      </button>
    </div>
  );
}

export default DMainMemo;