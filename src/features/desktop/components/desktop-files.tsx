import { FileText, Folder } from 'lucide-react';

import { DraggableDesktopFile } from '@/features/desktop/components/draggable-desktop-file';
import { DesktopFileId } from '@/features/desktop/domain/enums/desktop-file-id';
import { AppId } from '@/shared/domain/enums/app-id';

type DesktopFilesProps = {
  openApp: (app: AppId) => void;
  selectedFile: DesktopFileId | null;
  onSelectFile: (id: DesktopFileId) => void;
};

export function DesktopFiles({ openApp, selectedFile, onSelectFile }: DesktopFilesProps) {
  return (
    <div
      className='desktop-files [&.desktop-files]:absolute [&.desktop-files]:z-2 [&.desktop-files]:inset-[28px_0_78px] [&.desktop-files]:pointer-events-none max-[900px]:[&.desktop-files]:top-11.5 max-[600px]:[&.desktop-files]:hidden'
      aria-label='Desktop files'
    >
      <DraggableDesktopFile
        id={DesktopFileId.SELECTED_WORK}
        label='Selected Work'
        top={8}
        selected={selectedFile === DesktopFileId.SELECTED_WORK}
        onSelect={onSelectFile}
        onOpen={() => openApp(AppId.PHOTOS)}
      >
        <span className='folder-icon [&.folder-icon]:w-14.5 [&.folder-icon]:h-12 [&.folder-icon]:grid [&.folder-icon]:place-items-center [&.folder-icon]:filter-[drop-shadow(0_3px_3px_oklch(0.08_0.04_245/0.3))] [&.folder-icon]:text-[oklch(0.72_0.15_240)]'>
          <Folder size={42} fill='oklch(0.72 0.15 240)' />
        </span>
      </DraggableDesktopFile>
      <DraggableDesktopFile
        id={DesktopFileId.READ_ME}
        label='Read Me.txt'
        top={96}
        selected={selectedFile === DesktopFileId.READ_ME}
        onSelect={onSelectFile}
        onOpen={() => openApp(AppId.NOTES)}
      >
        <span className='document-icon [&.document-icon]:w-10.5 [&.document-icon]:h-12.5 [&.document-icon]:grid [&.document-icon]:place-items-center [&.document-icon]:text-[oklch(0.45_0.01_250)] [&.document-icon]:[background:white] [&.document-icon]:rounded-[3px_3px_6px_3px] [&.document-icon]:[box-shadow:0_3px_6px_oklch(0.08_0.03_245/0.24)] [&.document-icon]:text-shadow-none'>
          <FileText size={36} />
        </span>
      </DraggableDesktopFile>
    </div>
  );
}
