import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { LayoutType, BrandConfig, CardData } from './types';
import { BRANDS, OCCASIONS } from './constants';
import { generateGreeting } from './services/geminiService';
import CardPreview from './components/CardPreview';
import { 
  Download, 
  RefreshCw, 
  Wand2, 
  Check, 
  Smartphone, 
  CreditCard,
  Palette,
} from 'lucide-react';

const App: React.FC = () => {
  // State
  const [activeBrand, setActiveBrand] = useState<BrandConfig>(BRANDS[0]);
  const [layout, setLayout] = useState<LayoutType>('horizontal');
  const [formData, setFormData] = useState({
    code: '',
    value: '', // e.g., "50" or "1 Cup"
    sender: '',
    recipient: '',
    occasion: OCCASIONS[0],
  });
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Refs for capture
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateMessage = async () => {
    setIsGenerating(true);
    const msg = await generateGreeting(
      formData.occasion, 
      activeBrand, 
      formData.sender, 
      formData.recipient
    );
    setGeneratedMessage(msg);
    setIsGenerating(false);
  };

  // Trigger initial message generation on load or brand change (optional, but good for UX)
  useEffect(() => {
    if (!generatedMessage) {
        setGeneratedMessage(`${formData.occasion}！这是一份给你的心意。`);
    }
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current || !window.html2canvas) return;
    setIsDownloading(true);

    try {
      // Small delay to ensure rendering is perfect
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await window.html2canvas(cardRef.current, {
        scale: 2, // High res
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${activeBrand.name}-GiftCard.png`;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
      alert("抱歉，图片生成失败，请重试。");
    } finally {
      setIsDownloading(false);
    }
  };

  const currentCardData: CardData = {
    brandId: activeBrand.id,
    code: formData.code,
    value: formData.value,
    sender: formData.sender,
    recipient: formData.recipient,
    message: generatedMessage,
    layout: layout,
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800 flex flex-col lg:flex-row">
      
      {/* --- LEFT PANEL: Editor --- */}
      <div className="w-full lg:w-[450px] bg-white border-r border-slate-200 flex flex-col h-auto lg:h-screen overflow-y-auto shadow-xl z-20">
        <div className="p-8 pb-4">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
               礼
             </div>
             <h1 className="text-2xl font-bold tracking-tight text-slate-900">礼遇·电子卡</h1>
          </div>
          <p className="text-slate-500 text-sm">简单几步，生成精美的高级感电子礼品卡。</p>
        </div>

        <div className="flex-1 px-8 space-y-8 pb-12">
          
          {/* 1. Brand Selection */}
          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              <Palette size={16} /> 选择品牌
            </label>
            <div className="grid grid-cols-3 gap-2">
              {BRANDS.map(brand => (
                <button
                  key={brand.id}
                  onClick={() => setActiveBrand(brand)}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center gap-2 h-24 text-center
                    ${activeBrand.id === brand.id 
                      ? 'border-slate-800 bg-slate-800 text-white shadow-lg ring-2 ring-slate-800 ring-offset-2' 
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  <span className={`block w-3 h-3 rounded-full`} style={{backgroundColor: brand.colors.primary}}></span>
                  <span className="leading-tight text-xs">{brand.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 2. Layout */}
          <section>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
              <CreditCard size={16} /> 卡片版式
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLayout('horizontal')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all
                  ${layout === 'horizontal' ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <CreditCard size={18} /> 横版
              </button>
              <button
                onClick={() => setLayout('vertical')}
                className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-sm font-medium transition-all
                  ${layout === 'vertical' ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'border-slate-200 text-slate-500 hover:bg-slate-50'}`}
              >
                <Smartphone size={18} /> 竖版
              </button>
            </div>
          </section>

          {/* 3. Details Form */}
          <section className="space-y-4">
             <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
               <Check size={16} /> 卡片信息
             </label>
             
             <div>
               <label className="text-xs font-medium text-slate-500 mb-1 block">兑换码</label>
               <input 
                 type="text" 
                 name="code"
                 placeholder="例如: A82F-9921-XK20"
                 value={formData.code}
                 onChange={handleInputChange}
                 className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none font-mono text-sm bg-white transition-all"
               />
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">面额 (可选)</label>
                  <input 
                    type="text" 
                    name="value"
                    placeholder="例如: 50"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-sm transition-all"
                  />
                </div>
                 <div>
                   <label className="text-xs font-medium text-slate-500 mb-1 block">赠送场景</label>
                    <select 
                    name="occasion" 
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-sm bg-white transition-all"
                  >
                    {OCCASIONS.map(occ => <option key={occ} value={occ}>{occ}</option>)}
                  </select>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="text-xs font-medium text-slate-500 mb-1 block">接收人</label>
                   <input 
                    type="text" 
                    name="recipient"
                    placeholder="对方昵称"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-sm transition-all"
                  />
                </div>
                <div>
                   <label className="text-xs font-medium text-slate-500 mb-1 block">赠送人</label>
                   <input 
                    type="text" 
                    name="sender"
                    placeholder="你的昵称"
                    value={formData.sender}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none text-sm transition-all"
                  />
                </div>
             </div>
          </section>

          {/* 4. AI Message */}
          <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
               <label className="flex items-center gap-2 text-sm font-semibold text-slate-900 uppercase tracking-wider">
                <Wand2 size={16} className="text-indigo-600" /> AI 祝福语
              </label>
            </div>
            
            <textarea
              className="w-full p-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none resize-none font-serif leading-relaxed transition-all"
              rows={3}
              value={generatedMessage}
              onChange={(e) => setGeneratedMessage(e.target.value)}
            />
            
            <button
              onClick={handleGenerateMessage}
              disabled={isGenerating}
              className="mt-3 w-full py-2 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={14} /> 生成中...
                </>
              ) : (
                <>
                  <Wand2 size={14} /> AI 生成文案
                </>
              )}
            </button>
          </section>
        </div>
      </div>

      {/* --- RIGHT PANEL: Preview --- */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 lg:p-12 overflow-hidden bg-slate-100">
        
        {/* Render Area */}
        <div className="relative group perspective-1000">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02] shadow-2xl rounded-[32px]">
            <CardPreview 
              ref={cardRef}
              data={currentCardData} 
              brand={activeBrand} 
            />
          </div>
        </div>
        
        {/* Floating Download Bar */}
        <div className="fixed bottom-8 left-1/2 lg:left-auto lg:right-12 -translate-x-1/2 lg:translate-x-0 z-30">
          <button
            onClick={handleDownload}
            disabled={isDownloading || !formData.code}
            className={`
              flex items-center gap-3 px-8 py-4 rounded-full shadow-2xl font-bold text-white transition-all transform hover:-translate-y-1 active:scale-95
              ${!formData.code ? 'bg-slate-400 cursor-not-allowed' : 'bg-slate-900 hover:bg-black'}
            `}
          >
            {isDownloading ? (
              <RefreshCw className="animate-spin" />
            ) : (
              <Download size={20} />
            )}
            <span>{isDownloading ? '生成中...' : '保存图片'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

// Add html2canvas to window type
declare global {
  interface Window {
    html2canvas: any;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;