export function AppContentLoading() {
  return (
    <div
      className='flex h-full items-center justify-center bg-(--material-content) text-[13px] text-(--text-secondary)'
      role='status'
      aria-live='polite'
    >
      Loading application…
    </div>
  );
}
