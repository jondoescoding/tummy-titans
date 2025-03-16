
import { Patient, generateAISuggestion } from '@/lib/patientData';
import { motion } from 'framer-motion';
import { BrainIcon } from 'lucide-react';

interface AISuggestionProps {
  patient: Patient;
}

const AISuggestion = ({ patient }: AISuggestionProps) => {
  const suggestion = generateAISuggestion(patient);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200"
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
      
      <p className="text-sm text-blue-800 leading-relaxed">{suggestion}</p>
    </motion.div>
  );
};

export default AISuggestion;
