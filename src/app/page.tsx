import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import UseCases from '@/components/UseCases';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesGrid />
      <UseCases />
      <TestimonialsSection />
    </main>
  );
}
