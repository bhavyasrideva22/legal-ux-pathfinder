import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, ArrowLeft, ArrowRight } from "lucide-react";
import PsychometricSection from "@/components/assessment/PsychometricSection";
import TechnicalSection from "@/components/assessment/TechnicalSection";
import WiscarSection from "@/components/assessment/WiscarSection";

type AssessmentSection = "psychometric" | "technical" | "wiscar";

const Assessment = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<AssessmentSection>("psychometric");
  const [responses, setResponses] = useState({
    psychometric: {},
    technical: {},
    wiscar: {}
  });

  const sections = [
    { key: "psychometric", title: "Psychometric Evaluation", description: "Personality and motivational fit" },
    { key: "technical", title: "Technical Readiness", description: "Skills and domain knowledge" },
    { key: "wiscar", title: "WISCAR Framework", description: "Comprehensive skill mapping" }
  ];

  const currentSectionIndex = sections.findIndex(s => s.key === currentSection);
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  const handleSectionComplete = (sectionData: any) => {
    setResponses(prev => ({
      ...prev,
      [currentSection]: sectionData
    }));

    if (currentSection === "psychometric") {
      setCurrentSection("technical");
    } else if (currentSection === "technical") {
      setCurrentSection("wiscar");
    } else {
      // Assessment complete, navigate to results
      navigate("/results", { state: { responses: { ...responses, [currentSection]: sectionData } } });
    }
  };

  const handlePrevious = () => {
    if (currentSection === "technical") {
      setCurrentSection("psychometric");
    } else if (currentSection === "wiscar") {
      setCurrentSection("technical");
    }
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "psychometric":
        return <PsychometricSection onComplete={handleSectionComplete} />;
      case "technical":
        return <TechnicalSection onComplete={handleSectionComplete} />;
      case "wiscar":
        return <WiscarSection onComplete={handleSectionComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Legal UX Assessment</h1>
            </div>
            <Badge variant="outline" className="font-medium">
              Section {currentSectionIndex + 1} of {sections.length}
            </Badge>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Assessment Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-2 overflow-x-auto">
            {sections.map((section, index) => (
              <div key={section.key} className="flex items-center gap-2 min-w-fit">
                <div className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                  section.key === currentSection 
                    ? 'bg-gradient-primary text-white' 
                    : index < currentSectionIndex 
                      ? 'bg-success/10 text-success'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    section.key === currentSection 
                      ? 'bg-white/20' 
                      : index < currentSectionIndex
                        ? 'bg-success/20'
                        : 'bg-muted-foreground/20'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{section.title}</div>
                    <div className={`text-xs ${
                      section.key === currentSection 
                        ? 'text-white/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {section.description}
                    </div>
                  </div>
                </div>
                {index < sections.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-neutral-dark">
              {sections[currentSectionIndex].title}
            </CardTitle>
            <CardDescription className="text-lg">
              {sections[currentSectionIndex].description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentSection()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentSection === "psychometric"}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Section
          </Button>
          <div className="text-sm text-muted-foreground flex items-center gap-2">
            Step {currentSectionIndex + 1} of {sections.length}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Assessment;