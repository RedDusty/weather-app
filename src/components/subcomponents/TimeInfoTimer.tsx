import React, { useEffect, useState } from 'react';
import { getTimeLeft } from '../../functions';

const TimeInfoTimer: React.FC<{ timeString: string; time: Date }> = ({
  timeString,
  time,
}) => {
  const [difTime, setDifTime] = useState<string>(getTimeLeft(time.getTime()));
  useEffect(() => {
    const timer = setTimeout(() => {
      setDifTime(getTimeLeft(time.getTime()));
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <div className="flex">
      <div className="flex">
        <p>{timeString}</p>
        <p className="font-medium ml-2">
          {('0' + time.getHours()).slice(-2) +
            `:` +
            ('0' + time.getMinutes()).slice(-2) +
            `:` +
            ('0' + time.getSeconds()).slice(-2)}
        </p>
      </div>
      <div className="ml-4">
        <p>{difTime}</p>
      </div>
    </div>
  );
};

export default TimeInfoTimer;
