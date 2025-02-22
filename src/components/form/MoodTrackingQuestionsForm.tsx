import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "@/lib/api";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const MoodTrackingQuestionsForm = () => {
  const [questions, setQuestions] = useState<
    { id: number; question: string; scale: number[]; labels: string[] }[]
  >([]);
  const [responses, setResponses] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await BASE_URL.get("/mood_tracking/mood_tracking_questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      const completedQuestions = Object.keys(responses).length;
      setProgress((completedQuestions / questions.length) * 100);
    }
  }, [responses, questions]);

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
      const response = await BASE_URL.post("/mood_tracking/submit_mood_tracking_answers", {
        responses: Object.entries(responses).map(([questionId, answer]) => ({
          question: questions.find((q) => q.id === parseInt(questionId))?.question || "",
          answer,
        })),
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting responses:", error);
      toast.error("Failed to submit responses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8"
      >
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Daily Mood Tracker
            </h2>
            <p className="text-gray-400 text-center mt-2">
              Track your mood patterns with these simple daily questions.
            </p>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="mb-8" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                {questions?.map((question, index) => (
                  <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/30 p-6 rounded-lg hover:bg-gray-700/40 transition-colors"
                  >
                    <Label className="text-lg font-medium mb-3 block">
                      <span className="text-blue-400">{question.id}. </span>
                      {question.question}
                    </Label>
                    <Select
                      value={responses[question.id]?.toString()}
                      onValueChange={(value) => handleChange(question.id, parseInt(value))}
                    >
                      <SelectTrigger className="bg-gray-600/50 border-gray-600 text-white">
                        <span>
                          {responses[question.id]
                            ? question.labels[question.scale.indexOf(responses[question.id])]
                            : "Select an option"}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        {question.scale.map((option, index) => (
                          <SelectItem
                            key={option}
                            value={option.toString()}
                            className="text-white hover:bg-gray-600"
                          >
                            {question.labels[index]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Button
                  disabled={loading || progress !== 100}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-6"
                  type="submit"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : progress === 100 ? (
                    "Submit Responses"
                  ) : (
                    `Complete all questions (${Math.round(progress)}%)`
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default MoodTrackingQuestionsForm;
