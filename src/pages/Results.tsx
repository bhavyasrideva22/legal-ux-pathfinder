import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  ArrowLeft, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Star,
  Download,
  Share2
} from "lucide-react";
import { useEffect, useState } from "react";

interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: "pursue" | "maybe" | "develop";
  strengths: string[];
  areasForDevelopment: string[];
  careerPaths: Array<{
    title: string;
    match: number;
    description: string;
  }>;
  nextSteps: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);

  useEffect(() => {
    // Simulate assessment processing
    const responses = location.state?.responses;
    if (!responses) {
      navigate("/");
      return;
    }

    // Mock assessment calculation - in real app, this would be more sophisticated
    const calculateResults = (): AssessmentResults => {
      const psychometricScore = Math.floor(Math.random() * 30) + 70;
      const technicalScore = Math.floor(Math.random() * 25) + 65;
      const wiscarScores = {
        will: Math.floor(Math.random() * 20) + 75,
        interest: Math.floor(Math.random() * 25) + 70,
        skill: Math.floor(Math.random() * 30) + 60,
        cognitive: Math.floor(Math.random() * 20) + 75,
        ability: Math.floor(Math.random() * 15) + 80,
        realWorld: Math.floor(Math.random() * 25) + 70
      };

      const overallScore = Math.round(
        (psychometricScore * 0.3 + technicalScore * 0.3 + 
         Object.values(wiscarScores).reduce((a, b) => a + b) / 6 * 0.4)
      );

      let recommendation: "pursue" | "maybe" | "develop";
      if (overallScore >= 80) recommendation = "pursue";
      else if (overallScore >= 65) recommendation = "maybe";
      else recommendation = "develop";

      return {
        psychometricScore,
        technicalScore,
        wiscarScores,
        overallScore,
        recommendation,
        strengths: [
          "Strong analytical thinking",
          "High attention to detail",
          "Excellent user empathy",
          "Adaptability to complex requirements"
        ],
        areasForDevelopment: [
          "Legal domain knowledge",
          "Advanced UX research methods",
          "Regulatory compliance understanding"
        ],
        careerPaths: [
          {
            title: "Legal UX Designer",
            match: 85,
            description: "Design user-friendly interfaces for legal software platforms"
          },
          {
            title: "Compliance UX Analyst",
            match: 78,
            description: "Ensure UX designs meet legal industry regulations"
          },
          {
            title: "Legal Product Manager",
            match: 72,
            description: "Lead product development for legal technology solutions"
          }
        ],
        nextSteps: [
          "Complete a UX fundamentals course",
          "Study legal industry workflows",
          "Build a portfolio with legal domain projects",
          "Network with legal tech professionals"
        ]
      };
    };

    setResults(calculateResults());
  }, [location.state, navigate]);

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Processing your assessment results...</p>
        </div>
      </div>
    );
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "pursue": return "text-success";
      case "maybe": return "text-warning";
      case "develop": return "text-error";
      default: return "text-muted-foreground";
    }
  };

  const getRecommendationText = (rec: string) => {
    switch (rec) {
      case "pursue": return "Highly Recommended";
      case "maybe": return "Conditional Fit";
      case "develop": return "Development Needed";
      default: return "Unknown";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card">
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
              <h1 className="text-xl font-bold text-foreground">Assessment Results</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Overall Score */}
        <Card className="shadow-xl mb-8 bg-gradient-hero text-white">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold">{results.overallScore}</span>
            </div>
            <CardTitle className="text-3xl mb-2">Your Legal UX Fit Score</CardTitle>
            <Badge className={`text-lg px-4 py-2 ${
              results.recommendation === "pursue" 
                ? "bg-success text-success-foreground" 
                : results.recommendation === "maybe"
                  ? "bg-warning text-warning-foreground"
                  : "bg-error text-error-foreground"
            }`}>
              {getRecommendationText(results.recommendation)}
            </Badge>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section Scores */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Assessment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Psychometric Evaluation</span>
                    <span className="font-bold">{results.psychometricScore}%</span>
                  </div>
                  <Progress value={results.psychometricScore} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Personality traits and motivational alignment
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Technical Readiness</span>
                    <span className="font-bold">{results.technicalScore}%</span>
                  </div>
                  <Progress value={results.technicalScore} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Skills and domain knowledge assessment
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-4">WISCAR Framework Scores</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(results.wiscarScores).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm capitalize">{key === "realWorld" ? "Real World" : key}</span>
                          <span className="text-sm font-bold">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Career Paths */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recommended Career Paths
                </CardTitle>
                <CardDescription>
                  Based on your assessment results, here are your best-fit career opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.careerPaths.map((path, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{path.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {path.match}% match
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                      <div className="mt-2">
                        <Progress value={path.match} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Strengths */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Star className="h-5 w-5" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Areas for Development */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="h-5 w-5" />
                  Development Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.areasForDevelopment.map((area, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Users className="h-5 w-5" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold text-primary">{index + 1}</span>
                      </div>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="mt-8 bg-gradient-primary text-white shadow-xl">
          <CardContent className="text-center py-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Legal UX Journey?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Based on your results, you have {results.recommendation === "pursue" ? "excellent" : "good"} potential 
              for a career in Legal UX. Take the next step in your professional development.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Explore Learning Paths
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Retake Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Results;