import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Button, TextField } from 'actify';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { createJob } from '@/slices/jobSlice';
import { getCategoryIcon, getCategoryLabel } from '@/utils/categories';
import CloutModal from '@/components/CloutModal';
import CategoryModal from '@/components/CategoryModal';
import toast, { Toaster } from 'react-hot-toast';

const MIN_ROWS = 3;
const MAX_ROWS = 12;
const LINE_HEIGHT_PX = 24;

function useAutoGrowRows(text: string) {
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(MIN_ROWS);

  useLayoutEffect(() => {
    if (!mirrorRef.current) return;
    const measuredLines = Math.ceil(mirrorRef.current.scrollHeight / LINE_HEIGHT_PX);
    setRows(Math.min(Math.max(measuredLines, MIN_ROWS), MAX_ROWS));
  }, [text]);

  return { rows, mirrorRef };
}

interface ListItem {
  id: string;
  text: string;
}

function createId() {
  return Math.random().toString(36).slice(2);
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto';
  el.style.height = `${el.scrollHeight}px`;
}

interface CreateCampaignProps {
  onClose: () => void;
}

export default function CreateCampaign({ onClose }: CreateCampaignProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetCreator, setTargetCreator] = useState('');
  const [showCategories, setShowCategories] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [requirementItems, setRequirementItems] = useState<ListItem[]>([
    { id: createId(), text: '' },
  ]);
  const [questionItems, setQuestionItems] = useState<ListItem[]>([{ id: createId(), text: '' }]);

  const requirementRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map());
  const questionRefs = useRef<Map<string, HTMLTextAreaElement>>(new Map());
  const pendingRequirementFocus = useRef<{ id: string; cursor: number } | null>(null);
  const pendingQuestionFocus = useRef<{ id: string; cursor: number } | null>(null);

  const dispatch = useAppDispatch();
  const { jobLoading } = useAppSelector((state) => state.job);

  const { rows: descriptionRows, mirrorRef: descriptionMirrorRef } = useAutoGrowRows(description);

  useEffect(() => {
    if (!pendingRequirementFocus.current) return;
    const { id, cursor } = pendingRequirementFocus.current;
    const el = requirementRefs.current.get(id);
    if (el) {
      el.focus();
      el.setSelectionRange(cursor, cursor);
      autoResize(el);
    }
    pendingRequirementFocus.current = null;
  }, [requirementItems]);

  useEffect(() => {
    if (!pendingQuestionFocus.current) return;
    const { id, cursor } = pendingQuestionFocus.current;
    const el = questionRefs.current.get(id);
    if (el) {
      el.focus();
      el.setSelectionRange(cursor, cursor);
      autoResize(el);
    }
    pendingQuestionFocus.current = null;
  }, [questionItems]);

  const makeListHandlers = (
    items: ListItem[],
    setItems: React.Dispatch<React.SetStateAction<ListItem[]>>,
    pendingFocusRef: React.MutableRefObject<{ id: string; cursor: number } | null>,
  ) => {
    const updateText = (id: string, text: string) => {
      setItems((prev) => prev.map((item) => (item.id === id ? { ...item, text } : item)));
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLTextAreaElement>,
      index: number,
      value: string,
    ) => {
      const el = e.currentTarget;
      const item = items[index];

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (value === '') return;

        const cursor = el.selectionStart;
        const before = item.text.slice(0, cursor);
        const after = item.text.slice(cursor);
        const newItem: ListItem = { id: createId(), text: after };

        setItems((prev) => [
          ...prev.slice(0, index),
          { ...item, text: before },
          newItem,
          ...prev.slice(index + 1),
        ]);
        pendingFocusRef.current = { id: newItem.id, cursor: 0 };
        return;
      }

      if (e.key === 'Backspace' && el.selectionStart === 0 && el.selectionEnd === 0 && index > 0) {
        e.preventDefault();
        const previous = items[index - 1];
        const mergedText = previous.text + item.text;
        const cursor = previous.text.length;

        setItems((prev) => [
          ...prev.slice(0, index - 1),
          { ...previous, text: mergedText },
          ...prev.slice(index + 1),
        ]);
        pendingFocusRef.current = { id: previous.id, cursor };
      }
    };

    return { updateText, handleKeyDown };
  };

  const requirementHandlers = makeListHandlers(
    requirementItems,
    setRequirementItems,
    pendingRequirementFocus,
  );
  const questionHandlers = makeListHandlers(questionItems, setQuestionItems, pendingQuestionFocus);

  const handleSubmit = async () => {
    const cleanedRequirements = requirementItems.map((item) => item.text.trim()).filter(Boolean);
    const cleanedQuestions = questionItems.map((item) => item.text.trim()).filter(Boolean);

    await dispatch(
      createJob({
        title,
        description,
        requirements: cleanedRequirements,
        targetCreator,
        questions: cleanedQuestions,
      }),
    ).unwrap().then(() => {
      toast.success('Campaign created successfully!');
      onClose();
    }).catch((error) => {
      toast.error('Failed to create job: ' + error);
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-start gap-6 overflow-y-auto p-3 pb-32">
      <Toaster />
      <div className="flex w-full flex-col gap-3">
        <TextField label="Title" variant="outlined" value={title} onChange={setTitle} />

        <div className="relative w-full">
          <div
            ref={descriptionMirrorRef}
            className="invisible absolute w-full whitespace-pre-wrap wrap-break-word px-4"
            style={{ lineHeight: `${LINE_HEIGHT_PX}px`, font: 'inherit' }}
            aria-hidden
          >
            {description || ' '}
          </div>

          <TextField
            type="textarea"
            label="Description"
            variant="outlined"
            inputProps={
              {
                rows: descriptionRows,
                value: description,
                onChange: (q: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(q.target.value),
              } as unknown as React.InputHTMLAttributes<HTMLInputElement>
            }
          />
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border border-black p-3 focus-within:ring-2 focus-within:ring-primary">
          <span className="text-sm">
            Requirements: <span className="text-gray-500">Add campaign requirements.</span>
          </span>
          {requirementItems.map((item, index) => (
            <div key={item.id} className="flex w-full items-start justify-center gap-2">
              <span className="mt-0.5 shrink-0 text-center font-semibold select-none">•</span>
              <textarea
                ref={(el) => {
                  if (el) requirementRefs.current.set(item.id, el);
                  else requirementRefs.current.delete(item.id);
                }}
                value={item.text}
                rows={1}
                className="w-full flex-1 resize-none overflow-hidden bg-transparent outline-none"
                onChange={(e) => {
                  requirementHandlers.updateText(item.id, e.target.value);
                  autoResize(e.target);
                }}
                onKeyDown={(e) => {
                  requirementHandlers.handleKeyDown(e, index, item.text.trim());
                }}
                onFocus={(e) => autoResize(e.target)}
              />
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col gap-3 rounded-xl border border-black p-3 focus-within:ring-2 focus-within:ring-primary">
          <p className="text-sm">
            Questions (optional): <span className="text-gray-500">Add campaign questions</span>
          </p>
          {questionItems.map((item, index) => (
            <div key={item.id} className="flex w-full items-start justify-center gap-2">
              <span className="mt-0.5 shrink-0 text-center font-semibold select-none">
                {index + 1}.
              </span>
              <textarea
                ref={(el) => {
                  if (el) questionRefs.current.set(item.id, el);
                  else questionRefs.current.delete(item.id);
                }}
                value={item.text}
                rows={1}
                className="w-full flex-1 resize-none overflow-hidden bg-transparent outline-none"
                onChange={(e) => {
                  questionHandlers.updateText(item.id, e.target.value);
                  autoResize(e.target);
                }}
                onKeyDown={(e) => {
                  questionHandlers.handleKeyDown(e, index, item.text.trim());
                }}
                onFocus={(e) => autoResize(e.target)}
              />
            </div>
          ))}
        </div>

        <TextField
          label="Target Creator"
          variant="outlined"
          trailingIcon={(() => {
            const CategoryIcon = getCategoryIcon(targetCreator);
            return CategoryIcon ? <CategoryIcon /> : undefined;
          })()}
          inputProps={
            {
              value: getCategoryLabel(targetCreator),
              readOnly: true,
              ref: inputRef,
              className: 'cursor-pointer caret-transparent',
              onFocus: () => setShowCategories(true),
              onClick: () => setShowCategories(true),
            } as React.InputHTMLAttributes<HTMLInputElement>
          }
        />
      </div>

      <Button color="primary" variant="filled" isDisabled={jobLoading} onPress={handleSubmit}>
        {jobLoading ? 'Creating…' : 'Create'}
      </Button>

      <CloutModal isOpen={showCategories} onClose={() => setShowCategories(false)}>
        <CategoryModal
          selectedValue={targetCreator}
          onSelect={(value) => {
            setTargetCreator(value);
            setShowCategories(false);
          }}
        />
      </CloutModal>
    </div>
  );
}
