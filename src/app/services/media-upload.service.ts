import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CommonUtilities } from '../utilities/common.utilities';

@Injectable({
    'providedIn': 'root'
})
export class MediaUploadService {
    constructor(
        private afStorage: AngularFireStorage
    ){}

    uploadChatMedia(file){
        return new Promise((resolve, reject) => {
            console.log('file: ',file);
            try {
                const filePath = 'chats/'+ CommonUtilities.generateRandomString() + "." + CommonUtilities.getExtension(file.name);
                const ref = this.afStorage.ref(filePath);
                const task = ref.put(file);
                //const uploadPercent = task.percentageChanges();
                let url = "";
                task.snapshotChanges().pipe(
                finalize(async() =>{
                    url = await ref.getDownloadURL().toPromise();
                    console.log('url: ',url);
                    return resolve(url);
                } )
            ).subscribe();   
            } catch (error) {
                reject(error);
            }
        });
    }
}