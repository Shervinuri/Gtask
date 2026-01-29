import React, { useState, useRef, useEffect } from 'react';
import { Input } from './components/Input';
import { Button } from './components/Button';
import ParticlesBackground from './components/ParticlesBackground';
import { Copy, Check, Terminal, Shield, Mail, Info, ChevronDown, Link as LinkIcon, X } from 'lucide-react';

const SUGGESTED_LINKS = [
  { name: 'MatinGhanbari (Filtered VLESS)', url: 'https://raw.githubusercontent.com/MatinGhanbari/v2ray-configs/main/subscriptions/filtered/subs/vless.txt' },
  { name: 'Barry-Far (VLESS Only)', url: 'https://raw.githubusercontent.com/barry-far/V2ray-Config/main/Splitted-By-Protocol/vless.txt' },
  { name: 'Epodonios (VLESS)', url: 'https://raw.githubusercontent.com/Epodonios/v2ray-configs/main/Splitted-By-Protocol/vless.txt' },
  { name: 'NiREvil (VLESS)', url: 'https://raw.githubusercontent.com/NiREvil/vless/main/sub/vless.txt' }
];

const App: React.FC = () => {
  const [sublink, setSublink] = useState('');
  const [email, setEmail] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sublink || !email) {
      alert('لطفاً همه فیلدها را پر کنید!');
      return;
    }

    const prompt = `Every day, fetch the raw content from this exact URL:

${sublink}

Output ONLY the full raw text content of the file exactly as it is (no summaries, no explanations, no extra text, no greetings, no "here is the content", nothing added or removed).

If the link is unreachable or returns an error, output ONLY this single line:
"Error: Link not available today - ${sublink}"

Otherwise, output the complete raw subscription content (base64 encoded lines or vless:// links, whatever is in the file).`;

    setGeneratedPrompt(prompt);
    setShowOutput(true);
    
    setTimeout(() => {
      document.getElementById('output-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const fillSuggestion = (url: string) => {
    setSublink(url);
    setShowSuggestions(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 relative">
      <ParticlesBackground />
      
      {/* Dark overlay to ensure text readability */}
      <div className="fixed inset-0 bg-[#0a0a0a]/80 -z-10" />

      <header className="text-center mb-8 mt-8 w-full max-w-4xl relative z-10">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.5)] tracking-tighter py-2">
          Grok v2ray Task Manager
        </h1>
        <p className="text-gray-400 text-sm md:text-lg font-medium mt-2 tracking-wide">ابزار هوشمند تولید خودکار تسک‌های اینترنت آزاد</p>
        
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="mt-6 mx-auto flex items-center justify-center gap-2 text-xs md:text-sm text-cyan-400/80 hover:text-cyan-300 bg-black/40 hover:bg-black/60 backdrop-blur-md px-5 py-2 rounded-full transition-all border border-cyan-500/20 hover:border-cyan-400/50 shadow-[0_0_15px_rgba(0,191,255,0.1)]"
        >
          <Info className="w-4 h-4" />
          <span>راهنمای سامانه</span>
          {showInfo ? <ChevronDown className="w-3 h-3 rotate-180 transition-transform" /> : <ChevronDown className="w-3 h-3 transition-transform" />}
        </button>

        {showInfo && (
          <div className="mt-4 mx-auto max-w-2xl p-5 bg-[#0f0f0f]/90 backdrop-blur-xl border border-cyan-500/20 rounded-2xl text-right text-sm leading-7 text-gray-300 shadow-2xl animate-fadeIn">
            <h3 className="text-cyan-400 font-bold mb-2 flex items-center gap-2 text-lg">
              <Shield className="w-5 h-5" />
              اینترنت آزاد روزانه برای همه!
            </h3>
            <p className="mb-3">
              با استفاده از قابلیت <strong>Taskهای خودکار Grok</strong> و سرویس ایمیل ملی <strong>چاپار</strong>، ما راهی ساختیم که حتی در زمان محدودیت‌های شدید اینترنت، کانفیگ‌های تازه به دست شما برسد.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-400 text-xs md:text-sm">
              <li>سرویس <span className="text-white font-semibold">Grok</span> (هوش مصنوعی X) دسترسی آزاد به اینترنت دارد.</li>
              <li>ایمیل <span className="text-white font-semibold">چاپار</span> روی شبکه ملی اطلاعات (اینترانت) همیشه در دسترس است.</li>
              <li>گروک هر روز کانفیگ‌های جدید را دانلود کرده و به ایمیل چاپار شما می‌فرستد.</li>
            </ul>
          </div>
        )}
      </header>

      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 p-6 md:p-10 relative overflow-visible z-10 transition-all duration-500 hover:border-white/20">
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
          
          <div className="flex flex-col gap-2 w-full relative" ref={dropdownRef}>
             <div className="flex justify-between items-end px-1">
                <label className="text-gray-200 font-semibold text-sm md:text-base">ساب‌لینک (لینک خام GitHub):</label>
                <button
                  type="button"
                  onClick={() => setShowSuggestions(!showSuggestions)}
                  className="text-xs text-cyan-400 hover:text-cyan-200 transition-colors flex items-center gap-1 mb-1 px-3 py-1 rounded-full bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/20"
                >
                  <LinkIcon className="w-3 h-3" />
                  لینک‌های پیشنهادی
                </button>
             </div>
             
             <div className="relative group">
                <input
                    className="w-full p-4 rounded-xl bg-black/40 text-white border border-white/10 focus:border-cyan-500/50 focus:bg-black/60 focus:shadow-[0_0_20px_rgba(6,182,212,0.15)] focus:outline-none transition-all duration-300 placeholder-gray-600 pl-12"
                    placeholder="https://raw.githubusercontent.com/.../vless.txt"
                    value={sublink}
                    onChange={(e) => setSublink(e.target.value)}
                    required
                    type="url"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                    <LinkIcon className="w-5 h-5" />
                </div>
             </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-[105%] left-0 w-full bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden animate-fadeIn">
                <div className="p-3 bg-white/5 border-b border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400 font-medium">یک گزینه را انتخاب کنید (VLESS سبک)</span>
                  <button type="button" onClick={() => setShowSuggestions(false)}><X className="w-4 h-4 text-gray-400 hover:text-white" /></button>
                </div>
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {SUGGESTED_LINKS.map((link, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => fillSuggestion(link.url)}
                      className="w-full text-right p-4 hover:bg-cyan-900/20 hover:text-cyan-400 transition-all text-sm text-gray-300 border-b border-white/5 last:border-0 flex flex-col gap-1 group"
                    >
                      <span className="font-bold group-hover:text-white transition-colors">{link.name}</span>
                      <span className="text-[10px] text-gray-500 truncate w-full font-mono opacity-70 group-hover:opacity-100">{link.url}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Input
            label="آدرس ایمیل چاپار:"
            placeholder="example@chmail.ir"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            className="!bg-black/40 !border-white/10 focus:!bg-black/60 focus:!border-cyan-500/50 !p-4"
            helperText={
              <a 
                href="https://accounts.chmail.ir/signUp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-cyan-500/70 hover:text-cyan-400 transition-colors underline decoration-dotted text-xs mt-1"
              >
                <Mail className="w-3 h-3" />
                ثبت‌نام در چاپار
              </a>
            }
          />

          <Button 
            type="submit" 
            className="!py-4 text-lg font-bold tracking-wide"
          >
            تولید پرامپت Task
          </Button>
        </form>

        {showOutput && (
          <div id="output-section" className="mt-10 pt-8 border-t border-white/10 animate-fadeIn">
            <div className="relative group">
              <label className="block text-gray-300 font-medium mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                پرامپت تولید شده:
              </label>
              <textarea
                value={generatedPrompt}
                readOnly
                className="w-full h-64 p-5 rounded-2xl bg-black/40 text-cyan-100 border border-white/10 focus:border-cyan-400/50 outline-none resize-none font-mono text-xs md:text-sm leading-relaxed shadow-inner"
                dir="ltr"
              />
            </div>

            <Button 
              type="button" 
              variant="success" 
              onClick={handleCopy}
              className="mt-6 flex items-center justify-center gap-2 !py-3"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? 'کپی شد!' : 'کپی پرامپت'}
            </Button>

            <div className="mt-8 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
              <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5" />
                راهنما برای تنظیم در Grok:
              </h3>
              <ol className="list-decimal list-inside space-y-4 text-gray-300 text-sm leading-7">
                <li>به بخش <span className="text-white bg-white/10 px-2 py-0.5 rounded font-semibold">Tasks</span> در Grok بروید.</li>
                <li>یک Task جدید بسازید و پرامپت تولیدشده را در فیلد <span className="text-white bg-white/10 px-2 py-0.5 rounded font-semibold">Prompt</span> کپی کنید.</li>
                <li>زمان‌بندی را روی <span className="text-white bg-white/10 px-2 py-0.5 rounded font-semibold">Daily</span> (هر روز) تنظیم کنید.</li>
                <li>در بخش <span className="text-white bg-white/10 px-2 py-0.5 rounded font-semibold">Notifications</span>، گزینه Email را فعال کنید و ایمیل چاپار خود را بزنید.</li>
                <li className="text-amber-400/90 text-xs font-medium border border-amber-500/20 bg-amber-500/5 p-2 rounded-lg">نکته: اگر حجم زیاد بود، ساب‌لینک را با لینک سبک‌تری از لیست پیشنهادی جایگزین کنید.</li>
              </ol>
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto py-8 flex items-center justify-center gap-2 text-gray-300 text-sm font-bold tracking-widest opacity-100" dir="ltr">
        <span>☬</span>
        <span>Exclusive SHΞN™ made</span>
      </footer>
    </div>
  );
};

export default App;