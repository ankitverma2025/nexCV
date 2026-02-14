import { Skill } from '@/types';

interface SkillsGridProps {
  skills: Skill[];
}

export default function SkillsGrid({ skills }: SkillsGridProps) {
  if (skills.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400">
        No skills data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map((skillCategory) => (
        <div key={skillCategory._id} className="card">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            {skillCategory.category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skillCategory.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
