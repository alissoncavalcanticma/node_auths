import { Request, Response, NextFunction } from "express";

export const Auth = {
    private: (req: Request, res: Response, next: NextFunction) => {
        // Fazer verificação de Auth
        //Inicia como false
        let success = false;



        if(success){
            /*
            next() call next function "ApiController.list" in api router
            definition. Ex: router.get('/list', Auth.private, ApiController.list);
            */
            next();
        }else{
            // 403 for not Unautorized and 401 for not Authenticated
            res.status(403)
            res.json({
                error: "Unauthorized"
            });
        }
    }  
}