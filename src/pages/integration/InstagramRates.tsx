import type { InstagramRateState } from '@/types/integrationTypes';
import { Button, TextField } from 'actify';
import { useState } from 'react';

const toRate = (v: string): number | null => (v === '' ? null : Number(v));

const FIELDS: { key: keyof InstagramRateState; label: string }[] = [
  { key: 'story', label: 'Story' },
  { key: 'post', label: 'Post' },
  { key: 'reel', label: 'Reel' },
  { key: 'carousel', label: 'Carousel' },
  { key: 'live', label: 'Live' },
];

const Row = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const handleChange = (v: string) => {
    onChange(v.replace(/\D/g, ''));
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span className="font-semibold">{label}</span>

      <div className="w-1/2">
        <TextField
          label="Amount"
          variant="outlined"
          value={value}
          onChange={handleChange}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
            value,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
          }}
        />
      </div>
    </div>
  );
};

const InstagramRates = ({
  initial,
  onSaved,
}: {
  initial: InstagramRateState;
  onSaved: (newRates: InstagramRateState) => void;
}) => {
  const [rates, setRates] = useState(initial);

  const update = (key: keyof InstagramRateState, v: string) =>
    setRates((prev) => ({ ...prev, [key]: toRate(v) }));

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-5 overflow-y-auto p-3">
      <div className="flex w-full flex-col items-center justify-center gap-3">
        {FIELDS.map(({ key, label }) => (
          <Row
            key={key}
            label={label}
            value={rates[key] === null ? '' : String(rates[key])}
            onChange={(v) => update(key, v)}
          />
        ))}
      </div>

      <Button onPress={() => onSaved(rates)}>Save</Button>
    </div>
  );
};

export default InstagramRates;
