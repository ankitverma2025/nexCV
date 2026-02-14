import { Education } from '@/types';
import { formatDate } from '@/lib/utils';

interface EducationCardProps {
  education: Education;
}

export default function EducationCard({ education }: EducationCardProps) {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {education.degree}
          </h3>
          <p className="text-lg text-primary-600 dark:text-primary-400">
            {education.institution}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {education.field}
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0 text-right">
          <span className="block font-medium">
            {formatDate(education.startDate)} - {formatDate(education.endDate, education.current)}
          </span>
          {education.location && (
            <span className="block">{education.location}</span>
          )}
          {education.gpa && (
            <span className="block mt-1">GPA: {education.gpa}</span>
          )}
        </div>
      </div>

      {education.achievements && education.achievements.length > 0 && (
        <ul className="space-y-2">
          {education.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <svg
                className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
