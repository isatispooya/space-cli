// src/Modules/consultation/components/user/consultant.card.tsx
import { motion } from 'framer-motion';
import { Card } from '@/components'; 
import type { ConsultantType } from '../../types';

interface AdminConsultantCardProps {
  consultant: ConsultantType;
  onSelect: (id: string) => void;
}

 const AdminConsultantCard = ({ consultant, onSelect }: AdminConsultantCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(consultant.id)}
    >
      <Card
        title={consultant.name}
        subtitle={consultant.title}
        content={
          <div className="flex flex-col space-y-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                <img
                  src={consultant.imageUrl}
                  alt={consultant.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white
                  ${consultant.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}
                />
              </div>
            </div>

            {/* Rating and Experience */}
            <div className="flex justify-center items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span className="font-semibold">{consultant.rating}</span>
                <span className="text-gray-500 ml-1">({consultant.reviewCount})</span>
              </div>
              <div className="text-gray-500">|</div>
              <div className="text-gray-600 dark:text-gray-300">
                {consultant.experience} years exp.
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {consultant.expertise.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 pt-4 mt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">Rate</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  ${consultant.hourlyRate}
                </div>
                <div className="text-xs text-gray-500">/hour</div>
              </div>
              <div className="text-center border-x border-gray-100 dark:border-gray-700">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">Sessions</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {consultant.completedSessions}
                </div>
                <div className="text-xs text-gray-500">completed</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400">Available</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {consultant.nextAvailable}
                </div>
                <div className="text-xs text-gray-500">next slot</div>
              </div>
            </div>

            {/* Next Available Slots */}
            <div className="flex justify-center gap-2">
              {consultant.availableSlots.slice(0, 3).map((slot, index) => (
                <div
                  key={index}
                  className="px-3 py-1 text-sm rounded-lg bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {slot}
                </div>
              ))}
            </div>
          </div>
        }
        badge={consultant.status}
        hoverEffect={true}
        glassmorphism={true}
        borderGradient={true}
        className="h-full cursor-pointer transition-all duration-300"
      />
    </motion.div>
  );
};


export default AdminConsultantCard;