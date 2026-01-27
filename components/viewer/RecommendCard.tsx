'use client';

interface RecommendCardProps {
  title: string;
  category: string;
  coverImage: string;
}

export default function RecommendCard({ title, category, coverImage }: RecommendCardProps) {
  return (
    <div className="border-navy-100 relative mx-auto flex h-[320px] w-[240px] flex-col overflow-hidden rounded-2xl border shadow-[0_2px_16px_rgba(13,17,26,0.1)]">
      <div
        className="h-[240px] bg-amber-500 bg-cover bg-center"
        style={{ backgroundImage: `url(${coverImage})` }}
      />
      <div className="bg-navy-500 text-text-1-w typo-body-5-m absolute top-4 left-4 h-6 rounded-sm p-[2px_8px]">
        {category}
      </div>
      <div className="flex h-20 w-52 items-center justify-center">
        <h3 className="typo-h4 mx-4 line-clamp-2 h-12 w-52">{title}</h3>
      </div>
    </div>
  );
}
