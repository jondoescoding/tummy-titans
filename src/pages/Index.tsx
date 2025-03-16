
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { 
  HeartPulseIcon, 
  UserIcon, 
  BrainCircuitIcon, 
  ArrowRightIcon 
} from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <NavBar />
      
      <main className="container max-w-6xl mx-auto pt-32 px-6 page-transition">
        <section className="py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
                Digestive Health Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                A Smart Solution for Your 
                <span className="text-primary"> Digestive Health</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Connect with expert dietitians and get personalized recommendations 
                for your digestive health concerns.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link to="/patient">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-6 py-6 text-white flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                    <span>I'm a Patient</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/dietitian">
                  <Button variant="outline" className="rounded-full px-6 py-6 flex items-center gap-2 border-gray-300 hover:border-primary/70 bg-white">
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
                <div className="glass-card rounded-3xl shadow-xl p-8 max-w-md">
                  <div className="text-center mb-6">
                    <div className="inline-block p-4 rounded-full bg-blue-100 mb-4">
                      <HeartPulseIcon className="h-8 w-8 text-primary" />
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
                      description="Get intelligent recommendations"
                    />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 h-24 w-24 bg-blue-50 rounded-full opacity-70 z-[-1]" />
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-blue-100 rounded-full opacity-50 z-[-1]" />
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
    <div className="bg-primary rounded-full p-2 flex-shrink-0">
      {icon}
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;
