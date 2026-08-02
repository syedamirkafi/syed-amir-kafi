import { skillGroups } from "../data/skills.js";

function levelLabel(level) {
  if (level >= 85) return "CORE";
  if (level >= 75) return "STRONG";
  if (level >= 65) return "SOLID";
  return "BUILDING";
}

export default function SkillGrid({ compact = false }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skillGroups.map((group) => (
        <div
          key={group.id}
          className={`bg-base border border-ink/20 hover:border-ink/40 ${
            compact ? "p-5" : "p-6"
          } space-y-4 transition-all duration-300`}
        >
          <div className="flex items-center justify-between">
            <span
              className="px-2 py-1 label-mono text-base"
              style={{ backgroundColor: group.color }}
            >
              {group.label}
            </span>
          </div>
          <ul className="space-y-3">
            {group.skills.map((skill) => (
              <li key={skill.name}>
                <div className="flex items-center justify-between label-mono text-xs mb-1">
                  <span>{skill.name}</span>
                  <span className="text-ink/40">{levelLabel(skill.level)}</span>
                </div>
                <div className="h-1.5 w-full bg-ink/10">
                  <div
                    className="h-full"
                    style={{ width: `${skill.level}%`, backgroundColor: group.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
