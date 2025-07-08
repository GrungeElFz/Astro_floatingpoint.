import * as React from "react";
import type { Role } from "@/data/roles";

interface RoleCardProps {
  role: Role;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role }) => {
  const Icon = role.icon;

  return (
    <div className="group flex h-full flex-col backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-neutral-800 border border-white/10">
          <Icon className="text-cyan-400" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{role.title}</h3>
          <p className="text-sm text-neutral-400">{role.subtitle}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mt-6 text-neutral-300 font-light leading-relaxed">
        {role.description}
      </p>

      {/* Spacer: Pushes the content below it to the bottom of the card */}
      <div className="flex-grow"></div>

      {/* Key Skills */}
      <div className="mt-8">
        <h4 className="font-semibold text-neutral-200 mb-3">Key Skills</h4>
        <div className="flex flex-wrap gap-2">
          {role.keySkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-cyan-400/10 text-cyan-300 rounded-full text-xs font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Commitment */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm">
          <span className="font-semibold text-neutral-200">Commitment:</span>
          <span className="text-neutral-400 ml-2">{role.commitment}</span>
        </p>
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <a
          href="mailto:contact@floatingpoint.club"
          className="block w-full text-center rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-cyan-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-cyan-400 transition-colors"
        >
          Apply Now →
        </a>
      </div>
    </div>
  );
};
