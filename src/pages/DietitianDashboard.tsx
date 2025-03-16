
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import PatientCard from '@/components/PatientCard';
import { getPatientsByDoctorCode, Patient } from '@/lib/patientData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { 
  Users, 
  SearchIcon,
  ClipboardCheck
} from 'lucide-react';

const DietitianDashboard = () => {
  const [doctorCode, setDoctorCode] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (doctorCode.length === 5) {
        const fetchedPatients = getPatientsByDoctorCode(doctorCode);
        if (fetchedPatients.length > 0) {
          setPatients(fetchedPatients);
          setIsLoggedIn(true);
          toast.success(`Logged in as ${fetchedPatients[0].doctorCode === '12345' ? 'Dr. Emma Wilson' : 'Doctor'}`);
        } else {
          toast.error('No patients found for this code. Try with code 12345 for test data.');
        }
      } else {
        toast.error('Please enter a valid 5-digit code');
      }
      setIsLoading(false);
    }, 1500);
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      <main className="container max-w-5xl mx-auto pt-32 pb-20 px-6 page-transition">
        {!isLoggedIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto glass-card rounded-2xl p-8 shadow-xl"
          >
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Dietitian Dashboard</h1>
              <p className="text-gray-600">
                Enter your dietitian code to access your patient queue
              </p>
            </div>
            
            <form onSubmit={handleCodeSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="doctorCode" className="text-sm font-medium block">
                  Your Dietitian Code
                </label>
                <Input
                  id="doctorCode"
                  value={doctorCode}
                  onChange={(e) => setDoctorCode(e.target.value)}
                  placeholder="Enter 5-digit code (e.g., 12345)"
                  className="form-input-transition text-center text-lg tracking-wider"
                  maxLength={5}
                />
                <p className="text-xs text-gray-500 text-center">
                  For testing, use code: 12345
                </p>
              </div>
              
              <Button 
                type="submit" 
                className="w-full py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Access Dashboard'}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium mb-2">
                  Dietitian Dashboard
                </span>
                <h1 className="text-2xl font-bold">Patient Queue</h1>
                <p className="text-gray-600">
                  You have {patients.length} patients in your queue
                </p>
              </div>
              
              <div className="relative w-full md:w-auto min-w-[250px]">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 form-input-transition"
                />
              </div>
            </div>
            
            {filteredPatients.length > 0 ? (
              <div className="grid gap-6">
                {filteredPatients.map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="flex justify-center mb-4">
                  <ClipboardCheck className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No patients found</h3>
                <p className="text-gray-500">
                  {searchQuery ? `No results for "${searchQuery}"` : 'Your queue is empty'}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DietitianDashboard;
