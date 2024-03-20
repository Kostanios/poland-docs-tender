import { DocumentNameInputType } from '@/types/dto/documentName';

export const getFileTypeLabel = (FileType: DocumentNameInputType) => {
    if (FileType === DocumentNameInputType.SINGLE) {
        return 'Одиночный';
    }

    return 'Список'
}
