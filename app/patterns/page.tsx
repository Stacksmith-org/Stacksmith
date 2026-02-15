'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Lock, Coins, CheckCircle, AlertCircle, FileCode } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Pattern {
  id: string;
  title: string;
  description: string;
  icon: any;
  code: string;
  explanation: string;
  whenToUse: string;
  mistakes: string[];
}

const patterns: Pattern[] = [
  {
    id: 'simple-payment',
    title: 'Simple Payment',
    description: 'Basic token transfer between accounts',
    icon: Coins,
    code: `(define-public (transfer (amount uint) (recipient principal))
  (begin
    (if (>= amount (var-get balance))
      (begin
        (var-set balance (- (var-get balance) amount))
        (ok (contract-call? .token transfer-amount recipient amount))
      )
      (err u01)
    )
  )
)`,
    explanation: 'This pattern demonstrates a basic token transfer function. It checks if the sender has sufficient balance, then calls an external token contract to perform the transfer.',
    whenToUse: 'Use when you need simple peer-to-peer token transfers without complex logic or escrow.',
    mistakes: [
      'Not checking balance before transfer',
      'Not handling transfer failures from the token contract',
      'Forgetting to update internal state before external calls'
    ]
  },
  {
    id: 'access-control',
    title: 'Access Control',
    description: 'Owner-only function protection',
    icon: Lock,
    code: `(define-data-var contract-owner principal tx-sender)

(define-public (admin-function)
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
    ;; Protected logic here
    (ok true)
  )
)

(define-public (transfer-ownership (new-owner principal))
  (begin
    (asserts! (is-eq tx-sender (var-get contract-owner)) (err u403))
    (var-set contract-owner new-owner)
    (ok true)
  )
)`,
    explanation: 'This pattern implements basic owner-based access control. Only the contract owner can call protected functions, and ownership can be transferred.',
    whenToUse: 'Use when you need to restrict certain functions to specific addresses, like admin operations or configuration changes.',
    mistakes: [
      'Not initializing the owner variable',
      'Using hard equality instead of asserts!',
      'Forgetting to protect the ownership transfer function itself'
    ]
  },
  {
    id: 'token-interaction',
    title: 'Token Interaction',
    description: 'Safely interact with external token contracts',
    icon: Coins,
    code: `(define-public (deposit-tokens (amount uint))
  (begin
    ;; Transfer tokens from user to contract
    (try! (contract-call? .token-contract transfer 
      amount 
      tx-sender 
      (as-contract tx-sender) 
      none))
    
    ;; Update user balance
    (map-set balances 
      tx-sender 
      (+ (default-to u0 (map-get? balances tx-sender)) amount))
    
    (ok amount)
  )
)`,
    explanation: 'This pattern shows how to safely receive tokens from users into your contract. It uses try! to handle potential failures and updates internal accounting.',
    whenToUse: 'Use when your contract needs to custody tokens, like in a staking or escrow scenario.',
    mistakes: [
      'Not using try! to handle transfer failures',
      'Updating balance before successful transfer',
      'Not using as-contract for the contract principal'
    ]
  },
  {
    id: 'event-emission',
    title: 'Event Emission',
    description: 'Log important state changes',
    icon: AlertCircle,
    code: `(define-public (complete-task (task-id uint))
  (let (
    (task (unwrap! (map-get? tasks task-id) (err u404)))
  )
    (asserts! (is-eq (get owner task) tx-sender) (err u403))
    (asserts! (not (get completed task)) (err u409))
    
    ;; Update task status
    (map-set tasks task-id (merge task { completed: true }))
    
    ;; Emit event
    (print {
      event: "task-completed",
      task-id: task-id,
      owner: tx-sender,
      timestamp: block-height
    })
    
    (ok true)
  )
)`,
    explanation: 'This pattern demonstrates proper event logging using print. Events are crucial for off-chain indexing and monitoring.',
    whenToUse: 'Use whenever important state changes occur that external systems need to track.',
    mistakes: [
      'Forgetting to emit events for state changes',
      'Including sensitive data in events',
      'Not using consistent event schemas'
    ]
  },
  {
    id: 'escrow-logic',
    title: 'Basic Escrow',
    description: 'Hold funds pending conditions',
    icon: CheckCircle,
    code: `(define-map escrows 
  uint 
  {
    sender: principal,
    recipient: principal,
    amount: uint,
    released: bool
  }
)

(define-public (create-escrow (recipient principal) (amount uint))
  (let ((escrow-id (var-get next-id)))
    (try! (contract-call? .token transfer amount tx-sender (as-contract tx-sender)))
    (map-set escrows escrow-id {
      sender: tx-sender,
      recipient: recipient,
      amount: amount,
      released: false
    })
    (var-set next-id (+ escrow-id u1))
    (ok escrow-id)
  )
)

(define-public (release-escrow (escrow-id uint))
  (let ((escrow (unwrap! (map-get? escrows escrow-id) (err u404))))
    (asserts! (is-eq tx-sender (get sender escrow)) (err u403))
    (asserts! (not (get released escrow)) (err u409))
    
    (try! (as-contract (contract-call? .token transfer 
      (get amount escrow) 
      tx-sender 
      (get recipient escrow))))
    
    (map-set escrows escrow-id (merge escrow { released: true }))
    (ok true)
  )
)`,
    explanation: 'This pattern implements a simple escrow system where funds are held by the contract until the sender releases them to the recipient.',
    whenToUse: 'Use for trustless transactions that require conditional release of funds.',
    mistakes: [
      'Not preventing double-release',
      'Not verifying sender authority',
      'Missing escrow existence checks'
    ]
  }
];

export default function PatternsPage() {
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  return (
    <div className="min-h-screen grain-overlay">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-float-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-float-slow" style={{ animationDelay: '5s' }} />
      </div>

      {/* Header */}
      <header className="glass-strong border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-purple-400 transition-colors" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <FileCode className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Pattern Library</span>
            </div>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Clarity <span className="text-gradient">Patterns</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Curated examples of common Clarity smart contract patterns with explanations and best practices
          </p>
        </motion.div>

        {/* Patterns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {patterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedPattern(pattern)}
              className="glass p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <pattern.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{pattern.title}</h3>
              <p className="text-sm text-muted-foreground">{pattern.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Pattern Detail */}
        {selectedPattern && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong p-8 rounded-3xl border border-purple-500/30"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <selectedPattern.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedPattern.title}</h2>
                  <p className="text-muted-foreground">{selectedPattern.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
                className="w-8 h-8 rounded-lg glass hover:bg-red-500/20 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            {/* Code Example */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                Code Example
              </h3>
              <div className="bg-black/40 border border-white/10 rounded-xl p-4 overflow-x-auto">
                <pre className="font-mono text-sm text-green-400">
                  {selectedPattern.code}
                </pre>
              </div>
            </div>

            {/* Explanation */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Explanation
              </h3>
              <p className="text-sm leading-relaxed">{selectedPattern.explanation}</p>
            </div>

            {/* When to Use */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                When to Use
              </h3>
              <p className="text-sm leading-relaxed">{selectedPattern.whenToUse}</p>
            </div>

            {/* Common Mistakes */}
            <div>
              <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                Common Mistakes
              </h3>
              <ul className="space-y-2">
                {selectedPattern.mistakes.map((mistake, i) => (
                  <li key={i} className="text-sm leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-red-400">
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
