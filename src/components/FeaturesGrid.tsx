'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Bell, 
  ShoppingCart, 
  MessageSquare, 
  Brain,
  Heart,
  Target,
  Sparkles
} from 'lucide-react';

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  examples = [],
  category = ""
}: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
  examples?: string[];
  category?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'work': return 'from-blue-500 to-blue-600';
      case 'personal': return 'from-green-500 to-green-600';
      default: return 'from-blue-500 to-purple-600';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3 } 
      }}
      className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-300"
    >
      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(category)} rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-lg transition-shadow duration-300`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>

      {/* Content */}
      <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-blue-900 transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>

      {/* Examples */}
      {examples.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Examples:</p>
          <div className="space-y-2">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: delay + 0.2 + index * 0.1, duration: 0.4 }}
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>{example}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default function FeaturesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Calendar management with intelligent conflict resolution, meeting preparation, and travel coordination.",
      category: "work",
      examples: [
        "Cross-timezone meeting coordination",
        "Automated calendar blocking",
        "Meeting prep with briefings"
      ]
    },
    {
      icon: Bell,
      title: "Priority Filtering", 
      description: "AI-powered priority detection that learns your communication patterns and relationship importance.",
      category: "work",
      examples: [
        "VIP contact auto-escalation",
        "Context-aware notifications",
        "Daily digest summaries"
      ]
    },
    {
      icon: Heart,
      title: "Life Management",
      description: "Health, family, and household management including appointments, maintenance, and logistics.",
      category: "personal",
      examples: [
        "Doctor appointment scheduling",
        "Family activity coordination", 
        "Home maintenance tracking"
      ]
    },
    {
      icon: ShoppingCart,
      title: "Smart Procurement",
      description: "End-to-end purchasing from groceries to gifts, with preference learning and automatic reordering.",
      category: "personal",
      examples: [
        "Weekly grocery automation",
        "Gift sourcing for occasions",
        "Restaurant reservations"
      ]
    },
    {
      icon: MessageSquare,
      title: "Slack-Native",
      description: "Everything happens right in Slack. No context switching, no separate apps to manage.",
      category: "work",
      examples: [
        "DM commands and responses", 
        "Channel thread summaries",
        "Inline task management"
      ]
    },
    {
      icon: Brain,
      title: "Continuous Learning",
      description: "Builds a comprehensive model of your preferences and patterns, getting smarter over time.",
      category: "work",
      examples: [
        "Preference pattern recognition",
        "Relationship mapping",
        "Proactive task suggestions"
      ]
    }
  ];

  return (
    <section ref={ref} id="features" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ROI Comparison - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100 max-w-5xl mx-auto mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 text-center mb-8">
            The Numbers Don't Lie
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 text-center mb-8">
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-red-500">$36,000</div>
              <div className="text-lg font-semibold text-gray-700">Human Assistant</div>
              <div className="text-sm text-gray-500">Annual cost for basic coverage</div>
            </div>
            
            <div className="flex items-center justify-center">
              <div className="text-3xl font-bold text-blue-600">VS</div>
            </div>
            
            <div className="space-y-4">
              <div className="text-5xl font-display font-bold text-green-500">$3,600</div>
              <div className="text-lg font-semibold text-gray-700">AI Assistant</div>
              <div className="text-sm text-gray-500">Annual cost for comprehensive coverage</div>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-2xl border border-green-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-800 mb-2">90% Cost Savings</div>
              <div className="text-green-700">Plus 24/7 availability, no sick days, and continuous learning</div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Core Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6"
          >
            Everything You Need in <span className="gradient-text">One Assistant</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Six core capabilities that handle your work and personal life, all through Slack.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              examples={feature.examples}
              category={feature.category}
              delay={0.9 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Target className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-display font-bold text-gray-900">
                Ready to Get Started?
              </h3>
            </div>
            
            <p className="text-lg text-gray-600 mb-6">
              Join thousands of professionals who've upgraded to AI assistance.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
              onClick={() => router.push('/waitlist')}
            >
              <span>Join the Waitlist</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 