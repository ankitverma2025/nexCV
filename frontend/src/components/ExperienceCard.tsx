import { Experience } from '@/types';
import { formatDate } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="card relative pl-8 ml-4 border-l-4 border-primary-500">
      <div className="absolute -left-3 top-8 w-6 h-6 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900"></div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {experience.position}
          </h3>
          <p className="text-lg text-primary-600 dark:text-primary-400">
            {experience.company}
          </p>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 md:mt-0">
          <span className="font-medium">
            {formatDate(experience.startDate)} - {formatDate(experience.endDate, experience.current)}
          </span>
          {experience.location && (
            <span className="block md:inline md:ml-2">{experience.location}</span>
          )}
        </div>
      </div>

      {experience.description && (
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {experience.description}
        </p>
      )}

      {experience.achievements && experience.achievements.length > 0 && (
        <ul className="space-y-2">
          {experience.achievements.map((achievement, index) => (
            <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
              <svg
                className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
