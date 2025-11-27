import Image from "next/image";

type ProductCardProps = {
    title: string;
    description: string;
    imageSrc: string;
  };
  
  export function ProductCard({ title, description, imageSrc }: ProductCardProps) {
    return (
      <article className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={title}
            width={800}
            height={600}
            className="h-full w-full object-cover"
          />
        </div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{description}</p>
      </article>
    );
  }