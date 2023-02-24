import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs";

@Injectable()
export class checkAdmin implements CanActivate{
    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest()
        
        if(request?.user.userRole === 'customer'){
            return false
        }
        return true
    }

}