/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  User, 
  BarChart3, 
  Code2, 
  Mail, 
  Github, 
  Linkedin, 
  Database, 
  LineChart, 
  PieChart as PieChartIcon,
  ChevronDown,
  ExternalLink,
  BookOpen,
  MapPin,
  GraduationCap,
  Menu,
  X
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn } from './lib/utils';

// --- Data ---

const SKILLS = [
  { name: 'R / RStudio', level: 90, color: '#276DC3' }, // R is blue-ish but I'll use a custom emerald theme for the bars
  { name: 'Python (Pandas, NumPy)', level: 85, color: '#10b981' },
  { name: 'SQL / PostgreSQL', level: 80, color: '#10b981' },
  { name: 'STATA / SPSS', level: 75, color: '#10b981' },
  { name: 'Excel (VBA/Power Query)', level: 95, color: '#10b981' },
  { name: 'Power BI / Tableau', level: 85, color: '#10b981' },
];

const STATS_DATA = [
  { month: 'Jan', surveys: 400, accuracy: 95 },
  { month: 'Fév', surveys: 300, accuracy: 98 },
  { month: 'Mar', surveys: 600, accuracy: 96 },
  { month: 'Avr', surveys: 800, accuracy: 97 },
  { month: 'Mai', surveys: 500, accuracy: 99 },
  { month: 'Juin', surveys: 900, accuracy: 98 },
];

const PIE_DATA = [
  { name: 'Démographie', value: 400 },
  { name: 'Économie', value: 300 },
  { name: 'Santé', value: 300 },
  { name: 'Éducation', value: 200 },
];

const COLORS = ['#10b981', '#059669', '#047857', '#065f46'];

// --- Components ---

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-10 md:mb-12 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-white"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-emerald-500 font-medium uppercase tracking-widest text-[10px] sm:text-xs md:text-sm"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 40 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-emerald-500 mx-auto mt-3 md:mt-4 rounded-full"
    />
  </div>
);

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level, index }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-gray-300 font-medium">{name}</span>
      <span className="text-emerald-500 font-bold">{level}%</span>
    </div>
    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/5">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
      />
    </div>
  </div>
);

const BackgroundAnimation = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    <div className="absolute top-[30%] right-[10%] w-[20%] h-[20%] bg-emerald-500/5 blur-[100px] rounded-full" />
    
    {/* Grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = ['Accueil', 'Profil', 'Compétences', 'Analyses', 'Contact'];

  return (
    <div className="min-h-screen selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      <BackgroundAnimation />
      
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass py-3 md:py-4">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-xl font-display font-bold text-white flex items-center gap-2"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-bg-dark text-sm md:text-base">JP</div>
            <span>Jean Paul</span>
          </motion.div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="hover:text-emerald-500 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-500 text-bg-dark px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold hover:bg-emerald-400 transition-colors"
            >
              CV
            </motion.button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-bg-dark/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navItems.map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-lg font-medium text-gray-300 hover:text-emerald-500 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="accueil" className="min-h-screen flex items-center pt-24 md:pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              L'Art de la <span className="text-emerald-500">Statistique</span> au service du <span className="text-amber-500">Développement</span>.
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Étudiant à l'École Nationale de Statistiques et de Planification (ENSPD) de l'Université de Parakou. Passionné par l'analyse de données et la planification stratégique.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-500 text-bg-dark px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold flex items-center gap-2 text-sm md:text-base"
              >
                Voir mes projets <ChevronDown size={18} />
              </motion.button>
              <div className="flex gap-3 md:gap-4 items-center">
                <a href="#" className="p-2.5 md:p-3 glass rounded-xl hover:text-emerald-500 transition-colors"><Github size={20} md:size={24} /></a>
                <a href="#" className="p-2.5 md:p-3 glass rounded-xl hover:text-emerald-500 transition-colors"><Linkedin size={20} md:size={24} /></a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative max-w-[400px] mx-auto md:max-w-none w-full"
          >
            <div className="aspect-square glass rounded-2xl md:rounded-3xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
              <img 
                src="https://picsum.photos/seed/statistician/800/800" 
                alt="Jean Paul" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Floating badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-6 md:top-10 -left-2 md:-left-6 glass p-2.5 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-2xl"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                  <BarChart3 size={16} md:size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Expertise</div>
                  <div className="text-xs md:text-sm font-bold">Data Science</div>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                className="absolute bottom-6 md:bottom-10 -right-2 md:-right-6 glass p-2.5 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-2xl"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-500">
                  <GraduationCap size={16} md:size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400">Formation</div>
                  <div className="text-xs md:text-sm font-bold">ENSPD Parakou</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profil" className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle subtitle="Qui suis-je ?">Mon Profil</SectionTitle>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6">
                <BookOpen size={24} md:size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Éducation</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Actuellement en cycle d'ingénieur à l'ENSPD. Spécialisation en statistiques appliquées et planification du développement local.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl border-emerald-500/30"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-amber-500 mb-5 md:mb-6">
                <MapPin size={24} md:size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Localisation</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Basé à Parakou, Bénin. Ouvert aux opportunités de stages et de collaborations sur tout le territoire national et à l'international.
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -10 }}
              className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center text-emerald-500 mb-5 md:mb-6">
                <Database size={24} md:size={28} />
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-white">Vision</h3>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed">
                Transformer les données brutes en informations exploitables pour guider les politiques publiques et les décisions d'entreprise.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="compétences" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <SectionTitle subtitle="Expertise Technique">Logiciels & Outils</SectionTitle>
              <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 leading-relaxed text-center md:text-left">
                Maîtrise d'une large gamme d'outils statistiques et informatiques essentiels pour le traitement, l'analyse et la visualisation de données complexes.
              </p>
              
              <div className="space-y-1 md:space-y-2">
                {SKILLS.map((skill, index) => (
                  <SkillBar 
                    key={skill.name} 
                    name={skill.name} 
                    level={skill.level} 
                    index={index} 
                  />
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="space-y-3 md:space-y-4">
                <div className="glass p-4 md:p-6 rounded-xl md:rounded-2xl text-center">
                  <div className="text-2xl md:text-3xl font-bold text-emerald-500 mb-1">15+</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Projets réalisés</div>
                </div>
                <div className="glass p-4 md:p-6 rounded-xl md:rounded-2xl text-center h-36 md:h-48 flex flex-col justify-center">
                  <Code2 size={24} md:size={32} className="mx-auto text-amber-500 mb-3 md:mb-4" />
                  <div className="text-xs md:text-sm font-bold">Clean Code</div>
                  <div className="text-[10px] text-gray-500">R & Python</div>
                </div>
              </div>
              <div className="space-y-3 md:space-y-4 pt-6 md:pt-8">
                <div className="glass p-4 md:p-6 rounded-xl md:rounded-2xl text-center h-36 md:h-48 flex flex-col justify-center">
                  <LineChart size={24} md:size={32} className="mx-auto text-emerald-500 mb-3 md:mb-4" />
                  <div className="text-xs md:text-sm font-bold">Analyses</div>
                  <div className="text-[10px] text-gray-500">Prédictives</div>
                </div>
                <div className="glass p-4 md:p-6 rounded-xl md:rounded-2xl text-center">
                  <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-1">99%</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">Précision</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Section (Graphs) */}
      <section id="analyses" className="py-16 md:py-24 bg-white/[0.02]">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle subtitle="Visualisation">Analyses de Données</SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Area Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass p-5 md:p-8 rounded-2xl md:rounded-3xl"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                <h3 className="text-lg md:text-xl font-bold text-white">Volume d'Enquêtes & Précision</h3>
                <div className="flex gap-4 text-[10px] md:text-xs">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" /> Enquêtes</div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-amber-500 rounded-full" /> Précision</div>
                </div>
              </div>
              <div className="h-[250px] md:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STATS_DATA}>
                    <defs>
                      <linearGradient id="colorSurveys" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#171717', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="surveys" stroke="#10b981" fillOpacity={1} fill="url(#colorSurveys)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Pie Chart & Stats */}
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center"
              >
                <h3 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-white">Répartition des Domaines</h3>
                <div className="h-[180px] md:h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={PIE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {PIE_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-4">
                  {PIE_DATA.map((item, i) => (
                    <div key={item.name} className="flex items-center gap-1.5 text-[9px] md:text-[10px] text-gray-400">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      {item.name}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl flex flex-col justify-between"
              >
                <div>
                  <PieChartIcon className="text-emerald-500 mb-4" size={28} md:size={32} />
                  <h3 className="text-base md:text-lg font-bold mb-2 text-white">Impact Analytique</h3>
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                    Mes analyses ont permis d'optimiser les ressources de 3 projets pilotes en milieu rural.
                  </p>
                </div>
                <div className="mt-6 md:mt-8">
                  <div className="text-3xl md:text-4xl font-bold text-white">+24%</div>
                  <div className="text-[10px] md:text-xs text-emerald-500 font-medium uppercase tracking-wider">Efficacité opérationnelle</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="glass p-6 sm:p-10 md:p-12 rounded-[30px] md:rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -mr-32 -mt-32" />
            
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 relative z-10">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-white">Travaillons <span className="text-emerald-500">Ensemble</span>.</h2>
                <p className="text-sm md:text-lg text-gray-400 mb-8 md:mb-10 leading-relaxed">
                  Vous avez un projet d'analyse de données ou besoin d'une expertise en planification ? N'hésitez pas à me contacter.
                </p>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-emerald-500">
                      <Mail size={18} md:size={20} />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">Email</div>
                      <div className="text-sm md:text-base font-bold text-white">jeanpaul.enspd@gmail.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 justify-center md:justify-start">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-xl flex items-center justify-center text-amber-500">
                      <Linkedin size={18} md:size={20} />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">LinkedIn</div>
                      <div className="text-sm md:text-base font-bold text-white">Jean Paul - Statisticien</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <form className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <input type="text" placeholder="Nom" className="w-full glass p-3.5 md:p-4 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-sm text-white placeholder:text-gray-500" />
                  <input type="email" placeholder="Email" className="w-full glass p-3.5 md:p-4 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-sm text-white placeholder:text-gray-500" />
                </div>
                <input type="text" placeholder="Sujet" className="w-full glass p-3.5 md:p-4 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors text-sm text-white placeholder:text-gray-500" />
                <textarea placeholder="Message" rows={4} className="w-full glass p-3.5 md:p-4 rounded-xl focus:outline-none focus:border-emerald-500 transition-colors resize-none text-sm text-white placeholder:text-gray-500"></textarea>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-500 text-bg-dark py-3.5 md:py-4 rounded-xl font-bold hover:bg-emerald-400 transition-colors text-sm md:text-base"
                >
                  Envoyer le message
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-display font-bold text-white">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center text-[10px] text-bg-dark">JP</div>
            <span>Jean Paul</span>
          </div>
          <p className="text-gray-500 text-xs md:text-sm text-center">
            © 2026 Portfolio Jean Paul. Étudiant ENSPD Parakou.
          </p>
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-emerald-500 transition-colors"><Github size={18} md:size={20} /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin size={18} md:size={20} /></a>
            <a href="#" className="hover:text-emerald-500 transition-colors"><ExternalLink size={18} md:size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
