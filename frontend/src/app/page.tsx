'use client';

import { useEffect, useState } from 'react';
import { profileApi, experienceApi, educationApi, skillsApi, projectsApi } from '@/lib/api';
import { Profile, Experience, Education, Skill, Project } from '@/types';
import Hero from '@/components/Hero';
import CollapsibleSection from '@/components/CollapsibleSection';
import ExperienceCard from '@/components/ExperienceCard';
import EducationCard from '@/components/EducationCard';
import SkillsGrid from '@/components/SkillsGrid';
import ProjectCard from '@/components/ProjectCard';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [profileData, expData, eduData, skillsData, projectsData] = await Promise.all([
          profileApi.getProfile(),
          experienceApi.getExperiences().catch(() => []),
          educationApi.getEducation().catch(() => []),
          skillsApi.getSkills().catch(() => []),
          projectsApi.getProjects().catch(() => []),
        ]);

        setProfile(profileData);
        setExperiences(expData);
        setEducation(eduData);
        setSkills(skillsData);
        setProjects(projectsData);
      } catch (err) {
        setError('No profile found. Please add your profile through the admin portal');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Welcome! Profile Not Set Up Yet
            </h2>
            <p className="text-blue-600 dark:text-blue-300">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero Section - Always visible */}
      <Hero profile={profile} />

      {/* Mobile-only: Collapsible sections for all content */}
      <div className="md:hidden">
        <div className="container-custom py-8">
          {/* Experience Section */}
          {experiences.length > 0 && (
            <CollapsibleSection title="Experience" icon="💼" defaultExpanded={false}>
              <div className="space-y-6">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp._id} experience={exp} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Education Section */}
          {education.length > 0 && (
            <CollapsibleSection title="Education" icon="🎓" defaultExpanded={false}>
              <div className="space-y-6">
                {education.map((edu) => (
                  <EducationCard key={edu._id} education={edu} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <CollapsibleSection title="Skills" icon="⚡" defaultExpanded={false}>
              <SkillsGrid skills={skills} />
            </CollapsibleSection>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <CollapsibleSection title="Projects" icon="🚀" defaultExpanded={false}>
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </CollapsibleSection>
          )}

          {/* Contact Section */}
          <CollapsibleSection title="Contact" icon="📧" defaultExpanded={false}>
            <div className="space-y-4">
              {profile.email && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {profile.email}
                  </a>
                </div>
              )}
              {profile.phone && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                  <a
                    href={`tel:${profile.phone}`}
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    {profile.phone}
                  </a>
                </div>
              )}
              {profile.location && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                  <p className="text-gray-900 dark:text-white">{profile.location}</p>
                </div>
              )}
              {profile.linkedin && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                  >
                    {profile.linkedin}
                  </a>
                </div>
              )}
              {profile.github && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                  >
                    {profile.github}
                  </a>
                </div>
              )}
              {profile.portfolio && (
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Portfolio</p>
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 dark:text-primary-400 hover:underline break-all"
                  >
                    {profile.portfolio}
                  </a>
                </div>
              )}
            </div>
          </CollapsibleSection>
        </div>
      </div>

      {/* Desktop: Normal layout */}
      <div className="hidden md:block">
        {/* Experience Section */}
        {experiences.length > 0 && (
          <section className="section-padding bg-white dark:bg-gray-900">
            <div className="container-custom">
              <h2 className="section-title">💼 Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp._id} experience={exp} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <section className="section-padding bg-gray-50 dark:bg-gray-800">
            <div className="container-custom">
              <h2 className="section-title">🎓 Education</h2>
              <div className="space-y-8">
                {education.map((edu) => (
                  <EducationCard key={edu._id} education={edu} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {skills.length > 0 && (
          <section className="section-padding bg-white dark:bg-gray-900">
            <div className="container-custom">
              <h2 className="section-title">⚡ Skills</h2>
              <SkillsGrid skills={skills} />
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="section-padding bg-gray-50 dark:bg-gray-800">
            <div className="container-custom">
              <h2 className="section-title">🚀 Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
