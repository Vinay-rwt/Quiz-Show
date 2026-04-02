export type TopicSlug = 'react' | 'angular' | 'typescript' | 'system-design';

export interface Topic {
  id: string;
  name: string;
  slug: TopicSlug;
  icon: string;
  color: string;
}
