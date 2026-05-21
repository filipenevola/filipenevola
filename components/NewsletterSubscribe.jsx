'use client';

import { useState } from 'react';
import { NewsletterModal } from './NewsletterModal';

export function NewsletterLink({ children, className }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={className || 'underline text-white hover:text-palmeiras-muted transition-colors cursor-pointer'}
      >
        {children || 'Subscribe'}
      </button>
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export function NewsletterCTA({ variant = 'default' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (variant === 'post-footer') {
    return (
      <>
        <div className="mt-12 pt-8 border-t border-palmeiras-light">
          <div className="text-center">
            <p className="text-palmeiras-muted mb-4">
              Did you enjoy this post? Get more like this delivered to your inbox.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-palmeiras rounded-lg font-medium hover:bg-palmeiras-muted transition-colors cursor-pointer"
            >
              Subscribe to newsletter
            </button>
          </div>
        </div>
        <NewsletterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (variant === 'inline') {
    return (
      <>
        <span className="text-palmeiras-muted">
          {' · '}
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-palmeiras-muted transition-colors underline cursor-pointer"
          >
            (subscribe)
          </button>
        </span>
        <NewsletterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  if (variant === 'inline-standalone') {
    return (
      <>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white hover:text-palmeiras-muted transition-colors underline cursor-pointer"
        >
          Get updates via newsletter
        </button>
        <NewsletterModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-palmeiras-muted hover:text-white transition-colors underline cursor-pointer"
      >
        Subscribe
      </button>
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
