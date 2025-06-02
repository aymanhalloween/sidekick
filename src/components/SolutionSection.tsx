'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  Check, 
  Calendar, 
  MessageSquare, 
  ShoppingCart, 
  Brain,
  User,
  Bot
} from 'lucide-react';

const SlackMessage = ({ 
  isBot = false, 
  message, 
  delay = 0, 
  icon: Icon 
}: {
  isBot?: boolean;
  message: string;
  delay?: number;
  icon?: any;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex items-start space-x-3 ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
        isBot ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-blue-600" />
        ) : (
          <User className="w-5 h-5 text-gray-600" />
        )}
      </div>
      
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className={`max-w-sm px-4 py-3 rounded-2xl ${
          isBot 
            ? 'bg-blue-50 text-blue-900 border border-blue-100' 
            : 'bg-white text-gray-900 border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-2 mb-1">
          {Icon && <Icon className="w-4 h-4" />}
          <span className="text-sm font-medium">
            {isBot ? 'Second AI' : 'You'}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{message}</p>
      </motion.div>
    </motion.div>
  );
};

const ConversationDemo = () => {
  const conversations = [
    { isBot: false, message: "Can you reschedule my 3pm with Sarah to tomorrow?", delay: 0 },
    { isBot: true, message: "Done! Moved your meeting with Sarah from today 3pm to tomorrow 3pm. I sent her a note explaining the change.", delay: 1.5, icon: Calendar },
    { isBot: false, message: "Order my usual lunch", delay: 3 },
    { isBot: true, message: "Ordered your usual: Mediterranean bowl from Sweetgreen. ETA 25 minutes. Charged to your company card ending in 4728.", delay: 4.5, icon: ShoppingCart },
    { isBot: true, message: "BTW - Your CEO just DM'd you about the Q4 roadmap meeting. Marked as high priority.", delay: 6, icon: MessageSquare },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 max-w-lg mx-auto">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="font-semibold text-gray-700">Second AI</span>
        <span className="text-sm text-gray-500">Active now</span>
      </div>
      
      <div className="space-y-4 h-96 overflow-y-auto">
        {conversations.map((conv, index) => (
          <SlackMessage
            key={index}
            isBot={conv.isBot}
            message={conv.message}
            delay={conv.delay}
            icon={conv.icon}
          />
        ))}
      </div>
    </div>
  );
};

const FeatureHighlight = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0 
}: {
  icon: any;
  title: string;
  description: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6"
          >
            An assistant that{' '}
            <span className="gradient-text">listens, learns, and acts</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Like a Chief of Staff who's been working with you for years. 
            It understands your patterns, preferences, and priorities.
          </motion.p>
        </motion.div>

        {/* Main Demo Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Conversation Demo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <ConversationDemo />
          </motion.div>

          {/* Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Your mental load, handled
            </h3>
            
            {[
              "Remembers how you like things done",
              "Proactively handles routine tasks",
              "Only interrupts when it really matters",
              "Gets smarter with every interaction",
              "Works entirely within Slack"
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-4"
              >
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-lg text-gray-700">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-12"
        >
          <FeatureHighlight
            icon={Brain}
            title="Learns Your Style"
            description="Adapts to your communication preferences and work patterns"
            delay={0.2}
          />
          <FeatureHighlight
            icon={MessageSquare}
            title="Contextual Intelligence"
            description="Understands urgency, relationships, and priorities"
            delay={0.4}
          />
          <FeatureHighlight
            icon={Calendar}
            title="Proactive Actions"
            description="Handles tasks before you even think to ask"
            delay={0.6}
          />
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-2xl text-gray-700 font-semibold mb-8">
            Ready to work with less chaos, more clarity?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-12 py-5"
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Early Access
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 