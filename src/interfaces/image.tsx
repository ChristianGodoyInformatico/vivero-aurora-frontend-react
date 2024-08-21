export interface Image {
    _id?: string,
    originalName: string,
    fileName: string,
    mimeType?: string,
    size?: number,
    path: string,
    createdAt?: Date,
    updatedAt?: Date
}