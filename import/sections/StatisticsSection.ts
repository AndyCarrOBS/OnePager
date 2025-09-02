export interface Statistic {
  id: string;
  value: string;
  label: string;
}

export interface StatisticsSection {
  id: 'statistics';
  type: 'stats-display';
  position: {
    top: 5076;
    left: 375;
    width: 800;
    height: 259;
  };
  content: {
    statistics: Statistic[];
  };
  styles: {
    background: '#1b75ba66';
    borderRadius: 'xl';
    textColor: 'white';
    statValueSize: 'text-[100px]';
    statLabelSize: 'text-2xl';
  };
}

export const statisticsSection: StatisticsSection = {
  id: 'statistics',
  type: 'stats-display',
  position: {
    top: 5076,
    left: 375,
    width: 800,
    height: 259,
  },
  content: {
    statistics: [
      {
        id: 'arabic-channels',
        value: '50+',
        label: 'Arabic Channels',
      },
      {
        id: 'hours-watched',
        value: '1M+',
        label: 'Hours Watched',
      },
    ],
  },
  styles: {
    background: '#1b75ba66',
    borderRadius: 'xl',
    textColor: 'white',
    statValueSize: 'text-[100px]',
    statLabelSize: 'text-2xl',
  },
};
