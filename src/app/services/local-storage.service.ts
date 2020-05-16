import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public storeOnLocalStorage(STORAGE_KEY : string, vlaue: string): void {
          
    // get array of tasks from local storage
    // const keyValuePAir = this.storage.get(STORAGE_KEY);
    // push new task to array
    // currentTodoList.push({
    //     title: taskTitle,
    //     isChecked: false 
    // });
    // insert updated array to local storage
    this.storage.set(STORAGE_KEY, vlaue);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
}

public removeromStroage(STORAGE_KEY : string){

this.storage.remove(STORAGE_KEY);
}

public getLocalStroageData(STORAGE_KEY : string){
  return this.storage.get(STORAGE_KEY);
}
}
