'use client';

import { Profile } from '@/types';
import Link from 'next/link';
import { downloadVCard } from '@/lib/vcard';

interface HeroProps {
  profile: Profile | null;
}

export default function Hero({ profile }: HeroProps) {
  if (!profile) {
    return (
      <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-48 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {profile.profileImage && (
            <div className="mb-8">
              <img
                src={profile.profileImage}
                alt={profile.fullName}
                className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg border-4 border-white dark:border-gray-700"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {profile.fullName}
          </h1>

          <p className="text-xl md:text-2xl text-primary-600 dark:text-primary-400 mb-4">
            {profile.title}
          </p>

          {profile.tagline && (
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              {profile.tagline}
            </p>
          )}

          <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg max-w-3xl mx-auto">
            {profile.about}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => downloadVCard(profile)}
              className="btn-primary inline-flex items-center gap-2"
              aria-label="Save contact information"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              Save My Contact
            </button>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                GitHub
              </a>
            )}
            <Link href="/contact" className="btn-secondary">
              Contact Me
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {profile.email && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {profile.email}
              </span>
            )}
            {profile.phone && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {profile.phone}
              </span>
            )}
            {profile.location && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {profile.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
