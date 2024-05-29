import { FC, useState } from 'react';

interface TimeSelectorProps {
  onSelect: (time: string) => void;
}

const TimeSelector: FC<TimeSelectorProps> = ({ onSelect }) => {
  const [time, setTime] = useState('');

  const times = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Select Time</h2>
      <select
        className="mt-2 p-2 border rounded"
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          onSelect(e.target.value);
        }}
      >
        <option value="">Select a time</option>
        {times.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
