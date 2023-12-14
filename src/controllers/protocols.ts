export interface HttpResponse<T>{
    statusCode: number;
    body: T | string;
}

export interface HttpRequest<B,H,P,Q>{
    params?: P;
    headers?: H; 
    body?: B;
    query?:Q;
}

