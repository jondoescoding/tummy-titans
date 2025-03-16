
import { motion } from 'framer-motion';
import { Patient } from '@/lib/patientData';
import { PillIcon, ClockIcon, HeartPulseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { generateAISuggestion } from '@/lib/patientData';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  // Format date
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(patient.submittedAt);

  return (
    <motion.div 
      className="w-full card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className={cn(
          "glass-card rounded-2xl overflow-hidden transition-all duration-300",
          expanded ? "shadow-lg" : "shadow-md"
        )}
      >
        <div 
          className="p-6 cursor-pointer"
          onClick={toggleExpand}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center mb-2">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs font-medium text-green-600">New Request</span>
              </div>
              <h3 className="text-xl font-semibold">{patient.name}</h3>
              <div className="flex items-center mt-1 text-sm text-gray-500">
                <ClockIcon className="w-3.5 h-3.5 mr-1" />
                <span>Submitted {formattedDate}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{patient.age} years</div>
              <div className="text-sm text-gray-500">
                {patient.height}cm / {patient.weight}kg
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center mb-2">
              <HeartPulseIcon className="w-4 h-4 text-red-500 mr-2" />
              <span className="font-medium">{patient.condition}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {patient.triggers.map((trigger, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-red-50 text-red-600 rounded-full text-xs font-medium"
              >
                {trigger}
              </span>
            ))}
          </div>

          <div className="flex items-center mb-2 text-sm text-gray-500">
            <PillIcon className="w-4 h-4 mr-1" />
            <span>{patient.medication.join(', ')}</span>
          </div>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6"
          >
            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold mb-2">Patient Notes</h4>
              <p className="text-sm text-gray-600 mb-4">{patient.notes}</p>
              
              <h4 className="text-sm font-semibold mb-2">AI Suggestion</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">{generateAISuggestion(patient)}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PatientCard;
