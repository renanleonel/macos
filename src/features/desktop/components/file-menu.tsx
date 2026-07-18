import { SystemMenu } from '@/features/desktop/components/system-menu';
import { AppId } from '@/shared/domain/enums/app-id';
type FileMenuProps = { openApp: (app: AppId) => void };
export function FileMenu({ openApp }: FileMenuProps) {
  return (
    <SystemMenu className='file-menu [&.file-menu]:left-28.75'>
      <button type='button' onClick={() => openApp(AppId.FINDER)}>
        New Finder Window <kbd>⌘N</kbd>
      </button>
      <button type='button' onClick={() => openApp(AppId.NOTES)}>
        New Note <kbd>⌘⇧N</kbd>
      </button>
      <hr />
      <button type='button'>
        Open… <kbd>⌘O</kbd>
      </button>
      <button type='button'>
        Get Info <kbd>⌘I</kbd>
      </button>
      <hr />
      <button type='button'>
        Move to Trash <kbd>⌘⌫</kbd>
      </button>
    </SystemMenu>
  );
}
