'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  Calendar, 
  MessageSquare,
  Heart,
  ShoppingCart,
  Brain
} from 'lucide-react';

const UseCaseCard = ({ 
  icon: Icon, 
  quote, 
  scenario, 
  outcome, 
  delay = 0,
  category = ""
}: {
  icon: any;
  quote: string;
  scenario: string;
  outcome: string;
  delay?: number;
  category?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'work': return 'from-blue-500 to-blue-600';
      case 'personal': return 'from-green-500 to-green-600';
      case 'health': return 'from-pink-500 to-pink-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative"
    >
      {/* Category Badge */}
      {category && (
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}>
            {category}
          </span>
        </div>
      )}

      {/* Quote Icon */}
      <div className="flex justify-between items-start mb-6">
        <Quote className="w-8 h-8 text-blue-400 opacity-50" />
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(category)} rounded-xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Main Quote */}
      <blockquote className="text-2xl font-display font-semibold text-gray-900 mb-6 leading-tight">
        "{quote}"
      </blockquote>

      {/* Scenario */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Scenario</p>
          <p className="text-gray-700">{scenario}</p>
        </div>

        {/* Outcome */}
        <div className="bg-green-50 rounded-2xl p-4">
          <p className="text-sm font-medium text-green-600 uppercase tracking-wide mb-2">Result</p>
          <p className="text-green-800 font-medium">{outcome}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const useCases = [
    {
      icon: Coffee,
      quote: "Told Slackbot: 'Order the usual lunch' — done in 2 mins.",
      scenario: "It's 12:30 PM and you're in back-to-back meetings. You're starving but can't step away to order food.",
      outcome: "Your assistant remembers your go-to order from your favorite spot, places it automatically, and even updates your calendar with the delivery ETA.",
      category: "work"
    },
    {
      icon: MessageSquare,
      quote: "CEO DMed me. Got alerted instantly.",
      scenario: "Your CEO sends a Slack DM about an urgent client issue while you're heads-down in a design review.",
      outcome: "Your assistant immediately recognizes the importance, sends you a priority notification, and even drafts a quick context summary.",
      category: "work"
    },
    {
      icon: Calendar,
      quote: "Rescheduled 3 meetings without me lifting a finger.",
      scenario: "A client emergency means you need to clear your afternoon, but you have three important meetings scheduled.",
      outcome: "Your assistant automatically finds alternative times, coordinates with all attendees, and reschedules everything while you handle the emergency.",
      category: "work"
    },
    {
      icon: Heart,
      quote: "Annual physical scheduled and health records organized.",
      scenario: "Your doctor's office called about scheduling your annual check-up, and you realize your health records are scattered across different providers.",
      outcome: "Your assistant coordinates the appointment during your preferred time, compiles all health records from different providers, and creates a comprehensive health folder.",
      category: "health"
    },
    {
      icon: ShoppingCart,
      quote: "Weekly groceries delivered with my dietary restrictions in mind.",
      scenario: "You're trying to maintain a specific diet, but grocery shopping takes forever and you keep forgetting to buy essentials.",
      outcome: "Your assistant creates weekly meal plans based on your dietary needs, automatically orders groceries for delivery, and tracks your nutritional goals.",
      category: "personal"
    },
    {
      icon: Brain,
      quote: "Client presentation prepped with all historical context before I asked.",
      scenario: "Important client meeting in 2 hours, but you need to catch up on 6 months of previous interactions and project history.",
      outcome: "Your assistant compiles all email threads, meeting notes, project updates, and creates a comprehensive brief with key talking points and potential discussion topics.",
      category: "work"
    }
  ];

  const nextCase = () => {
    setCurrentIndex((prev) => (prev + 1) % useCases.length);
  };

  const prevCase = () => {
    setCurrentIndex((prev) => (prev - 1 + useCases.length) % useCases.length);
  };

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-40 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Real Stories from{' '}
            <span className="text-purple-600">Actual Users</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            See how AI assistance transforms both work and personal life.
          </motion.p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <UseCaseCard
              key={index}
              icon={useCase.icon}
              quote={useCase.quote}
              scenario={useCase.scenario}
              outcome={useCase.outcome}
              category={useCase.category}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden mb-16">
          <div className="relative">
            <UseCaseCard
              icon={useCases[currentIndex].icon}
              quote={useCases[currentIndex].quote}
              scenario={useCases[currentIndex].scenario}
              outcome={useCases[currentIndex].outcome}
              category={useCases[currentIndex].category}
              delay={0}
            />

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevCase}
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </motion.button>

              {/* Dots */}
              <div className="flex space-x-2">
                {useCases.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextCase}
                className="w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Simplified Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {[
            { number: "25+", label: "Hours saved weekly", description: "Based on actual user data" },
            { number: "95%", label: "Task completion rate", description: "First-time execution success" },
            { number: "3x", label: "Productivity increase", description: "Measured across work & personal" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              className="text-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6"
            >
              <div className="text-4xl font-display font-bold text-gray-900 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center"
        >
          <p className="text-2xl text-gray-700 font-semibold mb-8">
            Ready to transform how you work and live?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-12 py-5 inline-flex items-center space-x-3"
            onClick={() => router.push('/waitlist')}
          >
            <span>Join the Waitlist</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 