'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, AlertCircle, Wrench, BookOpen, Upload, Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

type QueryType = 'code' | 'error' | 'tool' | 'pattern' | null;

interface AnalysisResult {
  summary: string;
  whoCanCall?: string;
  stateChanges?: string;
  behaviors?: string[];
  mistakes?: string[];
  nextStep?: string;
  explanation?: string;
  why?: string;
  howToFix?: string;
}

export default function AppPage() {
  const [queryType, setQueryType] = useState<QueryType>(null);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!input && !imagePreview) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on query type
    if (queryType === 'code') {
      setResult({
        summary: 'This function allows a user to transfer a specified amount of tokens to a recipient.',
        whoCanCall: 'Any user can call this function.',
        stateChanges: 'Reduces the sender\'s balance by the transfer amount.',
        behaviors: [
          'Checks if the sender has enough balance before transferring',
          'Calls an external token contract to perform the transfer'
        ],
        mistakes: [
          'Forgetting to check balance before transfer',
          'Not handling possible transfer failures'
        ],
        nextStep: 'Ensure the token contract handles transfers securely'
      });
    } else if (queryType === 'error') {
      setResult({
        summary: 'This error occurs when trying to call a function that doesn\'t exist in the contract.',
        why: 'The function name might be misspelled, or the contract hasn\'t been deployed yet.',
        howToFix: 'Double-check the function name matches exactly what\'s in your contract. If deploying, ensure the contract is deployed before calling.',
        nextStep: 'Use Clarinet to verify your contract compiles and the function exists'
      });
    } else {
      setResult({
        summary: 'Clarinet is the local development environment for Clarity smart contracts.',
        explanation: 'Use Clarinet when you want to write, test, and debug contracts locally before deployment.',
        behaviors: [
          'Provides a REPL for interactive testing',
          'Runs unit tests against your contracts',
          'Simulates blockchain state locally'
        ],
        nextStep: 'Install Clarinet and run `clarinet new` to create a new project'
      });
    }
    
    setIsAnalyzing(false);
  };

  const queryTypes = [
    { id: 'code' as const, label: 'Explain Code', icon: Code2, color: 'cyan' },
    { id: 'error' as const, label: 'Explain Error', icon: AlertCircle, color: 'red' },
    { id: 'tool' as const, label: 'Tool Guidance', icon: Wrench, color: 'blue' },
    { id: 'pattern' as const, label: 'Patterns', icon: BookOpen, color: 'purple' },
  ];

  return (
    <div className="min-h-screen grain-overlay">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-float-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-float-slow" style={{ animationDelay: '5s' }} />
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
              <span className="text-xl font-bold tracking-tight">stacksmith</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Query Type Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {queryTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQueryType(type.id);
                  setResult(null);
                }}
                className={`p-4 rounded-xl border transition-all ${
                  queryType === type.id
                    ? 'glass-strong border-cyan-500/50 glow'
                    : 'glass border-white/10 hover:border-white/20'
                }`}
              >
                <type.icon className={`w-6 h-6 mx-auto mb-2 ${
                  queryType === type.id ? 'text-cyan-400' : 'text-muted-foreground'
                }`} />
                <span className={`text-sm font-medium ${
                  queryType === type.id ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {type.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Input & Result Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Input Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass p-6 rounded-2xl border border-white/10">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                {queryType ? `${queryTypes.find(t => t.id === queryType)?.label}` : 'Ask stacksmith'}
              </h3>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  queryType === 'code' ? 'Paste your Clarity code here...' :
                  queryType === 'error' ? 'Paste your error message here...' :
                  queryType === 'tool' ? 'Ask about Clarinet, Stacks.js, or other tools...' :
                  'Type your question or paste code/errors...'
                }
                className="w-full h-64 bg-black/30 border border-white/10 rounded-xl p-4 font-mono text-sm resize-none focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-muted-foreground"
              />

              {/* Image Upload */}
              <div className="mt-4 flex items-center gap-3">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg border border-white/10 hover:border-white/20 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="text-sm">Upload Image</span>
                  </div>
                </label>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || (!input && !imagePreview)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Analyze
                    </>
                  )}
                </motion.button>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 relative"
                >
                  <img
                    src={imagePreview}
                    alt="Uploaded preview"
                    className="w-full h-40 object-cover rounded-lg border border-white/10"
                  />
                  <button
                    onClick={() => setImagePreview(null)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Result Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass p-6 rounded-2xl border border-white/10 min-h-[500px]"
          >
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              Analysis Result
            </h3>

            <AnimatePresence mode="wait">
              {isAnalyzing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-96 gap-4"
                >
                  <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
                  <p className="text-muted-foreground">Analyzing your request...</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Summary */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      Summary
                    </h4>
                    <p className="text-sm leading-relaxed">{result.summary}</p>
                  </div>

                  {/* Who Can Call */}
                  {result.whoCanCall && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Who Can Call It
                      </h4>
                      <p className="text-sm leading-relaxed">{result.whoCanCall}</p>
                    </div>
                  )}

                  {/* State Changes */}
                  {result.stateChanges && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        State Changes
                      </h4>
                      <p className="text-sm leading-relaxed">{result.stateChanges}</p>
                    </div>
                  )}

                  {/* Important Behaviors */}
                  {result.behaviors && result.behaviors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        Important Behaviors
                      </h4>
                      <ul className="space-y-1">
                        {result.behaviors.map((behavior, i) => (
                          <li key={i} className="text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-green-400">
                            {behavior}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Common Mistakes */}
                  {result.mistakes && result.mistakes.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-red-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        Common Mistakes
                      </h4>
                      <ul className="space-y-1">
                        {result.mistakes.map((mistake, i) => (
                          <li key={i} className="text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-400">
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Explanation */}
                  {result.explanation && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-blue-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        Explanation
                      </h4>
                      <p className="text-sm leading-relaxed">{result.explanation}</p>
                    </div>
                  )}

                  {/* Why */}
                  {result.why && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                        Why This Happens
                      </h4>
                      <p className="text-sm leading-relaxed">{result.why}</p>
                    </div>
                  )}

                  {/* How to Fix */}
                  {result.howToFix && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        How to Fix
                      </h4>
                      <p className="text-sm leading-relaxed">{result.howToFix}</p>
                    </div>
                  )}

                  {/* Suggested Next Step */}
                  {result.nextStep && (
                    <div className="space-y-2 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                      <h4 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        Suggested Next Step
                      </h4>
                      <p className="text-sm leading-relaxed">{result.nextStep}</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-96 gap-4 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium mb-2">Ready to help</p>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      {queryType 
                        ? 'Enter your code, error, or question and click Analyze'
                        : 'Select a query type above to get started'}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
