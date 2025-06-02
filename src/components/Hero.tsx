'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, MessageSquare, ShoppingCart, Brain, Slack, Clock, DollarSign, Users } from 'lucide-react';

const FloatingBubble = ({ children, delay = 0, className = "" }: { 
  children: React.ReactNode; 
  delay?: number; 
  className?: string; 
}) => (
  <motion.div
    className={`absolute bg-white rounded-2xl p-4 shadow-lg border border-gray-100 ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 2, 0],
    }}
    transition={{
      duration: 6,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{ scale: 1.05 }}
  >
    {children}
  </motion.div>
);

const TaskBubble = ({ icon: Icon, text, delay = 0, className = "" }: {
  icon: any;
  text: string;
  delay?: number;
  className?: string;
}) => (
  <FloatingBubble delay={delay} className={className}>
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <span className="text-sm font-medium text-gray-700">{text}</span>
    </div>
  </FloatingBubble>
);

const ValueProp = ({ icon: Icon, text, value }: {
  icon: any;
  text: string;
  value: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-gray-100"
  >
    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <div className="font-semibold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{text}</div>
    </div>
  </motion.div>
);

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse-soft animation-delay-4000"></div>
      </div>

      {/* Floating Task Bubbles */}
      <TaskBubble 
        icon={Calendar} 
        text="Meeting rescheduled 👩‍💼" 
        delay={0}
        className="top-20 left-20 hidden lg:block"
      />
      <TaskBubble 
        icon={ShoppingCart} 
        text="Ordered lunch 🍱" 
        delay={2}
        className="top-40 right-20 hidden lg:block"
      />
      <TaskBubble 
        icon={MessageSquare} 
        text="CEO DMed 💬" 
        delay={4}
        className="bottom-40 left-40 hidden lg:block"
      />
      <TaskBubble 
        icon={Brain} 
        text="Thread summarized 📝" 
        delay={1}
        className="bottom-20 right-40 hidden lg:block"
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Slack Integration Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100"
          >
            <Slack className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Built for Slack</span>
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          </motion.div>

          {/* Main Headlines */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-display font-bold text-gray-900 leading-tight"
            >
              The AI Assistant That{' '}
              <span className="gradient-text">Already Knows You</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Get <span className="font-semibold text-blue-600">40+ hours weekly</span> of executive assistant support for 
              <span className="font-semibold text-green-600"> 90% less cost</span> than human assistants.
              <br />
              Professional and personal life management — all from Slack.
            </motion.p>
          </div>

          {/* Value Props Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-12"
          >
            <ValueProp 
              icon={DollarSign}
              text="vs $36K/year human assistant"
              value="90% savings"
            />
            <ValueProp 
              icon={Clock}
              text="equivalent weekly support"
              value="40+ hours"
            />
            <ValueProp 
              icon={Users}
              text="across work & personal life"
              value="24/7 availability"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-12 py-5 inline-flex items-center space-x-3 group"
              onClick={() => router.push('/waitlist')}
            >
              <span>Get Early Access</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary text-lg px-12 py-5"
              onClick={() => document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See How It Works
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="space-y-2"
          >
            <p className="text-sm text-gray-500">
              Free to join • No commitment • Used by 10,000+ professionals
            </p>
            <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
              <span>✓ GDPR Compliant</span>
              <span>✓ Enterprise Security</span>
              <span>✓ 99.9% Uptime</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 