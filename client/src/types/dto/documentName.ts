import type { TypicalDocumentDTO } from '@/types/dto/typicalDocument';

export type DocumentName = {
    createdAt: string
    description: string | null
    name: string
    inputType: DocumentNameInputType
    order: number
    Document_file_list: string
    publishedAt: string
    updatedAt: string
}

export type DocumentNameDTO = {
    attributes: DocumentName,
    id: number
}

export enum DocumentNameInputType {
    MULTIPLE = 'multiple',
    SINGLE = 'single'
}

export type DocumentNameEntity = {
    id: number
    createdAt: string
    description: string | null
    name: string
    inputType: DocumentNameInputType
    order: number
    Document_file_list: string
    publishedAt: string
    updatedAt: string
    typical_documents?: {
        data: TypicalDocumentDTO[]
    }
}