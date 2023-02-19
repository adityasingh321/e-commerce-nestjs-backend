import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs";

@Injectable()
export class ValidateToken implements CanActivate{
    canActivate(context: ExecutionContext): boolean  {
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        console.log("from new guard");
        
        console.log(request.headers.token);
        
        Object.assign(request, { data: "new data"});
        return true
    }

}