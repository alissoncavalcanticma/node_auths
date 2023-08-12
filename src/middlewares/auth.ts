
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

export const Auth = {
    private: async(req: Request, res: Response, next: NextFunction) => {
        // Fazer verificação de Auth
        //Inicia como false
        let success = false;

        if(req.headers.authorization){
            let hash: string = req.headers.authorization.substring(6);
            let decoded: string = Buffer.from(hash, 'base64').toString();

            let data: string[] = decoded.split(':');
            if(data.length === 2){
                let hasUser = await User.findOne({
                    where:{
                        email: data[0],
                        password: data[1]
                    }
                });

                if(hasUser){
                    success = true;
                }
            }

            console.log("Hash", hash);
        }


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