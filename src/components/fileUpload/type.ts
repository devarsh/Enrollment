export interface FileObjectType {
  id: string;
  blob: File;
  name: string;
  size: number;
  sizeStr: string;
  mimeType: string;
  _mimeType: string;
  ext: string;
  fileExt: string;
  [key: string]: any;
}

export interface TargetBoxType {
  onDrop: (monitor: File[], existingFiles?: FileObjectType[]) => void;
  disabled?: boolean;
  existingFiles?: FileObjectType[];
}
