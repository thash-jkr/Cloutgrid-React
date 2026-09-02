import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, TextField } from 'actify';

interface CloutAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body: string;
  textField?: boolean;
  timed?: boolean;
}

export default function CloutAlert({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  textField = false,
  timed = false,
}: CloutAlertProps) {
  const [secondsLeft, setSecondsLeft] = useState(timed ? 10 : 0);
  const [text, setText] = useState('');

  const MAX_ROWS = 5;
  const CHARS_PER_ROW = 20;

  const newlineRows = text.split('\n').length;
  const charRows = Math.ceil(text.length / CHARS_PER_ROW);
  const rowCount = Math.min(Math.max(newlineRows, charRows, 1), MAX_ROWS);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsLeft(timed ? 10 : 0);
    if (!timed) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, timed]);

  if (!isOpen) return null;

  const isSubmitDisabled = secondsLeft > 0;
  const isTextEmpty = textField && text.length == 0;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={() => {
        () => {
          setText('');
          onClose();
        };
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-2 text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-600">{body}</p>

        {textField && (
          <div className="mt-4">
            <TextField
              label="Message"
              type="textarea"
              variant="outlined"
              inputProps={
                {
                  rows: rowCount,
                  value: text,
                  onChange: (q) => setText(q.target.value),
                } as React.InputHTMLAttributes<HTMLInputElement>
              }
            />
          </div>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <Button
            variant="outlined"
            color="primary"
            onPress={() => {
              setText('');
              onClose();
            }}
          >
            <span>Cancel</span>
          </Button>

          <Button variant="filled" isDisabled={isSubmitDisabled || isTextEmpty} onPress={onSubmit}>
            {isSubmitDisabled ? `Confirm (${secondsLeft})` : 'Confirm'}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
