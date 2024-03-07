export type TypicalDocument = {
    createdAt: string
    description: string | null
    name: string
    publishedAt: string
    updatedAt: string
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
}
