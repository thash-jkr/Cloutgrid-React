import type { QuestionModel } from '@/types/jobTypes';
import { Button, TextField } from 'actify';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface QuestionsScope {
  questions: QuestionModel[];
  onSubmit: (answers: Record<number, string>) => void;
}

const Questions = ({ questions, onSubmit }: QuestionsScope) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const handleAnswer = (answer: string, questionId: number) => {
    setAnswers((prevState) => ({
      ...prevState,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    const allAnswersFilled = questions.every((question) => {
      return answers[question.id] && answers[question.id].trim() !== "";
    });

    if (!allAnswersFilled) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    onSubmit(answers);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <Toaster />
      <div className="w-full overflow-y-auto flex flex-col justify-start items-center gap-5 pb-5">
        <div className='divide-y w-full'>
          {questions.map((question, index) => (
          <div className="w-full flex flex-col gap-3 p-3">
            <label>
              {index + 1}. {question.content}
            </label>
            <TextField
              label="Answer"
              type="textarea"
              variant="outlined"
              inputProps={
                {
                  rows: 5,
                  value: answers[question.id] || '',
                  onChange: (q) => handleAnswer(q.target.value, question.id),
                } as React.InputHTMLAttributes<HTMLInputElement>
              }
            />
          </div>
        ))}
        </div>

        <Button variant='filled' onPress={handleSubmit}>
          <span>Submit</span>
        </Button>
      </div>
    </div>
  );
};

export default Questions;
