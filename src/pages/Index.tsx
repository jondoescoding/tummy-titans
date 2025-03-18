
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { 
  HeartPulseIcon, 
  UserIcon, 
  BrainCircuitIcon, 
  ArrowRightIcon,
  Flask,
  SaladIcon 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-teal-100/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
      
      <NavBar />
      
      <main className="container max-w-6xl mx-auto pt-32 px-6 page-transition relative z-10">
        <section className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center mb-6 gap-2">
                <div className="bg-blue-100/80 backdrop-blur-sm p-1.5 rounded-md">
                  <Flask className="h-5 w-5 text-blue-600" />
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100/80 backdrop-blur-sm text-blue-700 text-sm font-medium">
                  Digestive Health Platform
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                A Smart Solution for Your 
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500"> Digestive Health</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Connect with expert dietitians and get personalized recommendations 
                for your digestive health concerns.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/patient">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-full px-6 py-6 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                    <span>I'm a Patient</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dietitian">
                  <Button variant="outline" className="rounded-full px-6 py-6 flex items-center gap-2 border-gray-300 hover:border-primary/70 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <span>I'm a Dietitian</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-8 max-w-md border border-white/50">
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 rounded-full bg-blue-100/80 backdrop-blur-sm mb-4">
                      <SaladIcon className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">Simple Process</h2>
                    <p className="text-gray-600">Connect with your dietitian in minutes</p>
                  </div>
                  
                  <div className="space-y-6">
                    <Feature 
                      icon={<UserIcon className="h-5 w-5 text-white" />} 
                      title="Patient Information"
                      description="Share your health details securely"
                    />
                    <Feature 
                      icon={<HeartPulseIcon className="h-5 w-5 text-white" />} 
                      title="Dietitian Connection"
                      description="Enter your dietitian's code to connect"
                    />
                    <Feature 
                      icon={<BrainCircuitIcon className="h-5 w-5 text-white" />} 
                      title="AI-Powered Insights"
                      description="Get intelligent meal recommendations"
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 h-24 w-24 bg-blue-50/80 backdrop-blur-sm rounded-full z-[-1]"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-blue-100/80 backdrop-blur-sm rounded-full z-[-1]"></div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="flex items-start space-x-4">
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-full p-2 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;
