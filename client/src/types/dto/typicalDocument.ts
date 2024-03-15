import type { DocumentNameEntity } from '@/types/dto/documentName';

export type TypicalDocument = {
    createdAt: string
    description: string | null
    name: string
    publishedAt: string
    updatedAt: string
    document_names?: {
        data?: DocumentNameEntity[]
    }
}

export type TypicalDocumentDTO = {
    attributes: TypicalDocument,
    id: number
}

export type TypicalDocumentEntity = {
    createdAt: string
    description: string | null
    name: string
    publishedAt: string
    updatedAt: string
    id: number
    document_names?: {
        data?: DocumentNameEntity[]
    }
}
