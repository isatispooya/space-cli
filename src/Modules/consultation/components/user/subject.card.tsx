import { server } from "@/api";

enum ConsultationType {
  ONLINE = "online",
  PHONE = "phone",
  IN_PERSON = "in_person",
}

interface SubjectType {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  status: boolean;
  kind_of_consultant: ConsultationType[];
}

interface SubjectCardProps {
  subject: SubjectType;
  onSelect: (id: string) => void;
}

export const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <div
      // onClick={() => onSelect(subject.id)}
      className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden w-full cursor-pointer border hover:shadow-[0_8px_30px_rgb(0,0,0,0.18)] transition-shadow duration-300"
    >
      {/* Image Area */}
      <div className="relative h-72 w-full flex items-center justify-center p-4">
        <img
          src={server + subject.image}
          alt={subject.title}
          className="h-full w-full object-cover rounded-xl shadow-sm"
        />
      </div>

      {/* Text Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            {subject.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-gray-700">
          {subject.description.slice(0, 100)}...
        </p>

        <div className="flex gap-2">
            <span
              className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full"
            >
              {subject.kind_of_consultant?.join(", ")}
            </span>
          
        </div>
      </div>

      {/* Footer Area */}
      <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gradient-to-br from-gray-50 to-white">
        <div>
        </div>
        <button className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-2.5 text-sm rounded-xl hover:from-gray-800 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium">
          انتخاب
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;
