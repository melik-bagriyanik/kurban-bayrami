'use client';

import { useState, useEffect } from 'react';
import messages from '../data/messages.json';

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.messages.length);
    setCurrentMessage(messages.messages[randomIndex]);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const shareMessage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kurban Bayramı Mesajı',
          text: currentMessage,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  useEffect(() => {
    getRandomMessage();
  }, []);

  return (
    <>
      <div className="background-pattern"></div>
      <div className="container">
        <img
          src="/koyun.png"
          alt="Kurbanlık Koyun"
          style={{ width: '100%', height: '300px', display: 'block', margin: '0', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        />
        <div className="content-inner">
          <h1 className="title gradient-text">Kurban Bayramı Mesajları</h1>
          <div className="message-box">
            <textarea
              className="message"
              value={currentMessage}
              onChange={handleMessageChange}
              placeholder="Mesajınızı buraya yazabilirsiniz..."
            />
          </div>
          <div className="button-container">
            <button
              onClick={getRandomMessage}
              className="button new-message"
            >
              <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M16 4a12 12 0 1 1-8.49 3.51" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 4v7h7" strokeLinecap="round" strokeLinejoin="round"/>
                <polygon points="16,12 17,15 20,15 17.5,17 18.5,20 16,18.5 13.5,20 14.5,17 12,15 15,15" fill="currentColor" stroke="none"/>
              </svg>
              Yeni Mesaj
            </button>
            <button
              onClick={copyToClipboard}
              className="button copy"
            >
              <svg className="icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="9" y="7" width="14" height="18" rx="3"/>
                <path d="M13 7V5a3 3 0 0 1 6 0v2"/>
              </svg>
              {copied ? '✓' : 'Kopyala'}
            </button>
            <button
              onClick={shareMessage}
              className="button share"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 2v13" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Paylaş
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
