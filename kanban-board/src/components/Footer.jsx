import React from "react";

export default function Footer({ activeTasks, finishedTasks }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-left">
          <p>Active Tasks: {activeTasks}</p>
          <p>Finished Tasks: {finishedTasks}</p>
        </div>
        <div className="footer-right">Kanban board by Dmitry Istomin, 2024</div>
      </div>
    </footer>
  );
}
