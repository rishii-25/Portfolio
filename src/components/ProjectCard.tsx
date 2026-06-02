import { forwardRef } from 'react'

interface ProjectCardProps {
  image: string
  badge: string
  badgeColor: 'amber' | 'green'
  title: string
  description: string
  tags: { label: string; color: 'cyan' | 'purple' | 'green' | 'blue' }[]
  githubUrl: string
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ image, badge, badgeColor, title, description, tags, githubUrl }, ref) => {
    const badgeStyles =
      badgeColor === 'amber'
        ? 'bg-amber-accent/15 text-amber-accent'
        : 'bg-green-accent/15 text-green-accent'

    const tagStyles = {
      cyan: 'tag-cyan',
      purple: 'tag-purple',
      green: 'tag-green',
      blue: 'tag-blue',
    }

    return (
      <div
        ref={ref}
        className="group bg-surface border border-border-custom rounded-2xl p-5 relative overflow-hidden card-hover"
      >
        {/* Shimmer effect on hover */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden pointer-events-none">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
        </div>

        {/* Image */}
        <div className="relative w-full h-[200px] rounded-image overflow-hidden mb-4">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover brightness-[0.85] group-hover:scale-[1.03] transition-transform duration-400"
          />
          {/* Badge */}
          <span
            className={`absolute top-3 right-3 text-[11px] font-mono tracking-wide px-3 py-1 rounded-pill ${badgeStyles}`}
          >
            {badge}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[17px] font-medium text-text-primary tracking-[-0.01em]">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-text-secondary leading-[1.6]">{description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tags.map((tag) => (
            <span key={tag.label} className={tagStyles[tag.color]}>
              {tag.label}
            </span>
          ))}
        </div>

        {/* GitHub Link */}
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-xs font-mono tracking-wide text-cyan-dim hover:text-cyan transition-colors duration-200"
        >
          View on GitHub →
        </a>
      </div>
    )
  }
)

ProjectCard.displayName = 'ProjectCard'
export default ProjectCard
