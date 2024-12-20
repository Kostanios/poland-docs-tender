import type { TypicalDocument, TypicalDocumentDTO } from '@/types/dto/typicalDocument';
import type { StrapiContentDTO } from '@/types/strapi';

export type DocumentName = {
    createdAt: string
    description: string | null
    name: string
    inputType: DocumentNameInputType
    order: number
    publishedAt: string
    updatedAt: string
    typical_documents?: {
        data?: TypicalDocumentDTO[]
    }
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
    publishedAt: string
    updatedAt: string
    typical_documents?: {
        data?:  TypicalDocumentDTO[]
    }
}
