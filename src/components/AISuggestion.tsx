
import { Patient, generateAISuggestion } from '@/lib/patientData';
import { motion } from 'framer-motion';
import { BrainIcon, SaladIcon } from 'lucide-react';
import { useState } from 'react';

interface AISuggestionProps {
  patient: Patient;
}

const AISuggestion = ({ patient }: AISuggestionProps) => {
  const [expanded, setExpanded] = useState(false);
  const suggestion = generateAISuggestion(patient);
  
  // Split suggestion into medical advice and meal plan
  const parts = suggestion.split('\n\n');
  const medicalAdvice = parts[0];
  const mealPlan = parts.slice(1).join('\n\n');
  
  // Convert markdown-style formatting to JSX
  const formatMealPlan = (text: string) => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('**')) {
        // Handle headers (Day 1, Day 2, etc. or 3-Day Meal Plan)
        const content = line.replace(/\*\*/g, '');
        if (content.includes('Day')) {
          return <h4 key={index} className="font-medium text-blue-700 mt-3 mb-1">{content}</h4>;
        } else {
          return <h3 key={index} className="font-semibold text-blue-800 mb-2">{content}</h3>;
        }
      } else if (line.startsWith('-')) {
        // Handle list items (meals)
        return (
          <p key={index} className="text-sm text-blue-700 pl-3 py-0.5 border-l-2 border-blue-200">
            {line}
          </p>
        );
      } else {
        // Regular text
        return <p key={index} className="text-sm text-blue-700 mb-1">{line}</p>;
      }
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 backdrop-blur-md rounded-xl p-5 border border-blue-200/50 shadow-lg"
    >
      <div className="flex items-start space-x-3 mb-3">
        <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
          <BrainIcon className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-medium text-blue-800">AI Recommendation</h3>
          <p className="text-xs text-blue-600">Based on patient data analysis</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-blue-800 leading-relaxed">{medicalAdvice}</div>
        
        <div 
          className="relative overflow-hidden transition-all duration-300"
          style={{ maxHeight: expanded ? '1000px' : '100px' }}
        >
          <div className={`${!expanded ? 'mask-image-gradient' : ''}`}>
            <div className="flex items-center space-x-2 mb-2 mt-4">
              <SaladIcon className="h-4 w-4 text-green-600" />
              <h3 className="font-medium text-green-700">Personalized Meal Plan</h3>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              {formatMealPlan(mealPlan)}
            </div>
          </div>
          
          {!expanded && (
            <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-blue-50 to-transparent pointer-events-none"></div>
          )}
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          {expanded ? 'Show less' : 'Show full meal plan'}
        </button>
      </div>
    </motion.div>
  );
};

export default AISuggestion;
