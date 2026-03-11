import CircularDiagram from "@/components/CircularDiagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RESEARCH_AREAS = [
  { title: "Advanced Materials", desc: "Biomaterials, development, modelling, and characterisation of next-generation materials." },
  { title: "Additive Manufacturing", desc: "3D printing, medtronics, aerospace applications, and machine-learning-driven design." },
  { title: "Sustainable Energy", desc: "Environmental technologies, renewable energy systems, and green innovation." },
];

const Index = () => {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "#FFFFFF" }}>
        <h1 className="sr-only">MTech Invite — Academic Research Innovation Ecosystem</h1>
        <CircularDiagram />
        <p className="text-center text-sm tracking-widest uppercase mt-2 mb-10" style={{ color: "#888888", fontWeight: 300 }}>
          Innovation · Research · Entrepreneurship
        </p>
      </section>

      {/* About */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">About the Program</h2>
        <p className="text-muted-foreground leading-relaxed max-w-3xl">
          MTech Invite is a pioneering postgraduate programme that bridges deep-tech research with entrepreneurial thinking.
          Students collaborate with world-class faculty across materials science, additive manufacturing, and sustainable energy
          to transform laboratory breakthroughs into real-world solutions. The programme nurtures a culture of innovation,
          interdisciplinary collaboration, and industry-ready skills.
        </p>
        <Button className="mt-8 rounded-[6px]">Learn More</Button>
      </section>

      {/* Research Areas */}
      <section className="py-20 px-6 md:px-16" style={{ backgroundColor: "#f5f3f1" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-foreground">Research Areas</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {RESEARCH_AREAS.map((area) => (
              <Card key={area.title} className="border-border hover:shadow-md transition-shadow duration-250">
                <CardHeader>
                  <CardTitle className="text-lg">{area.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{area.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Network */}
      <section className="py-20 px-6 md:px-16 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-foreground">Faculty Network</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }, (_, i) => {
            const letter = String.fromCharCode(65 + i);
            return (
              <div
                key={letter}
                className="flex flex-col items-center p-4 rounded-lg border border-border hover:border-primary transition-colors duration-250"
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold mb-2"
                  style={{ backgroundColor: "#000000" }}
                >
                  {letter}
                </div>
                <p className="text-sm font-medium text-foreground">Professor {letter}</p>
                <p className="text-xs text-muted-foreground text-center mt-1">Research Faculty</p>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Button className="rounded-[6px]">View All Faculty</Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
