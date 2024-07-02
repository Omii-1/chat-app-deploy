

export function SkeletonMessages() {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full "></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
        <div className="skeleton h-16 w-16 shrink-0 rounded-full "></div>
      </div>

      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full "></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
        <div className="skeleton h-16 w-16 shrink-0 rounded-full "></div>
      </div>

      <div className="flex items-center gap-4">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full "></div>
        <div className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20"></div>
          <div className="skeleton h-4 w-28"></div>
        </div>
      </div>

    </div>
  )
}