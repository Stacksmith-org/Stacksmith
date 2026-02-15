'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Code2, AlertCircle, Wrench, BookOpen, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen grain-overlay">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-float-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-float-slow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Header */}
      <header className="glass-strong border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">About stacksmith</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {/* What is stacksmith */}
          <section>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              What is <span className="text-gradient">stacksmith</span>?
            </h1>
            <div className="glass p-8 rounded-2xl border border-white/10 space-y-4">
              <p className="text-lg leading-relaxed">
                stacksmith is an <strong>AI-assisted developer tool</strong> designed to help developers understand 
                and build on Stacks faster by turning Clarity code, errors, documentation, tooling, and patterns 
                into clear, structured explanations.
              </p>
              <p className="text-muted-foreground">
                Think of it as your intelligent companion that helps you navigate the Stacks ecosystem, 
                whether you're debugging a tricky error or learning about best practices.
              </p>
            </div>
          </section>

          {/* Who it's for */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Who is it for?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'New Stacks developers',
                'Developers migrating from Ethereum/Rust',
                'Hackathon builders',
                'Students and solo engineers'
              ].map((audience, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-xl border border-white/10 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{audience}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What it does */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What does it do?</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Code2,
                  title: 'Explains Clarity Code',
                  description: 'Paste or upload code and get clear explanations of what it does, who can call it, state changes, and potential security issues.'
                },
                {
                  icon: AlertCircle,
                  title: 'Translates Errors',
                  description: 'Turn confusing Clarinet or deployment errors into plain English with actionable fixes.'
                },
                {
                  icon: Wrench,
                  title: 'Guides Tooling Usage',
                  description: 'Learn when and how to use Clarinet, Stacks.js, Clarity Playground, and other ecosystem tools.'
                },
                {
                  icon: BookOpen,
                  title: 'Provides Pattern Examples',
                  description: 'Access curated examples of common Clarity patterns like payments, access control, and escrow logic.'
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-xl border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* What it's NOT */}
          <section>
            <h2 className="text-3xl font-bold mb-6">What it's <span className="text-red-400">NOT</span></h2>
            <div className="glass p-8 rounded-2xl border border-red-500/30 space-y-4">
              {[
                'An autonomous coding agent that writes code for you',
                'A full IDE or development environment',
                'A blockchain protocol or wallet',
                'A replacement for official documentation',
                'A security auditing tool (it provides guidance, not guarantees)'
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How it works */}
          <section>
            <h2 className="text-3xl font-bold mb-6">How does it work?</h2>
            <div className="glass p-8 rounded-2xl border border-white/10 space-y-4">
              <p className="leading-relaxed">
                stacksmith uses AI to understand your input (code, errors, or questions) and provides 
                structured, context-aware responses based on:
              </p>
              <ul className="space-y-2 ml-6">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Official Stacks documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Clarity language specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Tooling documentation (Clarinet, Stacks.js, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">•</span>
                  <span>Community best practices and patterns</span>
                </li>
              </ul>
              <p className="text-muted-foreground text-sm mt-4">
                For complex requests like large codebase analysis or deep debugging, 
                stacksmith uses a pay-per-use model via x402 with USDCx payments.
              </p>
            </div>
          </section>

          {/* Learn More */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Learn More</h2>
            <div className="glass p-8 rounded-2xl border border-white/10">
              <p className="mb-6">
                For comprehensive Stacks documentation and resources, visit:
              </p>
              <a 
                href="https://docs.stacks.co" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:glow transition-all"
              >
                Official Stacks Documentation
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong p-12 rounded-3xl border border-cyan-500/30 text-center glow"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to start building?</h2>
            <p className="text-muted-foreground mb-8">
              Get AI-powered help with your Clarity code right now
            </p>
            <Link href="/app">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-lg"
              >
                Open stacksmith
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
