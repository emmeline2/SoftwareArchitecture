export interface RepoApiInterface {
    repoID: string,
    name: string,
    description: string,
    mainLanguage: string
}

export interface ApiErrorInterface {
    isError: boolean,
    errorCode: number,
    errorMessage: string
}