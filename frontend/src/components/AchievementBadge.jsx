export function AchievementBadge({ title, Icon }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full bg-accent/20 ring-2 ring-accent flex items-center justify-center shadow-sm">
        <Icon className="size-6 text-background-dark" />
      </div>
      <div className="text-xs text-center font-semibold">{title}</div>
    </div>
  );
}
