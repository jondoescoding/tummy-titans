
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { 
  PlusIcon, 
  MinusIcon, 
  SendIcon, 
  XIcon 
} from 'lucide-react';
import NavBar from '@/components/NavBar';
import DoctorCodeInput from '@/components/DoctorCodeInput';
import { isValidDoctorCode } from '@/lib/patientData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  age: z.string().refine((val) => {
    const age = parseInt(val, 10);
    return !isNaN(age) && age > 0 && age < 120;
  }, { message: 'Please enter a valid age' }),
  height: z.string().refine((val) => {
    const height = parseInt(val, 10);
    return !isNaN(height) && height > 0 && height < 300;
  }, { message: 'Please enter a valid height in cm' }),
  weight: z.string().refine((val) => {
    const weight = parseInt(val, 10);
    return !isNaN(weight) && weight > 0 && weight < 500;
  }, { message: 'Please enter a valid weight in kg' }),
  condition: z.string().min(2, { message: 'Please describe your condition' }),
  triggers: z.array(z.string()).optional(),
  medication: z.array(z.string()).optional(),
  notes: z.string().optional(),
  doctorCode: z.string().length(5, { message: 'Doctor code must be 5 digits' }).refine(
    isValidDoctorCode, 
    { message: 'Invalid doctor code' }
  ),
});

type FormValues = z.infer<typeof formSchema>;

const PatientForm = () => {
  const navigate = useNavigate();
  const [triggers, setTriggers] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [currentTrigger, setCurrentTrigger] = useState('');
  const [currentMedication, setCurrentMedication] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      height: '',
      weight: '',
      condition: '',
      triggers: [],
      medication: [],
      notes: '',
      doctorCode: '',
    },
  });

  const addTrigger = () => {
    if (currentTrigger.trim() !== '') {
      const newTriggers = [...triggers, currentTrigger.trim()];
      setTriggers(newTriggers);
      form.setValue('triggers', newTriggers);
      setCurrentTrigger('');
    }
  };

  const removeTrigger = (index: number) => {
    const newTriggers = triggers.filter((_, i) => i !== index);
    setTriggers(newTriggers);
    form.setValue('triggers', newTriggers);
  };

  const addMedication = () => {
    if (currentMedication.trim() !== '') {
      const newMedications = [...medications, currentMedication.trim()];
      setMedications(newMedications);
      form.setValue('medication', newMedications);
      setCurrentMedication('');
    }
  };

  const removeMedication = (index: number) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
    form.setValue('medication', newMedications);
  };

  const onSubmit = (data: FormValues) => {
    // In a real app, we would send this data to a backend
    console.log('Form submitted:', data);
    
    toast.success('Your information has been submitted to the dietitian', {
      description: 'You will receive a response soon',
      duration: 5000,
    });
    
    // Redirect to home page after submission
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      <main className="container max-w-3xl mx-auto pt-32 pb-20 px-6 page-transition">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-8 md:p-10 shadow-xl"
        >
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Health Information Form</h1>
            <p className="text-gray-600">
              Share your digestive health concerns with your dietitian
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Smith" 
                          className="form-input-transition"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="35" 
                          type="number"
                          min="1"
                          max="120"
                          className="form-input-transition"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="175" 
                          type="number"
                          min="1"
                          className="form-input-transition"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="70" 
                          type="number"
                          min="1"
                          className="form-input-transition"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe Your Condition</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide details about your digestive issues..." 
                        className="form-input-transition resize-none min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormLabel htmlFor="triggers">Known Triggers</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {triggers.map((trigger, index) => (
                    <div 
                      key={index} 
                      className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <span>{trigger}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTrigger(index)}
                        className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-red-200"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Dairy, Spicy foods..."
                    value={currentTrigger}
                    onChange={(e) => setCurrentTrigger(e.target.value)}
                    className="form-input-transition"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTrigger();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={addTrigger}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <FormLabel htmlFor="medication">Current Medications</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {medications.map((medication, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                    >
                      <span>{medication}</span>
                      <button 
                        type="button" 
                        onClick={() => removeMedication(index)}
                        className="h-4 w-4 rounded-full flex items-center justify-center hover:bg-blue-200"
                      >
                        <XIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Omeprazole, Antacids..."
                    value={currentMedication}
                    onChange={(e) => setCurrentMedication(e.target.value)}
                    className="form-input-transition"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addMedication();
                      }
                    }}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={addMedication}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other information that might help your dietitian..." 
                        className="form-input-transition resize-none min-h-[80px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="doctorCode"
                render={() => (
                  <DoctorCodeInput form={form} fieldName="doctorCode" />
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full py-6 text-base font-medium flex items-center justify-center gap-2"
              >
                <span>Submit Information</span>
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </motion.div>
      </main>
    </div>
  );
};

export default PatientForm;
