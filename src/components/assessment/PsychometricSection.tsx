import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Brain, Heart, Users, Zap } from "lucide-react";

interface Question {
  id: string;
  text: string;
  category: "personality" | "motivation" | "interests" | "cognitive";
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  {
    id: "p1",
    category: "personality",
    text: "When working on complex legal documents, I prefer to:",
    options: [
      { value: "1", label: "Work methodically through each section in order" },
      { value: "2", label: "Get an overview first, then dive into details" },
      { value: "3", label: "Focus on the most critical parts first" },
      { value: "4", label: "Collaborate with others to understand different perspectives" }
    ]
  },
  {
    id: "p2",
    category: "personality",
    text: "In a team meeting discussing UX improvements for legal software, I typically:",
    options: [
      { value: "1", label: "Listen carefully and contribute thoughtful insights" },
      { value: "2", label: "Take the lead in driving the discussion forward" },
      { value: "3", label: "Ask clarifying questions to ensure understanding" },
      { value: "4", label: "Focus on practical implementation challenges" }
    ]
  },
  {
    id: "m1",
    category: "motivation",
    text: "What motivates me most about improving user experiences in legal technology:",
    options: [
      { value: "1", label: "Making complex legal processes more accessible to everyone" },
      { value: "2", label: "Solving challenging technical and regulatory constraints" },
      { value: "3", label: "Building innovative solutions that transform the industry" },
      { value: "4", label: "Helping legal professionals work more efficiently" }
    ]
  },
  {
    id: "i1",
    category: "interests",
    text: "Which aspect of legal UX work sounds most engaging to you:",
    options: [
      { value: "1", label: "Conducting user research with legal professionals" },
      { value: "2", label: "Designing intuitive interfaces for complex legal workflows" },
      { value: "3", label: "Ensuring compliance while maintaining usability" },
      { value: "4", label: "Analyzing user behavior and improving experiences" }
    ]
  },
  {
    id: "c1",
    category: "cognitive",
    text: "When faced with conflicting requirements (user needs vs. legal compliance), I would:",
    options: [
      { value: "1", label: "Research similar cases and best practices" },
      { value: "2", label: "Consult with legal experts and stakeholders" },
      { value: "3", label: "Prototype multiple solutions and test them" },
      { value: "4", label: "Analyze the trade-offs systematically" }
    ]
  },
  {
    id: "p3",
    category: "personality",
    text: "My approach to learning new legal regulations and compliance requirements is:",
    options: [
      { value: "1", label: "Study them thoroughly before applying them" },
      { value: "2", label: "Learn by working on real projects with guidance" },
      { value: "3", label: "Break them down into smaller, manageable parts" },
      { value: "4", label: "Discuss them with experts to gain insights" }
    ]
  }
];

interface Props {
  onComplete: (data: any) => void;
}

const PsychometricSection: React.FC<Props> = ({ onComplete }) => {
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
      case "personality": return <Brain className="h-4 w-4" />;
      case "motivation": return <Heart className="h-4 w-4" />;
      case "interests": return <Zap className="h-4 w-4" />;
      case "cognitive": return <Users className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "personality": return "bg-blue-500";
      case "motivation": return "bg-red-500";
      case "interests": return "bg-yellow-500";
      case "cognitive": return "bg-green-500";
      default: return "bg-gray-500";
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
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge 
              variant="secondary" 
              className={`${getCategoryColor(currentQuestion.category)} text-white`}
            >
              {getCategoryIcon(currentQuestion.category)}
              <span className="ml-1 capitalize">{currentQuestion.category}</span>
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
                    ? 'border-primary bg-primary/5'
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
          className="bg-gradient-primary hover:shadow-primary"
        >
          {isLastQuestion ? "Complete Section" : "Next Question"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
        {["personality", "motivation", "interests", "cognitive"].map((category) => {
          const categoryQuestions = questions.filter(q => q.category === category);
          const answeredInCategory = categoryQuestions.filter(q => answers[q.id]).length;
          const categoryProgress = (answeredInCategory / categoryQuestions.length) * 100;
          
          return (
            <div key={category} className="text-center">
              <div className={`w-8 h-8 rounded-full ${getCategoryColor(category)} flex items-center justify-center text-white text-xs font-bold mx-auto mb-2`}>
                {getCategoryIcon(category)}
              </div>
              <div className="text-xs text-muted-foreground capitalize mb-1">{category}</div>
              <Progress value={categoryProgress} className="h-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PsychometricSection;