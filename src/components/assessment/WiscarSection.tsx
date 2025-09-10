import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Zap, Heart, Wrench, Brain, BookOpen, MapPin } from "lucide-react";

interface Question {
  id: string;
  text: string;
  dimension: "will" | "interest" | "skill" | "cognitive" | "ability" | "realWorld";
  type: "likert" | "scenario" | "self-assessment";
  options?: { value: string; label: string }[];
  scale?: { min: number; max: number; labels: string[] };
}

const questions: Question[] = [
  // Will (W) - Inner drive and persistence
  {
    id: "w1",
    dimension: "will",
    type: "likert",
    text: "I am willing to invest significant time learning about legal industry regulations and requirements.",
    scale: { min: 1, max: 5, labels: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"] }
  },
  {
    id: "w2",
    dimension: "will",
    type: "scenario",
    text: "A complex legal UX project will require 6 months of intensive work with potential setbacks. Your approach would be:",
    options: [
      { value: "1", label: "Commit fully and persist through challenges" },
      { value: "2", label: "Start enthusiastically but might lose motivation if obstacles arise" },
      { value: "3", label: "Prefer projects with clearer, shorter timelines" },
      { value: "4", label: "Need regular milestones and recognition to stay motivated" }
    ]
  },

  // Interest (I) - Curiosity and engagement
  {
    id: "i1",
    dimension: "interest",
    type: "likert",
    text: "I find legal processes and workflows genuinely fascinating to study.",
    scale: { min: 1, max: 5, labels: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"] }
  },
  {
    id: "i2",
    dimension: "interest",
    type: "scenario",
    text: "In your free time, you would most likely:",
    options: [
      { value: "1", label: "Read about legal technology innovations and case studies" },
      { value: "2", label: "Explore general UX design trends and methodologies" },
      { value: "3", label: "Focus on unrelated hobbies and activities" },
      { value: "4", label: "Learn about other professional domains" }
    ]
  },

  // Skill (S) - Current technical/soft skills
  {
    id: "s1",
    dimension: "skill",
    type: "self-assessment",
    text: "Rate your current proficiency in UX design principles and methodologies:",
    scale: { min: 1, max: 10, labels: ["Beginner", "Intermediate", "Advanced", "Expert"] }
  },
  {
    id: "s2",
    dimension: "skill",
    type: "self-assessment",
    text: "Rate your understanding of legal industry workflows and terminology:",
    scale: { min: 1, max: 10, labels: ["No knowledge", "Basic", "Good", "Expert"] }
  },

  // Cognitive (C) - Problem-solving & analytical thinking
  {
    id: "c1",
    dimension: "cognitive",
    type: "scenario",
    text: "When analyzing a complex user workflow problem, you typically:",
    options: [
      { value: "1", label: "Break it down systematically into smaller components" },
      { value: "2", label: "Look for patterns and analogies from similar situations" },
      { value: "3", label: "Seek input from multiple perspectives before analyzing" },
      { value: "4", label: "Focus on the most critical pain points first" }
    ]
  },

  // Ability to Learn (A) - Openness, metacognition, adaptability
  {
    id: "a1",
    dimension: "ability",
    type: "likert",
    text: "I actively seek feedback and adjust my approach based on new information.",
    scale: { min: 1, max: 5, labels: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  },

  // Real-World Alignment (R) - Job fit and applicability
  {
    id: "r1",
    dimension: "realWorld",
    type: "scenario",
    text: "The most appealing aspect of working as a Legal UX Specialist would be:",
    options: [
      { value: "1", label: "Making legal services more accessible to ordinary people" },
      { value: "2", label: "Working with cutting-edge technology in a traditional industry" },
      { value: "3", label: "Collaborating with legal professionals to solve complex problems" },
      { value: "4", label: "Building expertise in a specialized, high-demand field" }
    ]
  }
];

interface Props {
  onComplete: (data: any) => void;
}

const WiscarSection: React.FC<Props> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleSliderChange = (values: number[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: values[0] }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const canProceed = answers[currentQuestion.id] !== undefined;

  const getDimensionIcon = (dimension: string) => {
    switch (dimension) {
      case "will": return <Zap className="h-4 w-4" />;
      case "interest": return <Heart className="h-4 w-4" />;
      case "skill": return <Wrench className="h-4 w-4" />;
      case "cognitive": return <Brain className="h-4 w-4" />;
      case "ability": return <BookOpen className="h-4 w-4" />;
      case "realWorld": return <MapPin className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getDimensionColor = (dimension: string) => {
    switch (dimension) {
      case "will": return "bg-red-500";
      case "interest": return "bg-pink-500";
      case "skill": return "bg-blue-500";
      case "cognitive": return "bg-green-500";
      case "ability": return "bg-yellow-500";
      case "realWorld": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getDimensionName = (dimension: string) => {
    switch (dimension) {
      case "will": return "Will";
      case "interest": return "Interest";
      case "skill": return "Skill";
      case "cognitive": return "Cognitive";
      case "ability": return "Ability to Learn";
      case "realWorld": return "Real-World Fit";
      default: return dimension;
    }
  };

  const renderQuestion = () => {
    if (currentQuestion.type === "likert" || currentQuestion.type === "self-assessment") {
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {answers[currentQuestion.id] || "?"}
            </div>
            <div className="text-sm text-muted-foreground">
              {currentQuestion.scale?.labels[Math.min((answers[currentQuestion.id] || 1) - 1, currentQuestion.scale.labels.length - 1)]}
            </div>
          </div>
          <div className="px-4">
            <Slider
              value={[answers[currentQuestion.id] || currentQuestion.scale?.min || 1]}
              onValueChange={handleSliderChange}
              max={currentQuestion.scale?.max || 5}
              min={currentQuestion.scale?.min || 1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{currentQuestion.scale?.labels[0]}</span>
              <span>{currentQuestion.scale?.labels[currentQuestion.scale.labels.length - 1]}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <RadioGroup
        value={answers[currentQuestion.id] || ""}
        onValueChange={handleAnswerSelect}
        className="space-y-4"
      >
        {currentQuestion.options?.map((option) => (
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
    );
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
      <Card className="border-2 border-tertiary/20">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge 
              variant="secondary" 
              className={`${getDimensionColor(currentQuestion.dimension)} text-white`}
            >
              {getDimensionIcon(currentQuestion.dimension)}
              <span className="ml-1">{getDimensionName(currentQuestion.dimension)}</span>
            </Badge>
          </div>
          <CardTitle className="text-lg leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderQuestion()}
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
          className="bg-gradient-hero hover:shadow-primary"
        >
          {isLastQuestion ? "Complete Assessment" : "Next Question"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* WISCAR Dimensions Progress */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t">
        {["will", "interest", "skill", "cognitive", "ability", "realWorld"].map((dimension) => {
          const dimensionQuestions = questions.filter(q => q.dimension === dimension);
          const answeredInDimension = dimensionQuestions.filter(q => answers[q.id]).length;
          const dimensionProgress = (answeredInDimension / dimensionQuestions.length) * 100;
          
          return (
            <div key={dimension} className="text-center">
              <div className={`w-8 h-8 rounded-full ${getDimensionColor(dimension)} flex items-center justify-center text-white text-xs font-bold mx-auto mb-2`}>
                {getDimensionIcon(dimension)}
              </div>
              <div className="text-xs text-muted-foreground mb-1">{getDimensionName(dimension)}</div>
              <Progress value={dimensionProgress} className="h-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WiscarSection;