export function PostSkeleton() {
    return (
        <article className="group bg-white border border-slate-200 p-0 animate-pulse">
            {/* Image Skeleton */}
            <div className="aspect-video bg-slate-200"></div>

            {/* Content Skeleton */}
            <div className="py-10 px-8 space-y-6">
                {/* Title */}
                <div className="space-y-3">
                    <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-full"></div>
                    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                </div>

                {/* Button */}
                <div className="h-4 bg-slate-200 rounded w-32"></div>
            </div>
        </article>
    );
}

export function PostsGridSkeleton() {
    return (
        <div className="grid md:grid-cols-3 gap-10">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
        </div>
    );
}
