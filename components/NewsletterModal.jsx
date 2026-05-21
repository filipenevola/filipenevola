'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export function NewsletterModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-palmeiras-darker/80 backdrop-blur-sm" />
      <div
        className="relative bg-palmeiras-dark border border-palmeiras-light rounded-xl p-6 w-full max-w-md shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-palmeiras-muted hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              You're subscribed!
            </h3>
            <p className="text-palmeiras-muted">
              Thanks for subscribing. You'll receive updates on new posts and
              insights.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-white text-palmeiras rounded-lg font-medium hover:bg-palmeiras-muted transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-semibold text-white mb-2">
              Subscribe to my newsletter
            </h3>
            <p className="text-palmeiras-muted mb-6">
              Get notified about new blog posts, insights on software
              development, entrepreneurship, and building products.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-3 bg-palmeiras-darker border border-palmeiras-light rounded-lg text-white placeholder-palmeiras-muted/60 focus:outline-none focus:border-white transition-colors"
              />

              {status === 'error' && (
                <p className="mt-2 text-red-300 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full mt-4 px-6 py-3 bg-white text-palmeiras rounded-lg font-medium hover:bg-palmeiras-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

            <p className="mt-4 text-palmeiras-muted/80 text-xs text-center">
              No spam, unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
