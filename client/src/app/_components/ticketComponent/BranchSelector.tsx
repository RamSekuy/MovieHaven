import { FC, useState } from 'react';

interface BranchSelectorProps {
  onSelect: (branch: string) => void;
}

const BranchSelector: FC<BranchSelectorProps> = ({ onSelect }) => {
  const [branch, setBranch] = useState('');

  const branches = ['Branch 1', 'Branch 2', 'Branch 3'];

  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold">Select Branch</h2>
      <select
        className="mt-2 p-2 border rounded"
        value={branch}
        onChange={(e) => {
          setBranch(e.target.value);
          onSelect(e.target.value);
        }}
      >
        <option value="">Select a branch</option>
        {branches.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelector;
