import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Brain, Users, Zap, ArrowRight, Clock, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">Legal UX Assessment</h1>
            </div>
            <Badge variant="secondary" className="font-medium">
              Professional Assessment
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge className="mb-6 bg-gradient-primary text-white border-0">
            Comprehensive Career Assessment
          </Badge>
          
          <h1 className="text-5xl font-bold text-neutral-dark mb-6 leading-tight">
            Comprehensive Career Readiness & Skill Fit Assessment for{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Legal UX Specialist
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover if you're ready for a career in Legal UX through our scientifically-backed assessment. 
            Evaluate your psychometric fit, technical readiness, and career alignment with personalized insights.
          </p>

          <div className="flex items-center justify-center gap-6 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>20-30 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              <span>Scientifically validated</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Personalized results</span>
            </div>
          </div>

          <Button 
            onClick={handleStartAssessment}
            size="lg"
            className="bg-gradient-primary hover:shadow-primary text-lg px-8 py-6 transition-all duration-300"
          >
            Start Assessment <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">What You'll Discover</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive assessment evaluates multiple dimensions of your readiness for a Legal UX Specialist career
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg hover:shadow-primary transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Psychometric Evaluation</CardTitle>
                <CardDescription>
                  Assess personality traits, cognitive styles, and motivational alignment with Legal UX roles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Big 5 Personality Assessment
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Holland Career Codes
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Motivation & Grit Analysis
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-primary transition-all duration-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-secondary flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Technical Readiness</CardTitle>
                <CardDescription>
                  Evaluate your current skills and aptitude for Legal UX specialist requirements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    UX Design Fundamentals
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Legal Domain Knowledge
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Analytical Reasoning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-primary transition-all duration-300 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>WISCAR Framework</CardTitle>
                <CardDescription>
                  Comprehensive skill mapping across Will, Interest, Skill, Cognitive ability, Ability to learn, and Real-world alignment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Personalized Skill Gap Analysis
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Career Path Recommendations
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Learning Roadmap
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal UX Role Overview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-dark mb-4">About Legal UX Specialist Role</h2>
            <p className="text-muted-foreground">
              Understanding what makes a successful Legal UX professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Core Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">User Research & Analysis</h4>
                  <p className="text-sm text-muted-foreground">Conduct research on legal professionals' workflows and pain points</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Design & Prototyping</h4>
                  <p className="text-sm text-muted-foreground">Create user-friendly interfaces for legal software and platforms</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Compliance Integration</h4>
                  <p className="text-sm text-muted-foreground">Ensure designs meet legal industry regulations and standards</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Career Pathways</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Legal UX Designer</h4>
                  <p className="text-sm text-muted-foreground">Focus on designing user-friendly legal software</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Compliance UX Analyst</h4>
                  <p className="text-sm text-muted-foreground">Ensure design compliance with legal standards</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Legal Product Manager</h4>
                  <p className="text-sm text-muted-foreground">Lead product development for legal tech solutions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Your Legal UX Potential?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Take our comprehensive assessment and receive personalized insights about your career readiness and fit for Legal UX roles.
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6 shadow-xl"
          >
            Start Your Assessment Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Legal UX Assessment Platform. Scientifically validated career assessment tools.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;