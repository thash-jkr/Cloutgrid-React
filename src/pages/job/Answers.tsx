import type { AnswerModel, QuestionModel } from "@/types/jobTypes";

interface AnswersProps {
  questions: QuestionModel[];
  answers: AnswerModel[];
}

const Answers = ({ questions, answers }: AnswersProps) => {
  return <div className="flex flex-col w-full h-full overflow-y-auto divide-y">
    {questions.map((question, index) => {
      const answer = answers.find((ans) => ans.question === question.id);
      return (
        <div key={question.id} className="p-3">
          <h3 className="font-semibold">{index + 1}. {question.content}</h3>
          
          <div className="p-3 border rounded-xl bg-slate-50">
            <p className="whitespace-pre-line">{answer ? answer.content : "No answer provided."}</p>
          </div>
        </div>
      );
    })}
  </div>;
};

export default Answers;
