'use client';

import { useEffect, useState } from 'react';
import { NewsletterModal } from './NewsletterModal';

function shouldOpenNewsletterModal() {
  const params = new URLSearchParams(window.location.search);
  const disabledValues = new Set(['0', 'false', 'no', 'off']);
  const newsletterValue = (params.get('newsletter') || '').toLowerCase();
  const modalValue = (params.get('modal') || '').toLowerCase();
  const subscribeValue = (params.get('subscribe') || '').toLowerCase();
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();

  return (
    (params.has('newsletter') && !disabledValues.has(newsletterValue)) ||
    modalValue === 'newsletter' ||
    subscribeValue === 'newsletter' ||
    hash === 'newsletter' ||
    hash === 'subscribe'
  );
}

export function NewsletterAutoOpen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (shouldOpenNewsletterModal()) {
      setIsModalOpen(true);
    }
  }, []);

  return (
    <NewsletterModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    />
  );
}
