export class HttpException extends Error{
    public status: number;

    constructor(message: string, code: number){
        super(message);
        this.status = code;
    }
}