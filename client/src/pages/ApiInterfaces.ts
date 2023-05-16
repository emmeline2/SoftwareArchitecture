export interface RepoApiInterface {
    id: string,
    updated_at: string,
    name: string,
    description: string,
    language: string, 
    html_url : string
}

export interface ApiErrorInterface {
    isError: boolean,
    errorCode: number,
    errorMessage: string
}