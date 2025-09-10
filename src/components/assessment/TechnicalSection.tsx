import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, Scale, Lightbulb, Target } from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: "ux-fundamentals" | "legal-knowledge" | "analytical" | "practical";
  options: { value: string; label: string; correct?: boolean }[];
  explanation?: string;
}

const questions: Question[] = [
  {
    id: "t1",
    category: "ux-fundamentals",
    text: "What is the primary goal of user experience design?",
    options: [
      { value: "1", label: "Making interfaces look visually appealing" },
      { value: "2", label: "Creating useful, usable, and delightful experiences", correct: true },
      { value: "3", label: "Implementing the latest design trends" },
      { value: "4", label: "Reducing development time and costs" }
    ],
    explanation: "UX design focuses on creating experiences that are useful (meet user needs), usable (easy to use), and delightful (engaging and satisfying)."
  },
  {
    id: "t2",
    category: "legal-knowledge",
    text: "In legal technology, what does 'compliance' primarily refer to?",
    options: [
      { value: "1", label: "Following software development best practices" },
      { value: "2", label: "Meeting accessibility standards" },
      { value: "3", label: "Adhering to legal and regulatory requirements", correct: true },
      { value: "4", label: "Maintaining data backup procedures" }
    ],
    explanation: "Compliance in legal tech means ensuring systems meet legal and regulatory requirements like GDPR, HIPAA, or industry-specific regulations."
  },
  {
    id: "t3",
    category: "analytical",
    text: "A law firm reports that their document management system is 'difficult to use.' What should be your first step as a Legal UX specialist?",
    options: [
      { value: "1", label: "Immediately redesign the interface" },
      { value: "2", label: "Conduct user research to understand specific pain points", correct: true },
      { value: "3", label: "Review competitor solutions" },
      { value: "4", label: "Upgrade to the latest technology" }
    ],
    explanation: "User research helps identify specific problems and user needs before proposing solutions."
  },
  {
    id: "t4",
    category: "practical",
    text: "When designing a legal contract review interface, which element is most critical for user efficiency?",
    options: [
      { value: "1", label: "Colorful visual design" },
      { value: "2", label: "Clear navigation and document structure highlighting", correct: true },
      { value: "3", label: "Advanced animation effects" },
      { value: "4", label: "Multiple font options" }
    ],
    explanation: "Legal professionals need clear, structured interfaces that help them quickly navigate and understand complex documents."
  },
  {
    id: "t5",
    category: "ux-fundamentals",
    text: "What is a user persona in UX design?",
    options: [
      { value: "1", label: "A fictional character representing a user segment", correct: true },
      { value: "2", label: "A database of user preferences" },
      { value: "3", label: "A design template" },
      { value: "4", label: "A user interface component" }
    ],
    explanation: "User personas are fictional characters based on research that represent different user types and help guide design decisions."
  },
  {
    id: "t6",
    category: "legal-knowledge",
    text: "What is attorney-client privilege?",
    options: [
      { value: "1", label: "A lawyer's right to charge premium fees" },
      { value: "2", label: "Protection of confidential communications between attorney and client", correct: true },
      { value: "3", label: "A client's right to change lawyers" },
      { value: "4", label: "Special access to legal databases" }
    ],
    explanation: "Attorney-client privilege protects confidential communications, which is crucial when designing legal technology systems."
  }
];

interface Props {
  onComplete: (data: any) => void;
}

const TechnicalSection: React.FC<Props> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ux-fundamentals": return <Lightbulb className="h-4 w-4" />;
      case "legal-knowledge": return <Scale className="h-4 w-4" />;
      case "analytical": return <Target className="h-4 w-4" />;
      case "practical": return <Code className="h-4 w-4" />;
      default: return <Code className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "ux-fundamentals": return "bg-purple-500";
      case "legal-knowledge": return "bg-indigo-500";
      case "analytical": return "bg-orange-500";
      case "practical": return "bg-teal-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "ux-fundamentals": return "UX Fundamentals";
      case "legal-knowledge": return "Legal Knowledge";
      case "analytical": return "Analytical Thinking";
      case "practical": return "Practical Application";
      default: return category;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card className="border-2 border-secondary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge 
              variant="secondary" 
              className={`${getCategoryColor(currentQuestion.category)} text-white`}
            >
              {getCategoryIcon(currentQuestion.category)}
              <span className="ml-1">{getCategoryName(currentQuestion.category)}</span>
            </Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={answers[currentQuestion.id] || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-4"
          >
            {currentQuestion.options.map((option) => (
              <div
                key={option.value}
                className={`flex items-start space-x-3 p-4 rounded-lg border transition-all cursor-pointer hover:bg-accent/50 ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-secondary bg-secondary/5'
                    : 'border-border'
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                <Label
                  htmlFor={option.value}
                  className="text-sm leading-relaxed cursor-pointer flex-1"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {/* Show explanation if question is answered */}
          {answers[currentQuestion.id] && currentQuestion.explanation && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border-l-4 border-l-primary">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="font-medium text-sm mb-1">Explanation:</h5>
                  <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {Object.keys(answers).length} of {questions.length} questions answered
        </div>
        <Button 
          onClick={handleNext}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-secondary hover:shadow-secondary"
        >
          {isLastQuestion ? "Complete Section" : "Next Question"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        {["ux-fundamentals", "legal-knowledge", "analytical", "practical"].map((category) => {
          const categoryQuestions = questions.filter(q => q.category === category);
          const answeredInCategory = categoryQuestions.filter(q => answers[q.id]).length;
          const categoryProgress = (answeredInCategory / categoryQuestions.length) * 100;
          
          return (
            <div key={category} className="text-center">
              <div className={`w-8 h-8 rounded-full ${getCategoryColor(category)} flex items-center justify-center text-white text-xs font-bold mx-auto mb-2`}>
                {getCategoryIcon(category)}
              </div>
              <div className="text-xs text-muted-foreground mb-1">{getCategoryName(category)}</div>
              <Progress value={categoryProgress} className="h-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TechnicalSection;