'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Quote, 
  Star,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';

const TestimonialCard = ({ 
  quote, 
  author, 
  title, 
  company, 
  metrics, 
  delay = 0 
}: {
  quote: string;
  author: string;
  title: string;
  company: string;
  metrics?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 group relative"
    >
      {/* Quote Icon */}
      <div className="flex items-start mb-6">
        <Quote className="w-8 h-8 text-blue-400 opacity-50 flex-shrink-0" />
        <div className="ml-4 flex-1">
          {/* Star Rating */}
          <div className="flex space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          
          {/* Quote */}
          <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed italic">
            "{quote}"
          </blockquote>
        </div>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="bg-blue-50 rounded-2xl p-4 mb-6 border border-blue-100">
          <div className="text-sm font-medium text-blue-600 uppercase tracking-wide mb-1">Impact</div>
          <div className="text-blue-800 font-semibold">{metrics}</div>
        </div>
      )}

      {/* Author Info */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-lg">
            {author.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-sm text-gray-600">{title}</div>
          <div className="text-sm text-blue-600 font-medium">{company}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const router = useRouter();

  const testimonials = [
    {
      quote: "I've scaled my productivity by 400% since getting my AI assistant. It handles everything from my calendar to family planning, and I've gained back 25 hours per week to focus on growing my company.",
      author: "Sarah Chen",
      title: "CEO & Founder",
      company: "TechFlow Dynamics",
      metrics: "25 hours/week saved • 400% productivity increase"
    },
    {
      quote: "As a busy parent and executive, this AI assistant has been life-changing. It manages my kids' schedules, coordinates with my spouse, handles our household tasks, and keeps my work life organized. It's like having a family COO.",
      author: "Marcus Thompson",
      title: "VP of Engineering",
      company: "CloudScale Inc",
      metrics: "90% reduction in family logistics stress"
    },
    {
      quote: "The ROI is incredible. We were spending $36K annually on human assistants for our executives. Now, for a fraction of the cost, every team member has access to executive-level support.",
      author: "Jennifer Rodriguez",
      title: "Chief Operating Officer",
      company: "GrowthCorp Ventures",
      metrics: "$180K annual savings across 5 executives"
    },
    {
      quote: "What impressed me most is how it learns. After 3 months, it anticipates my needs before I even voice them. It's not just executing tasks - it's thinking ahead and solving problems proactively.",
      author: "Robert Chang",
      title: "Founder",
      company: "NextGen Robotics",
      metrics: "85% of tasks now handled proactively"
    }
  ];

  const metrics = [
    {
      icon: Users,
      number: "10,000+",
      label: "Active Users"
    },
    {
      icon: TrendingUp,
      number: "340%",
      label: "Average ROI"
    },
    {
      icon: Award,
      number: "99.2%",
      label: "Satisfaction Rate"
    }
  ];

  return (
    <section ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
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
            Trusted by <span className="gradient-text">Industry Leaders</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From Fortune 500 executives to busy parents, see how AI assistance is transforming lives.
          </motion.p>
        </motion.div>

        {/* Simplified Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="text-center bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <metric.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl font-display font-bold text-gray-900 mb-2">
                {metric.number}
              </div>
              <div className="text-sm font-semibold text-gray-700">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
              company={testimonial.company}
              metrics={testimonial.metrics}
              delay={1 + index * 0.1}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Join Thousands of Satisfied Users
            </h3>
            
            <p className="text-lg text-gray-600 mb-6">
              Stop managing your life manually. Start living with AI assistance.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-10 py-4 inline-flex items-center space-x-3"
              onClick={() => router.push('/waitlist')}
            >
              <span>Get Started</span>
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