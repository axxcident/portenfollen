import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const GitHubHeatmap = ({ contributions }) => {
  return (
    <div>
      <h3>GitHub Commit Heatmap</h3>
      <CalendarHeatmap
        startDate={new Date('2023-01-01')}
        endDate={new Date('2023-12-31')}
        values={contributions.map((contribution) => ({
          date: new Date(contribution.created_at),
          count: contribution.count,
        }))}
        showWeekdayLabels
      />
    </div>
  );
};

export default GitHubHeatmap;
