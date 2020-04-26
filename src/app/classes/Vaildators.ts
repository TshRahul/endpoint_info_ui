import { FormControl, AbstractControl } from '@angular/forms';


   export function allowedEnvironmant(control: AbstractControl){
        let env_name = control.value;
        if(!(env_name == "qa-it" || env_name == "qa-master" || env_name == "qa-perf")){
            return { validEnv : true };
     } else{
            return null;
        }
     }
