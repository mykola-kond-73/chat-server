export const corsOpt={
    origin:['http://localhost:3000'], 
    preflightContinue:true,
    credentials:true,
    allowedHeaders:['authorization','content-type'],        
    methods:['GET','POST','PUT','DELETE','OPTIONS'],
    exposedHeaders:[],
    maxAge:5,
} 