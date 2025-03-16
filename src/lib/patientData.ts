
export interface Patient {
  id: string;
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  condition: string;
  triggers: string[];
  medication: string[];
  notes: string;
  doctorCode: string;
  submittedAt: Date;
}

export interface DoctorCode {
  code: string;
  doctorName: string;
}

// Mock data for doctor codes
export const doctorCodes: DoctorCode[] = [
  {
    code: "12345",
    doctorName: "Dr. Emma Wilson"
  },
  {
    code: "67890",
    doctorName: "Dr. James Miller"
  },
  {
    code: "24680",
    doctorName: "Dr. Sophia Chen"
  }
];

// Sample patient data
export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "John Smith",
    age: 34,
    height: 180,
    weight: 75,
    condition: "Irritable Bowel Syndrome",
    triggers: ["Dairy", "Stress", "Spicy foods"],
    medication: ["Antispasmodics", "Loperamide"],
    notes: "Symptoms worsen after large meals. Finding relief with peppermint tea.",
    doctorCode: "12345",
    submittedAt: new Date(2023, 5, 15)
  },
  {
    id: "p2",
    name: "Emily Johnson",
    age: 28,
    height: 165,
    weight: 62,
    condition: "GERD",
    triggers: ["Coffee", "Chocolate", "Tomatoes"],
    medication: ["Omeprazole"],
    notes: "Night-time symptoms affecting sleep quality. Elevated bed helping somewhat.",
    doctorCode: "12345",
    submittedAt: new Date(2023, 6, 22)
  },
  {
    id: "p3",
    name: "Michael Lee",
    age: 42,
    height: 175,
    weight: 85,
    condition: "Crohn's Disease",
    triggers: ["Red meat", "Alcohol", "Processed foods"],
    medication: ["Mesalamine", "Prednisone"],
    notes: "Currently in remission but concerned about recent mild pain after eating.",
    doctorCode: "67890",
    submittedAt: new Date(2023, 7, 8)
  }
];

// Generate AI suggestion based on patient data
export function generateAISuggestion(patient: Patient): string {
  const { condition, triggers, medication, age, weight, height } = patient;
  
  // Calculate BMI
  const bmiValue = weight / ((height / 100) ** 2);
  const bmi = bmiValue.toFixed(1);
  
  let suggestion = '';
  
  // Base suggestion on condition
  if (condition.toLowerCase().includes('ibs')) {
    suggestion = `Based on the patient's IBS diagnosis, consider recommending a low-FODMAP diet trial for 4-6 weeks. ${
      triggers.includes('Stress') ? 'Stress management techniques may be beneficial.' : ''
    } Monitor effectiveness of current medications (${medication.join(', ')}).`;
  } else if (condition.toLowerCase().includes('gerd')) {
    suggestion = `For this GERD patient, recommend smaller, more frequent meals and avoiding trigger foods (${
      triggers.join(', ')
    }). Consider elevating the head of bed 6-8 inches. Current medication regimen with ${
      medication.join(', ')
    } appears appropriate.`;
  } else if (condition.toLowerCase().includes('crohn')) {
    suggestion = `For Crohn's management, patient may benefit from an anti-inflammatory diet. Regular monitoring of nutritional status is recommended due to malabsorption risks. Current medications (${
      medication.join(', ')
    }) should be continued while monitoring efficacy.`;
  } else {
    suggestion = `Based on the reported condition (${condition}), consider dietary modifications avoiding known triggers (${
      triggers.join(', ')
    }). Review current medications for optimal effectiveness.`;
  }
  
  // Add BMI-specific recommendation
  if (bmiValue < 18.5) {
    suggestion += ` Patient's BMI (${bmi}) indicates underweight status. Consider nutritional supplementation and calorie-dense foods that don't trigger symptoms.`;
  } else if (bmiValue >= 25 && bmiValue < 30) {
    suggestion += ` Patient's BMI (${bmi}) indicates overweight status. Gentle nutrition approach focusing on nutrient-dense foods while avoiding triggers recommended.`;
  } else if (bmiValue >= 30) {
    suggestion += ` Patient's BMI (${bmi}) indicates obesity. Weight management important but approach with caution to avoid exacerbating GI symptoms.`;
  }
  
  // Age-specific considerations
  if (age > 65) {
    suggestion += ' Consider age-related factors in treatment plan, including medication interactions and reduced digestive enzyme production.';
  }
  
  return suggestion;
}

// Function to validate a doctor code
export function isValidDoctorCode(code: string): boolean {
  return doctorCodes.some(doctor => doctor.code === code);
}

// Function to get doctor name by code
export function getDoctorNameByCode(code: string): string | undefined {
  const doctor = doctorCodes.find(d => d.code === code);
  return doctor?.doctorName;
}

// Helper function to get patients by doctor code
export function getPatientsByDoctorCode(code: string): Patient[] {
  return mockPatients.filter(patient => patient.doctorCode === code);
}
