import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const startDate = new Date('2024-02-29T00:00:00');

  const calculateTime = useCallback(() => {
    const now = new Date();
    const difference = now.getTime() - startDate.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let calcDays = now.getDate() - startDate.getDate();

    if (calcDays < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      calcDays += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days: calcDays, totalDays: days };
  }, [startDate]);

  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, [calculateTime]);

  return (
    <div className="app">
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob blob-a" />
        <span className="blob blob-b" />
      </div>

      <main className="container">
        <h1 className="title">Onze Liefde Telt…</h1>

        <section className="stats">
          <div className="stat-card stat-pink">
            <div className="stat-value">
              {time.years} 
              { time.years === 1 ? <span className="stat-label">Jaar</span> : <span className="stat-label">Jaren</span> }
            </div>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-value">
              {time.months} <span className="stat-label">Maanden</span>
            </div>
          </div>

          <div className="stat-card stat-blue">
            <div className="stat-value">
              {time.days} <span className="stat-label">Dagen</span>
            </div>
          </div>
        </section>

        <section className="details">
          <p className="since">
            Samen sinds <strong>29 februari 2024</strong>
          </p>
          <p className="summary">
            Dat zijn al <strong className="days-strong">{time.totalDays.toLocaleString('nl-NL')}</strong> dagen dat Lars het vol houdt met Sarah<span aria-hidden="true">❤️</span>
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;