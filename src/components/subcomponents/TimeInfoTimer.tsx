import React from 'react';

const TimeInfoTimer: React.FC<{
  timeString: string;
  time: number;
  timezone: number;
}> = ({ timeString, time, timezone }) => {
  return (
    <div className="flex">
      <div className="flex">
        <p>{timeString}</p>
        <p className="font-medium ml-2">
          {('0' + new Date(time + timezone).getUTCHours()).slice(-2) +
            `:` +
            ('0' + new Date(time + timezone).getUTCMinutes()).slice(-2) +
            `:` +
            ('0' + new Date(time + timezone).getUTCSeconds()).slice(-2)}
        </p>
      </div>
    </div>
  );
};

export default TimeInfoTimer;
