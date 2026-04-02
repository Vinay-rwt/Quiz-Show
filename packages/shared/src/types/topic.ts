export type TopicSlug = 'react' | 'angular' | 'typescript' | 'system-design' | 'javascript' | 'python' | 'csharp' | 'dotnet';

export interface Topic {
  id: string;
  name: string;
  slug: TopicSlug;
  icon: string;
  color: string;
}
