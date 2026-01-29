import React from 'react';
import { ProposalData } from '../types';
import { 
  ArrowRight, 
  CheckCircle2,
  Clock,
  Layers,
  Zap
} from 'lucide-react';

interface ProposalViewProps {
  data: ProposalData;
}

// Modern Minimalist Section
const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <section className={`py-10 md:py-24 px-4 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

const SectionHeader: React.FC<{ title: string; number: string }> = ({ title, number }) => (
  <div className="flex items-baseline gap-3 md:gap-4 mb-8 md:mb-16 border-b border-gray-200 pb-4 md:pb-6">
    <span className="text-modern-accent font-mono text-xs md:text-sm font-bold tracking-widest">
      {number}
    </span>
    <h2 className="text-2xl md:text-4xl font-display font-bold text-modern-black tracking-tight">
      {title}
    </h2>
  </div>
);

export const ProposalView: React.FC<ProposalViewProps> = ({ data }) => {
  return (
    <div className="bg-white min-h-screen text-gray-600 font-sans selection:bg-modern-accent selection:text-white pb-6 md:pb-10">
      
      {/* 1. Modern Cover */}
      <div className="min-h-screen flex flex-col p-6 md:p-12 relative overflow-hidden bg-modern-gray">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        <div className="flex-1 flex flex-col justify-center max-w-5xl z-10">
           <div className="inline-flex items-center gap-2 mb-8">
             <span className="w-2 h-2 rounded-full bg-modern-accent"></span>
             <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 font-display">
               Коммерческое предложение
             </span>
           </div>
           
           <h1 className="text-3xl md:text-7xl lg:text-8xl font-display font-bold text-modern-black leading-[1] md:leading-[0.95] tracking-tighter mb-6 md:mb-10">
             {data.meta.projectTitle}
           </h1>

           <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-8 md:mt-12">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Для кого</p>
                <p className="text-lg md:text-2xl text-modern-black font-medium">{data.meta.clientName}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Дата</p>
                <p className="text-lg md:text-2xl text-modern-black font-medium">{data.meta.date}</p>
              </div>
           </div>
        </div>

        <div className="border-t border-gray-300 pt-6 flex justify-between items-end z-10">
           <p className="font-display font-bold text-modern-black text-lg">{data.meta.providerName}</p>
           <div className="hidden md:block w-32 h-1 bg-modern-black"></div>
        </div>
      </div>

      {/* 2. Understanding (Grid Layout) */}
      <Section>
        <SectionHeader number="01" title="Задача и Контекст" />
        <div className="grid md:grid-cols-2 gap-4 md:gap-16">
           <div className="bg-modern-gray p-6 md:p-12 rounded-2xl">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-6 shadow-sm text-modern-black">
                <Layers size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-xl text-modern-black mb-4">Текущая ситуация</h3>
              <p className="leading-relaxed text-gray-600">
                {data.understanding.currentSituation}
              </p>
           </div>
           <div className="bg-modern-black p-6 md:p-12 rounded-2xl text-white">
              <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center mb-6 text-white">
                <Zap size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-xl mb-4">Цель проекта</h3>
              <p className="leading-relaxed text-gray-300">
                {data.understanding.problemToSolve}
              </p>
           </div>
        </div>
      </Section>

      {/* 3. Solution Stages */}
      <Section>
        <SectionHeader number="02" title="Этапы работы" />
        <div className="grid gap-6">
          {data.stages.map((stage, idx) => (
            <div key={idx} className="group border border-gray-100 hover:border-modern-accent/30 bg-white p-5 md:p-10 rounded-xl transition-all hover:shadow-xl hover:shadow-gray-100/50 flex flex-col md:flex-row gap-4 md:gap-8">
               <div className="md:w-1/4">
                 <span className="font-mono text-xs text-modern-accent font-bold tracking-widest mb-2 block">
                   STEP {String(idx + 1).padStart(2, '0')}
                 </span>
                 <h3 className="text-xl md:text-2xl font-display font-bold text-modern-black">{stage.title}</h3>
                 <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium bg-gray-50 px-3 py-1 rounded-full text-gray-600">
                   <Clock size={14} />
                   {stage.duration}
                 </div>
               </div>
               <div className="md:w-3/4 md:border-l md:border-gray-100 md:pl-8 flex items-center">
                 <p className="text-base md:text-lg leading-relaxed text-gray-600">
                   {stage.description}
                 </p>
               </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Timeline (Horizontal) */}
      <Section className="bg-modern-gray rounded-2xl md:rounded-3xl mx-4 md:mx-0 my-4 md:my-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-6">
          <div>
            <span className="text-modern-accent font-mono text-sm font-bold tracking-widest block mb-2">03</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-modern-black">Таймлайн</h2>
          </div>
          <div className="bg-white px-6 py-3 rounded-xl shadow-sm">
             <span className="text-sm text-gray-500 uppercase tracking-wide mr-3">Общий срок</span>
             <span className="font-display font-bold text-xl text-modern-black">{data.timeline.totalDuration}</span>
          </div>
        </div>

        <div className="relative">
           {/* Line */}
           <div className="absolute top-[15px] left-0 w-full h-0.5 bg-gray-200 hidden md:block"></div>
           
           <div className="grid md:grid-cols-3 gap-6 md:gap-10">
             {data.timeline.milestones.map((ms, idx) => (
               <div key={idx} className="relative pt-2 md:pt-8">
                  <div className="hidden md:block absolute top-[11px] left-0 w-2.5 h-2.5 rounded-full bg-modern-accent ring-4 ring-white"></div>
                  <span className="font-mono text-xs text-gray-400 mb-2 block">MILESTONE {idx + 1}</span>
                  <p className="font-display font-medium text-base md:text-lg text-modern-black">{ms}</p>
               </div>
             ))}
           </div>
        </div>
      </Section>

      {/* 5. Pricing (Clean Tables) */}
      <Section>
        <SectionHeader number="04" title="Бюджет" />
        
        <div className="flex flex-col lg:flex-row gap-6 md:gap-12">
           <div className="lg:w-2/3">
              <div className="bg-modern-black text-white rounded-2xl p-6 md:p-12 relative overflow-hidden">
                 <div className="relative z-10">
                    <p className="text-gray-400 mb-2 uppercase tracking-widest text-sm font-bold">Стоимость проекта</p>
                    <p className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">{data.pricing.mainCost}</p>
                    <div className="space-y-3 border-t border-gray-800 pt-6">
                       <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Что входит:</p>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Анализ конкурентов и аудитории</p>
                       </div>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Дизайн и сборка лендинга</p>
                       </div>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Квиз / лид-магнит</p>
                       </div>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Креативы для рекламы</p>
                       </div>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Настройка Яндекс.Директ на 4 города</p>
                       </div>
                       <div className="flex items-start gap-3">
                          <CheckCircle2 className="text-modern-accent shrink-0 mt-0.5" size={16} />
                          <p className="text-gray-300 text-sm">Ведение рекламы</p>
                       </div>
                    </div>
                 </div>
                 {/* Decorative gradient */}
                 <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-modern-accent/20 blur-3xl rounded-full"></div>
              </div>
           </div>

           <div className="lg:w-1/3 border border-gray-200 rounded-2xl p-6 md:p-8 flex flex-col justify-center">
              <h4 className="font-display font-bold text-lg text-modern-black mb-6">Рекламный бюджет</h4>
              <p className="text-xs text-gray-500 mb-4">Оплачивается напрямую в Яндекс — принадлежит вам</p>
              <div className="space-y-6">
                 {data.pricing.additionalCosts.length > 0 ? (
                    data.pricing.additionalCosts.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm">
                         <span className="text-gray-600">{item.description}</span>
                         <span className="font-bold text-modern-black font-display">{item.amount}</span>
                      </div>
                    ))
                 ) : (
                    <p className="text-gray-400 italic">Нет доп. расходов</p>
                 )}
              </div>
           </div>
        </div>
      </Section>

    </div>
  );
};