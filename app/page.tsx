'use client';

import { motion } from 'framer-motion';
import { Sparkles, Code2, AlertCircle, Wrench, BookOpen, ArrowRight, Zap, Shield, Boxes } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden grain-overlay">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-float-slow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px] animate-pulse-slow" />
      </div>

      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">stacksmith</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/patterns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Patterns
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 mb-6">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-cyan-400 font-medium">AI-Powered Developer Companion</span>
                </div>
                
                <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                  Meet{' '}
                  <span className="text-gradient inline-block">
                    stacksmith
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                  Get clear, AI-powered help with Clarity code, errors, tooling, and patterns. 
                  Your intelligent companion for building on Stacks.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/app">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(34, 211, 238, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg flex items-center gap-2 glow transition-all"
                  >
                    Open stacksmith
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 glass-strong rounded-xl font-semibold text-lg border border-white/20 hover:border-white/30 transition-all"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { label: 'Code Explainer', icon: Code2 },
                  { label: 'Error Helper', icon: AlertCircle },
                  { label: 'Tool Guide', icon: Wrench },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square">
                {/* Orbiting elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 glass-strong rounded-2xl flex items-center justify-center glow">
                    <Code2 className="w-8 h-8 text-cyan-400" />
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 glass-strong rounded-2xl flex items-center justify-center glow">
                    <Shield className="w-8 h-8 text-purple-400" />
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 glass-strong rounded-2xl flex items-center justify-center glow">
                    <Boxes className="w-8 h-8 text-blue-400" />
                  </div>
                </motion.div>

                {/* Center piece */}
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-3xl glass-strong border-2 border-cyan-500/30 flex items-center justify-center glow-strong"
                >
                  <Sparkles className="w-20 h-20 text-cyan-400" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Everything you need to build on Stacks</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI assistance to help you understand Clarity code, debug errors, and learn best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Code2,
                title: 'Code Explainer',
                description: 'Paste or upload Clarity code and get clear, structured explanations',
                color: 'cyan'
              },
              {
                icon: AlertCircle,
                title: 'Error Translator',
                description: 'Turn confusing error messages into actionable fixes',
                color: 'red'
              },
              {
                icon: Wrench,
                title: 'Tool Guidance',
                description: 'Learn when and how to use Clarinet, Stacks.js, and more',
                color: 'blue'
              },
              {
                icon: BookOpen,
                title: 'Pattern Library',
                description: 'Access curated examples of common Clarity patterns',
                color: 'purple'
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="glass p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-${feature.color}-500/20 border border-${feature.color}-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center glass-strong p-12 rounded-3xl border border-cyan-500/30 glow"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to build on Stacks?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start getting AI-powered help with your Clarity code right now. No signup required.
          </p>
          <Link href="/app">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg flex items-center gap-2 mx-auto glow-strong"
            >
              Open stacksmith
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>Built for the Stacks developer community</p>
        </div>
      </footer>
    </main>
  );
}
