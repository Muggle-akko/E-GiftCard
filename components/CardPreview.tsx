import React, { forwardRef } from 'react';
import { BrandConfig, CardData } from '../types';
import { Coffee, CupSoda, Gift, ShoppingBag, Utensils } from 'lucide-react';
import { CARD_DIMENSIONS } from '../constants';

interface CardPreviewProps {
  data: CardData;
  brand: BrandConfig;
  scale?: number;
}

const IconMap: Record<string, React.FC<any>> = {
  Coffee,
  CupSoda,
  Gift,
  ShoppingBag,
  Utensils,
};

const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ data, brand, scale = 1 }, ref) => {
  const Icon = IconMap[brand.icon] || Gift;
  const isVertical = data.layout === 'vertical';
  const dimensions = isVertical ? CARD_DIMENSIONS.vertical : CARD_DIMENSIONS.horizontal;

  const width = dimensions.width;
  const height = dimensions.height;

  // Dynamic Styles
  const cardStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    position: 'relative',
    overflow: 'hidden',
  };

  // Grainy texture overlay
  const noiseOverlay = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
  };

  // Currency Logic
  const displayValue = data.value 
    ? (/^\d+(\.\d+)?$/.test(data.value) ? `¥${data.value}` : data.value)
    : '';

  return (
    <div
      ref={ref}
      style={cardStyle}
      className={`rounded-[32px] ${brand.colors.background} text-gray-800 flex flex-col shadow-2xl`}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 pointer-events-none z-0" style={noiseOverlay}></div>
      
      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 flex flex-col h-full p-8">
        
        {/* Header: Brand & Value */}
        <div className="flex justify-between items-start shrink-0">
          <div className="flex items-center gap-3">
            <div 
              className="p-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm"
              style={{ color: brand.colors.primary }}
            >
              <Icon size={24} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight font-serif text-gray-900 leading-none mb-0.5">
                {brand.name}
              </h2>
              <span className="text-[10px] tracking-[0.2em] opacity-60 uppercase font-semibold">GIFT CARD</span>
            </div>
          </div>
          
          {/* Value - Larger Size, No Label, Top Right */}
          {displayValue && (
             <div className="flex flex-col items-end pt-1">
                <span className="font-serif font-bold text-5xl leading-none tracking-tight opacity-90" style={{ color: brand.colors.primary }}>
                   {displayValue}
                 </span>
             </div>
          )}
        </div>

        {/* --- CENTER: THE CODE (HERO) --- */}
        <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10 -mt-4">
             {/* Decorative Label */}
             <div className="mb-5 flex items-center gap-3 opacity-50">
                <div className="h-[1px] w-6 bg-current"></div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold">兑换码</span>
                <div className="h-[1px] w-6 bg-current"></div>
             </div>
             
             {/* Code - Larger Spacing */}
             <div className="relative w-full px-2 mb-6">
                <h3 className="font-mono font-bold text-4xl leading-tight text-gray-900 tracking-[0.35em] break-all drop-shadow-sm ml-1">
                  {data.code || 'CODE'}
                </h3>
             </div>

             {/* Message - Moved closer to code, secondary hierarchy */}
             <div className="w-full max-w-[85%] text-center px-2">
                 <p className="font-serif text-base italic leading-relaxed text-gray-700/75 whitespace-pre-wrap line-clamp-3">
                  {data.message}
                </p>
            </div>
        </div>

        {/* --- FOOTER: Bottom Right Signature --- */}
        {(data.recipient || data.sender) && (
          <div className="absolute bottom-8 right-8 flex flex-col items-end justify-end gap-1.5 z-20">
              
              {data.recipient && (
                  <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">To</span>
                      <span className="font-medium text-gray-900 text-sm border-b border-gray-900/10 pb-0.5 min-w-[3rem] text-right">
                        {data.recipient}
                      </span>
                  </div>
              )}

              {data.sender && (
                  <div className="flex items-baseline gap-2">
                      <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">From</span>
                      <span className="font-medium text-gray-900 text-sm border-b border-gray-900/10 pb-0.5 min-w-[3rem] text-right">
                        {data.sender}
                      </span>
                  </div>
              )}
          </div>
        )}

        {/* Subtle Decoration */}
        <div className="absolute -bottom-16 -left-16 opacity-[0.04] pointer-events-none -rotate-12">
           <Icon size={280} />
        </div>

      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';
export default CardPreview;