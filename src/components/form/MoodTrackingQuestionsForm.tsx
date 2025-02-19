import { useState, useEffect } from "react";
import BASE_URL from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MoodTrackingQuestionsForm = () => {
  const [questions, setQuestions] = useState<
    { id: number; question: string; scale: number[]; labels: string[] }[]
  >([]);
  const [responses, setResponses] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await BASE_URL.get(
          "/mood_tracking/mood_tracking_questions"
        );
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleChange = (questionId: number, value: number) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await BASE_URL.post(
        "/mood_tracking/submit_mood_tracking_answers",
        {
          responses: Object.entries(responses).map(([questionId, answer]) => ({
            question:
              questions.find((q) => q.id === parseInt(questionId))?.question ||
              "",
            answer,
          })),
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-[80px]">
      <p className="text-md border mx-auto  w-[95%] max-w-[600px] block text-wrap p-6 rounded text-center cursor-pointer">
        Answer simple questions daily to track your mood patterns. <br />
        Are You ready?
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mx-auto mt-5 w-[95%] max-w-[600px]  border border-solid border-[rgb(255,255,255,0.2)] p-8 rounded-lg"
      >
        {questions?.map((question) => (
          <div key={question.id} className="grid gap-2">
            <Label className="font-thin text-[16px]">
              <span>{question.id}. </span>
              {question.question}
            </Label>
            <select
              title="select"
              value={responses[question.id] || ""}
              onChange={(e) =>
                handleChange(question.id, parseInt(e.target.value))
              }
              required
              className="text-black font-thin text-[14px] bg-gray-300 rounded"
            >
              <option value="" disabled>
                Select an option
              </option>
              {question.scale.map((option, index) => (
                <option key={option} value={option}>
                  {question.labels[index]}
                </option>
              ))}
            </select>
          </div>
        ))}
        <Button disabled={loading} className="text-md border" type="submit">
          {loading ? "Please wait" : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default MoodTrackingQuestionsForm;
