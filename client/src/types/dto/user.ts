import type { DocumentEntity } from '@/types/dto/document';

export type User = {
    createdAt: string
    description: string | null
    name: string
    publishedAt: string
    updatedAt: string
    email: string
    document_lists?: DocumentEntity[]
}

export type UserEntity = {
    createdAt: string
    description: string | null
    name: string
    publishedAt: string
    updatedAt: string
    id: number
    email: string
    document_lists?: DocumentEntity[]
}
