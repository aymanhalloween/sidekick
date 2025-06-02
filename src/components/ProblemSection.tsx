'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Mail, 
  ShoppingCart, 
  Bell, 
  Clock, 
  Zap,
  AlertTriangle,
  Coffee,
  Smartphone
} from 'lucide-react';

const ChaosItem = ({ 
  icon: Icon, 
  text, 
  delay = 0, 
  className = "",
  color = "text-red-500"
}: {
  icon: any;
  text: string;
  delay?: number;
  className?: string;
  color?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: -10 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        rotate: Math.random() * 20 - 10,
      } : {}}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.1, 
        rotate: 0,
        transition: { duration: 0.2 }
      }}
      className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 ${className}`}
    >
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="text-sm font-medium text-gray-700">{text}</span>
      </div>
      
      {/* Stress indicator */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-2 flex space-x-1"
      >
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-red-400 rounded-full opacity-70" />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const chaosItems = [
    { icon: MessageCircle, text: "47 unread Slack DMs", delay: 0 },
    { icon: Calendar, text: "Back-to-back meetings", delay: 1 },
    { icon: Mail, text: "856 unread emails", delay: 2 },
    { icon: Bell, text: "Constant notifications", delay: 3 },
    { icon: ShoppingCart, text: "Forgot to order lunch again", delay: 4 },
    { icon: Clock, text: "Running 20 minutes late", delay: 5 },
    { icon: Coffee, text: "Coffee meeting with???", delay: 6 },
    { icon: Smartphone, text: "Phone buzzing non-stop", delay: 7 },
    { icon: AlertTriangle, text: "Urgent from 3 hours ago", delay: 8 },
    { icon: Zap, text: "Decision fatigue kicking in", delay: 9 },
  ];

  return (
    <section ref={ref} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background chaos pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-300 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-orange-300 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-10 w-28 h-28 bg-yellow-300 rounded-full blur-2xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
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
            className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6"
          >
            Work doesn't stop.{' '}
            <span className="text-red-500">Neither should your assistant.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            You're drowning in notifications, meetings, and decisions. 
            Every ping pulls you away from what actually matters.
          </motion.p>
        </motion.div>

        {/* Chaos Grid */}
        <div className="relative">
          {/* Desktop Grid Layout */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6 max-w-6xl mx-auto">
              {chaosItems.map((item, index) => (
                <ChaosItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  delay={item.delay}
                  className="h-32"
                  color="text-red-500"
                />
              ))}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chaosItems.slice(0, 6).map((item, index) => (
                <ChaosItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  delay={item.delay}
                  className="h-24"
                  color="text-red-500"
                />
              ))}
            </div>
          </div>

          {/* Stress Level Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-4 bg-red-50 rounded-2xl px-8 py-4 border border-red-100">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      backgroundColor: ["#ef4444", "#dc2626", "#ef4444"]
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                    className="w-3 h-8 bg-red-500 rounded-full"
                  />
                ))}
              </div>
              <span className="text-red-700 font-semibold">Stress Level: MAXED OUT</span>
            </div>
          </motion.div>
        </div>

        {/* Transition to Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-2xl text-gray-700 font-semibold">
            What if there was a better way?
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            className="mt-8"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 