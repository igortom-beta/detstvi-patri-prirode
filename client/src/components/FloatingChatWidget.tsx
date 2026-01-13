import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [detectedLanguage, setDetectedLanguage] = useState('cs');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setInputValue(prev => prev + event.results[i][0].transcript);
            resetSilenceTimer();
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const resetSilenceTimer = () => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    silenceTimerRef.current = setTimeout(() => {
      if (inputValue.trim()) {
        handleSendMessage();
      }
    }, 7000); // 7 seconds of silence
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    } else {
      setInputValue('');
      recognitionRef.current?.start();
      setIsListening(true);
      resetSilenceTimer();
    }
  };

  const detectLanguage = (text: string): string => {
    const languageKeywords: Record<string, string[]> = {
      cs: ['ahoj', 'jak', 'co', 'kde', 'kdy', 'proč', 'cena', 'nájem', 'bungalov', 'pronájem', 'rezervace', 'kolik', 'stojí', 'měsíc'],
      de: ['wie', 'was', 'wo', 'wann', 'warum', 'bungalow', 'miete', 'preis', 'kosten', 'monat', 'reservierung', 'buchung'],
      en: ['how', 'what', 'where', 'when', 'why', 'bungalow', 'rent', 'price', 'cost', 'month', 'booking', 'reservation'],
    };
    
    const lowerText = text.toLowerCase();
    const scores: Record<string, number> = { cs: 0, de: 0, en: 0 };

    Object.entries(languageKeywords).forEach(([lang, words]) => {
      words.forEach(word => {
        if (lowerText.includes(word)) scores[lang]++;
      });
    });

    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      return Object.keys(scores).find(key => scores[key as keyof typeof scores] === maxScore) || 'cs';
    }
    return 'cs';
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    const language = detectLanguage(userMessage);
    setDetectedLanguage(language);
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message.content;
      
      setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
    } catch (error) {
      console.error('Error calling AI:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Omlouvám se, došlo k chybě při spojení s asistentem. Zkuste to prosím později.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getWelcomeMessage = (): string => {
    const messages: Record<string, string> = {
      cs: 'Vítejte v Lojzových Pasekách! (Aktualizováno) 👋 Jak vám mohu pomoci?',
      de: 'Willkommen in Lojzovy Paseky! 👋 Wie kann ich dir helfen?',
      en: 'Welcome to Lojzovy Paseky! 👋 How can I help you?',
    };
    return messages[detectedLanguage] || messages.cs;
  };

  return (
    <>
      <div className="fixed bottom-32 right-6 z-40">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          onClick={() => window.location.href = 'mailto:info@lojzovypaseky.life?subject=Rezervace'}
        >
          REZERVOVAT TEĎ
        </Button>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#1a3a5f] text-white p-4 rounded-full shadow-lg hover:bg-[#0f2540] transition-colors"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-24px)] h-96 max-h-[calc(100vh-200px)] flex flex-col bg-white border-2 border-[#1a3a5f] shadow-2xl rounded-lg z-50">
          <div className="bg-[#1a3a5f] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">Lojzovy Paseky Assistant</h3>
              <p className="text-sm text-gray-200">Modern bungalows at Lipno</p>
            </div>
            <button 
              onClick={toggleListening}
              className={`p-2 rounded-full transition-all ${isListening ? 'bg-green-500 animate-pulse' : 'bg-white/10 hover:bg-white/20'}`}
              title={isListening ? "Poslouchám... (automatické odeslání po 7s ticha)" : "Zapnout hlasový vstup"}
            >
              {isListening ? <Mic size={20} /> : <MicOff size={20} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <p className="text-sm">{getWelcomeMessage()}</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-[#1a3a5f] text-white rounded-br-none' : 'bg-white text-gray-800 border border-[#1a3a5f] rounded-bl-none'}`}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-[#1a3a5f] px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#1a3a5f] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="border-t border-[#1a3a5f] p-4 bg-white rounded-b-lg flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isListening ? "Poslouchám..." : "Napište zprávu..."}
              className={`flex-1 border-[#1a3a5f] ${isListening ? 'border-green-500 ring-1 ring-green-500' : ''}`}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !inputValue.trim()} className="bg-[#1a3a5f] hover:bg-[#0f2540] text-white">
              <Send size={18} />
            </Button>
          </form>
          {isListening && (
            <div className="px-4 pb-2 text-[10px] text-green-600 font-medium animate-pulse">
              🎤 Poslouchám... Zpráva se odešle automaticky po 7 sekundách ticha nebo stisknutím Enter.
            </div>
          )}
        </Card>
      )}
    </>
  );
}
